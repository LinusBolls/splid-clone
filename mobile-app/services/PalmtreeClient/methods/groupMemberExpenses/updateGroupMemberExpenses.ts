import { RequestConfig } from '../../requestConfig';

export type UpdateGroupMemberExpensesResponse = {
  groupMemberId: string;
  subExpenseId: string;
  role: 'SPONSOR';
  amount: `${number}`;
  currency: 'USD';
  date: string; // e.g. "2023-08-20"
}[];

export async function updateGroupMemberExpenses(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  body: { name: string }[]
) {
  const url =
    config.baseUrl +
    '/groups/' +
    groupId +
    '/expenses/' +
    expenseId +
    '/sub-expenses';

  const res = await config.httpClient.post<UpdateGroupMemberExpensesResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
