import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetState, SetState, State, StateCreator, StoreApi } from 'zustand';

export const persist =
  <T extends State>(
    storageKey: string,
    config: StateCreator<T>
  ): StateCreator<T> =>
  (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => {
    const store = config(
      (partial: any, replace: any) => {
        set(partial, replace);

        // Get the current state and omit the actions from the persisted state
        const stateToPersist = JSON.parse(JSON.stringify(get()));

        const { actions, ...stateWithoutActions } = stateToPersist;

        // Save the state to storage without the actions
        AsyncStorage.setItem(storageKey, JSON.stringify(stateWithoutActions));
      },
      get,
      api
    );

    async function tryToLoadFromStorage() {
      const storedState = await AsyncStorage.getItem(storageKey);

      if (storedState) {
        // Parse the stored state and merge it with the actions from the initial store
        const stateFromStorage = JSON.parse(storedState);
        set({
          ...stateFromStorage,
          actions: store.actions,
        });
      }
    }
    tryToLoadFromStorage();

    return store;
  };
