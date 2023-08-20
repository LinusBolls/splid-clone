import { RequestConfig } from '../../requestConfig';

export async function deleteExpenseCategory(
  config: RequestConfig,
  groupId: string,
  categoryId: string
) {
  const url =
    config.baseUrl + '/groups/' + groupId + '/expense-categories/' + categoryId;

  const res = await config.httpClient.delete<void>(url, config.getHeaders());
  const data = res.data;

  return data;
}
