import { GroupMemberExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/group-member-expenses/dto/group-member-expenses.dto';
import { RequestConfig } from '../../requestConfig';

export type GetGroupMemberExpensesBySubexpenseResponse =
  GroupMemberExpenseDto[];

export async function getGroupMemberExpensesBySubexpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  subexpenseId: string
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

  const res =
    await config.httpClient.get<GetGroupMemberExpensesBySubexpenseResponse>(
      url,
      config.getHeaders()
    );
  const data = res.data;

  return data;
}
