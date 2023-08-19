import uuid from 'react-native-uuid';
import { create } from 'zustand';

export interface GroupMember {
  id: string;
  groupId: string;

  displayName: string;
}
export interface GroupMembersStore {
  members: GroupMember[];

  actions: {
    createMember: (
      groupId: string,
      member: Omit<GroupMember, 'id' | 'groupId'>
    ) => GroupMember;
    createMembers: (
      groupId: string,
      members: Omit<GroupMember, 'id' | 'groupId'>[]
    ) => GroupMember[];
    deleteMember: (memberId: string) => void;
    renameMember: (memberId: string, displayName: string) => void;
  };
}
export const useGroupMembersStore = create<GroupMembersStore>((set) => ({
  members: [],

  actions: {
    createMember: (groupId, member) => {
      const newMember = {
        id: uuid.v4() as string,
        groupId,

        displayName: member.displayName,
      };
      set((store) => {
        return { ...store, members: [...store.members, newMember] };
      });
      return newMember;
    },
    createMembers: (groupId, members) => {
      const newMembers = members.map((i) => ({
        id: uuid.v4() as string,
        groupId,

        displayName: i.displayName,
      }));
      set((store) => {
        return { ...store, members: [...store.members, ...newMembers] };
      });
      return newMembers;
    },
    deleteMember: (memberId) => {
      set((store) => ({
        ...store,
        members: store.members.filter((member) => member.id !== memberId),
      }));
    },
    renameMember: (memberId, displayName) => {
      set((store) => ({
        ...store,
        members: store.members.map((i) =>
          i.id === memberId ? { ...i, displayName } : i
        ),
      }));
    },
  },
}));
