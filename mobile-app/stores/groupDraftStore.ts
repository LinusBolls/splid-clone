import { produce } from 'immer';
import uuid from 'react-native-uuid';
import { create } from 'zustand';

import { Group } from './groupsStore';

export interface GroupMemberDraft {
  id: string;
  displayName: string;
}

export interface GroupDraftStore {
  title: string;
  groupMembers: GroupMemberDraft[];

  actions: {
    addEmptyGroupMember: () => void;
    removeGroupMember: (id: string) => void;
    setTitle: (value: string) => void;
    getDraft: () => Omit<Group, 'id'>;
    clear: () => void;
    setGroupMemberDisplayName: (memberId: string, displayName: string) => void;
  };
}
const groupDraftStore = create<GroupDraftStore>((set, get) => ({
  title: '',
  groupMembers: [],

  actions: {
    setTitle: (value: string) => {
      set((state) =>
        produce(state, (draft) => {
          draft.title = value;
        })
      );
    },
    addEmptyGroupMember: () => {
      set((state) =>
        produce(state, (draft) => {
          draft.groupMembers.push({ displayName: '', id: uuid.v4() as string });
        })
      );
    },
    removeGroupMember: (id) => {
      set((state) =>
        produce(state, (draft) => {
          draft.groupMembers = draft.groupMembers.filter((i) => i.id !== id);
        })
      );
    },
    setGroupMemberDisplayName: (memberId, displayName) => {
      set((store) => ({
        groupMembers: store.groupMembers.map((i) =>
          i.id === memberId ? { ...i, displayName } : i
        ),
      }));
    },
    getDraft: () => {
      const draft = {
        title: get().title,
      };
      return draft;
    },
    clear: () => {
      set((store) => ({
        title: '',
        groupMembers: [],
      }));
    },
  },
}));
export default groupDraftStore;
