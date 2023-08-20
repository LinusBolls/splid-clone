import { RequestConfig } from '../../requestConfig';

export type DeleteSubexpenseResponse = void;

export async function deleteSubexpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  subsxpenseId: string
) {
  const url =
    config.baseUrl +
    '/groups/' +
    groupId +
    '/expenses/' +
    expenseId +
    '/sub-expenses/' +
    subsxpenseId;

  const res = await config.httpClient.delete<DeleteSubexpenseResponse>(
    url,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
