import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { useExpensesStore } from '../stores/expensesStore';
import { useGroupsStore } from '../stores/groupsStore';
import { useIdentity } from '../stores/identityStore';
import QueryKeys from './QueryKey';

export default function useFetchExpenses() {
  const { isLoading, client } = useIdentity();
  const { setExpenses } = useExpensesStore();
  const { groups } = useGroupsStore();

  const fetchExpenses = async () => {
    if (!client || groups.length === 0) {
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
  } = useQuery(QueryKeys.EXPENSE, fetchExpenses, {
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
