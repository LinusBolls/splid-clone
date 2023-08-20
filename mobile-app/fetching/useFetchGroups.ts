import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { useGroupsStore } from '../stores/groupsStore';
import { useIdentity } from '../stores/identityStore';
import QueryKeys from './QueryKey';

export default function useFetchGroups() {
  const { isLoading, client } = useIdentity();
  const { setGroups } = useGroupsStore();

  const fetchGroups = async () => {
    if (!client) {
      return null;
    }
    const res = await Promise.all(
      groups.map((group) => client.expenses.getByGroup(group.id))
    );
    const data = res.flat().filter(Boolean);

    return data;
  };

  const {
    data: expenses,
    isLoading: isLoadingExpenses,
    isError: hasExpensesError,
  } = useQuery(QueryKeys.EXPENSE, fetchGroups, {
    enabled: !!client && groups.length > 0,
  });

  useEffect(() => {
    if (expenses) {
      setExpenses(expenses);
    }
  }, [expenses, setExpenses]);

  return {
    isLoadingExpenses: isLoading || isLoadingExpenses,
    hasExpensesError,
  };
}
