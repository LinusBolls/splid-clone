import { create } from 'zustand';

import PalmtreeClient from '../services/PalmtreeClient';
import { persist } from './persist';
import StorageKey from './StorageKey';

export type IdentityStore =
  | {
      isLoading: true;
      client: null;
      actions: {};
    }
  | {
      isLoading: false;
      client: PalmtreeClient;
      actions: {};
    };
export const useIdentityStore = create<IdentityStore>(
  // persist(StorageKey.IDENTITY,
  (set) => ({
    isLoading: false,
    client: new PalmtreeClient(),
    actions: {},
  })
  // )
);
export const useIdentity = useIdentityStore;
