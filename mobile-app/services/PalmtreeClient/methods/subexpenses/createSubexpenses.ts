import { RequestConfig } from '../../requestConfig';

export type CreateSubexpenseResponse = {
  id: string;
  name: string;
}[];

export async function createSubexpense(
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

  const res = await config.httpClient.post<CreateSubexpenseResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
