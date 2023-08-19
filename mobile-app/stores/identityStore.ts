import { create } from 'zustand';

export interface IdentityStore {
  associatedMemberId: string | null;
  actions: {
    setAssociatedMemberId: (associatedMemberId: string | null) => void;
  };
}
export const useIdentityStore = create<IdentityStore>((set) => ({
  associatedMemberId: null,
  actions: {
    setAssociatedMemberId: (associatedMemberId) => {
      set(() => ({ associatedMemberId }));
    },
  },
}));
export const useIdentity = useIdentityStore;
