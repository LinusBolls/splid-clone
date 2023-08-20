import { create } from 'zustand';

import { persist } from './persist';
import StorageKey from './StorageKey';

export interface NavigationStore {
  activeGroupId: string | null;
  activeExpenseId: string | null;
  activeSubexpenseId: string | null;

  actions: {
    setActiveGroupId: (activeGroupId: string | null) => void;
    setActiveExpenseId: (activeExpenseId: string | null) => void;
    setActiveSubexpenseId: (activeSubexpenseId: string | null) => void;
  };
}
const useNavigationStore = create<NavigationStore>(
  persist(StorageKey.NAVIGATION, (set) => ({
    activeGroupId: null,
    activeExpenseId: null,
    activeSubexpenseId: null,

    actions: {
      setActiveGroupId: (activeGroupId) =>
        set((prev) => ({ ...prev, activeGroupId })),
      setActiveExpenseId: (activeExpenseId) =>
        set((prev) => ({ ...prev, activeExpenseId })),
      setActiveSubexpenseId: (activeSubexpenseId) =>
        set((prev) => ({ ...prev, activeSubexpenseId })),
    },
  }))
);
export const useNavigation = () => useNavigationStore();
