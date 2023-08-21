import { useMutation, useQueryClient } from 'react-query';

import { UpdateGroupMemberExpenseDto } from '../../backend/src/groups/expenses/sub-expenses/group-member-expenses/dto/update-group-member-expense.dto';
import { Share, SubexpenseDraft } from '../stores/expenseDraftStore';
import { Expense, useExpensesStore } from '../stores/expensesStore';
import { useIdentity } from '../stores/identityStore';
import QueryKeys from './QueryKey';

const toShareDto =
  (
    role: 'SPONSOR' | 'GAINER',
    totalExpensePrice: number,
    currency: string,
    date: Date
  ) =>
  (share: Share): UpdateGroupMemberExpenseDto => ({
    groupMemberId: share.memberId,
    currency,
    role,
    amount: (totalExpensePrice / 100) * share.percentage,
    date,
  });

export default function useCreateExpense() {
  const { client } = useIdentity();
  const queryClient = useQueryClient();
  const expensesStore = useExpensesStore();

  const createExpense = async (params: {
    groupId: string;
    expense: Omit<Expense, 'id' | 'groupId'>;
    subexpenses: SubexpenseDraft[];
  }) => {
    if (!client) {
      throw new Error(
        'createExpense called without a valid PalmtreeClient instance on the session'
      );
    }
    const { groupId, expense, subexpenses } = params;

    const totalExpensePrice = subexpenses.reduce((sum, i) => sum + i.price, 0);

    const createExpenseRes = await client.expenses.create(groupId, {
      name: expense.title,
      description: expense.description,
      location: expense.location,
      categoryIds: expense.categoryIds,
    });

    const createSubexpensesRes = await client.subexpenses.create(
      groupId,
      createExpenseRes.id,
      subexpenses.map((i) => ({ name: i.title }))
    );

    const subexpensesWithShares = createSubexpensesRes.map((i, idx) => ({
      id: i.id,
      gainerShares:
        subexpenses[idx]?.shares?.map(
          toShareDto(
            'GAINER',
            totalExpensePrice,
            expense.currency,
            expense.date
          )
        ) ?? [],
      sponsorShares: expense.sponsorShares.map(
        toShareDto('SPONSOR', totalExpensePrice, expense.currency, expense.date)
      ),
    }));

    const createSharesRes = await Promise.all(
      subexpensesWithShares.map((i) =>
        client.subexpenseShares.update(groupId, createExpenseRes.id, i.id, [
          ...i.sponsorShares,
          ...i.gainerShares,
        ])
      )
    );
    expensesStore.actions.createExpense(groupId, expense);
    expensesStore.actions.createSubexpenses(subexpenses);

    return {
      expense: createExpenseRes,
      subexpenses: createSubexpensesRes,
      subexpenseShares: createSharesRes,
    };
  };
  const mutation = useMutation(createExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.EXPENSE);
    },
  });
  return mutation;
}
