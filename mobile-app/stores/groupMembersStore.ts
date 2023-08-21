import uuid from 'react-native-uuid';
import { create } from 'zustand';

import { GroupMemberDto } from '../../backend/src/groups/group-members/dto/group-member.dto';
import { persist } from './persist';
import StorageKey from './StorageKey';

export interface GroupMembersStore {
  members: (GroupMemberDto & { groupId: string })[];

  actions: {
    addMember: (groupId: string, member: GroupMemberDto) => GroupMemberDto;
    addMembers: (
      groupId: string,
      members: GroupMemberDto[]
    ) => GroupMemberDto[];
    setMembers: (
      groupId: string,
      members: GroupMemberDto[]
    ) => GroupMemberDto[];
    deleteMember: (memberId: string) => void;
    updateMember: (
      groupId: string,
      memberId: string,
      member: GroupMemberDto
    ) => void;
  };
}
export const useGroupMembersStore = create<GroupMembersStore>(
  persist(StorageKey.GROUP_MEMBER, (set) => ({
    members: [],

    actions: {
      addMember: (groupId, member) => {
        set((store) => ({
          members: store.members.concat([{ ...member, groupId }]),
        }));
        return member;
      },
      addMembers: (groupId, members) => {
        set((store) => ({
          members: store.members.concat(
            members.map((i) => ({ ...i, groupId }))
          ),
        }));
        return members;
      },
      setMembers: (groupId, members) => {
        set((store) => ({
          members: members.map((i) => ({ ...i, groupId })),
        }));
        return members;
      },
      deleteMember: (memberId) => {
        set((store) => ({
          members: store.members.filter((member) => member.id !== memberId),
        }));
      },
      updateMember: (groupId, memberId, member) => {
        set((store) => ({
          members: store.members.map((i) =>
            i.id === memberId ? { ...member, groupId } : i
          ),
        }));
      },
    },
  }))
);
