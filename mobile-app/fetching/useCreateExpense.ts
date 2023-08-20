import { useMutation, useQueryClient } from 'react-query';

import { useIdentity } from '../stores/identityStore';
import QueryKeys from './QueryKey';

export default function useCreateExpense() {
  const { client } = useIdentity();
  const queryClient = useQueryClient();

  const createExpense = async (expense: any) => {
    if (!client) {
      throw new Error(
        'createExpense called without a valid PalmtreeClient instance on the session'
      );
    }
    const createdExpense = await client.expenses.create(expense);

    return createdExpense;
  };

  const mutation = useMutation(createExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.EXPENSE);
    },
  });

  return mutation;
}
