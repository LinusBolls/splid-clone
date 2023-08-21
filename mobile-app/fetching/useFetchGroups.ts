import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { useGroupsStore } from '../stores/groupsStore';
import { useIdentity } from '../stores/identityStore';
import QueryKeys from './QueryKey';

export default function useFetchGroups() {
  const { isLoading, client } = useIdentity();
  const groupsStore = useGroupsStore();

  const fetchGroups = async () => {
    if (!client) {
      return null;
    }
    const res = await Promise.all(
      groupsStore.groups.map((group) => client.groups.get(group.id))
    );
    const data = res.flat().filter(Boolean);

    return data;
  };

  const {
    data: groups,
    isLoading: isLoadingGroups,
    isError: hasGroupsError,
  } = useQuery(QueryKeys.GROUP, fetchGroups, {
    enabled: !!client,
  });

  useEffect(() => {
    if (groups) {
      groupsStore.actions.setGroups(groups);
    }
  }, [groups, groupsStore.actions.setGroups]);

  return {
    isLoadingGroups: isLoading || isLoadingGroups,
    hasGroupsError: hasGroupsError,
  };
}
