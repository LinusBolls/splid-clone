import { create } from 'zustand';

import { GroupDto } from '../../backend/src/groups/dto/group.dto';
import { persist } from './persist';
import StorageKey from './StorageKey';

export type GroupModel = GroupDto;

export interface GroupStore {
  groups: GroupModel[];

  actions: {
    addGroup: (group: GroupModel) => GroupModel;
    setGroups: (groups: GroupModel[]) => GroupModel[];
    updateGroup: (groupId: string, group: GroupModel) => GroupModel;
    removeGroup: (groupId: string) => void;
    clear: () => void;
  };
}

export const useGroupsStore = create<GroupStore>(
  persist(StorageKey.GROUP, (set) => ({
    groups: [],
    actions: {
      addGroup: (group) => {
        set((store) => ({
          groups: store.groups.concat([group]),
        }));
        return group;
      },
      setGroups: (groups) => {
        set(() => ({
          groups,
        }));
        return groups;
      },
      updateGroup: (groupId, group) => {
        set((store) => ({
          groups: store.groups.map((i) => (i.id === groupId ? group : i)),
        }));
        return group;
      },
      removeGroup: (groupId) => {
        set((store) => ({
          groups: store.groups.filter((group) => group.id !== groupId),
        }));
      },
      clear: () => {
        set(() => ({ groups: [] }));
      },
    },
  }))
);
