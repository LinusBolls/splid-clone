import { GroupMemberExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/group-member-expenses/dto/group-member-expenses.dto';
import { RequestConfig } from '../../requestConfig';

export type GetGroupMemberExpenseResponse = GroupMemberExpenseDto;

export async function getGroupMemberExpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  subexpenseId: string,
  groupMemberExpenseId: string
) {
  const url =
    config.baseUrl +
    '/groups/' +
    groupId +
    '/expenses/' +
    expenseId +
    '/sub-expenses/' +
    subexpenseId +
    '/group-member-expenses/' +
    groupMemberExpenseId;

  const res = await config.httpClient.get<GetGroupMemberExpenseResponse>(
    url,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
