import { useMutation, useQueryClient } from 'react-query';

import { CreateGroupDto } from '../../backend/src/groups/dto/create-group.dto';
import { GroupMemberDraft } from '../stores/groupDraftStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useGroupsStore } from '../stores/groupsStore';
import { useIdentity } from '../stores/identityStore';
import QueryKeys from './QueryKey';

export default function useCreateGroup() {
  const { client } = useIdentity();
  const queryClient = useQueryClient();
  const groupsStore = useGroupsStore();
  const groupMembersStore = useGroupMembersStore();

  const createGroup = async (params: {
    group: CreateGroupDto;
    members: GroupMemberDraft[];
  }) => {
    if (!client) {
      throw new Error(
        'createGroup called without a valid PalmtreeClient instance on the session'
      );
    }
    const { group, members } = params;

    const createGroupRes = await client.groups.create(group);

    const createMembersRes = await Promise.all(
      members.map((i) =>
        client.groupMembers.create(createGroupRes.id, {
          name: i.displayName,
          status: '',
        })
      )
    );
    groupsStore.actions.addGroup(createGroupRes);
    groupMembersStore.actions.addMembers(createGroupRes.id, createMembersRes);

    return {
      group: createGroupRes,
      members: createMembersRes,
    };
  };

  const mutation = useMutation(createGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        QueryKeys.GROUP,
        QueryKeys.EXPENSE_CATEGORY,
        QueryKeys.GROUP_MEMBER,
      ]);
    },
  });
  return mutation;
}
