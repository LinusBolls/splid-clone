import uuid from 'react-native-uuid';
import { create } from 'zustand';

import { persist } from './persist';
import StorageKey from './StorageKey';

export interface Group {
  id: string;

  title: string;
}

export interface GroupStore {
  groups: Group[];

  actions: {
    createGroup: (group: Omit<Group, 'id'>) => Group;
    deleteGroup: (groupId: string) => void;
    setTitle: (groupId: string, title: string) => void;
  };
}

export const useGroupsStore = create<GroupStore>(
  persist(StorageKey.GROUP, (set) => ({
    groups: [],
    actions: {
      createGroup: (group) => {
        const newGroup: Group = {
          id: uuid.v4() as string,

          title: group.title,
        };
        set((store) => ({
          ...store,
          groups: store.groups.concat([newGroup]),
        }));
        return newGroup;
      },
      deleteGroup: (groupId) => {
        set((store) => ({
          ...store,
          groups: store.groups.filter((group) => group.id !== groupId),
        }));
      },
      setTitle: (groupId, title) => {
        set((store) => ({
          ...store,
          groups: store.groups.map((i) =>
            i.id === groupId ? { ...i, title } : i
          ),
        }));
      },
    },
  }))
);
