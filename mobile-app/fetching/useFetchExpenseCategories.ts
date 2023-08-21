import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { useExpenseCategoriesStore } from '../stores/expenseCategoriesStore';
import { useGroupsStore } from '../stores/groupsStore';
import { useIdentity } from '../stores/identityStore';
import QueryKeys from './QueryKey';

export default function useFetchExpenseCategories() {
  const { isLoading, client } = useIdentity();
  const categoriesStore = useExpenseCategoriesStore();

  const groupsStore = useGroupsStore();

  const fetchCategories = async () => {
    if (!client) {
      return null;
    }
    const res = await Promise.all(
      groupsStore.groups.map((group) =>
        client.expenseCategories.getByGroup(group.id)
      )
    );
    const data = res.flat().filter(Boolean);

    console.log('fetched categories:', data);

    return data;
  };

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: hasCategoriesError,
  } = useQuery(QueryKeys.EXPENSE_CATEGORY, fetchCategories, {
    enabled: !!client,
  });

  useEffect(() => {
    if (categories) {
      categoriesStore.actions.setCategories(categories);
    }
  }, [categories, categoriesStore.actions.setCategories]);

  return {
    isLoadingCategories: isLoading || isLoadingCategories,
    hasCategoriesError: hasCategoriesError,
  };
}
