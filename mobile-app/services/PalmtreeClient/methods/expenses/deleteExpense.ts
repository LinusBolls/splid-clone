import { RequestConfig } from '../../requestConfig';

export async function deleteExpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expenses/' + expenseId;

  const res = await config.httpClient.delete<void>(url, config.getHeaders());
  const data = res.data;

  return data;
}
