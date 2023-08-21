import { GroupMemberExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/group-member-expenses/dto/group-member-expenses.dto';
import { UpdateGroupMemberExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/group-member-expenses/dto/update-group-member-expense.dto';
import { RequestConfig } from '../../requestConfig';

export type UpdateGroupMemberExpensesResponse = GroupMemberExpenseDto[];

export async function updateGroupMemberExpenses(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  subexpenseId: string,
  body: UpdateGroupMemberExpenseDto[]
) {
  const url =
    config.baseUrl +
    '/groups/' +
    groupId +
    '/expenses/' +
    expenseId +
    '/sub-expenses/' +
    subexpenseId +
    '/group-member-expenses';

  const res = await config.httpClient.put<UpdateGroupMemberExpensesResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
