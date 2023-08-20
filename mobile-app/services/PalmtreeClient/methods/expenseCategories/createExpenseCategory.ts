import { RequestConfig } from '../../requestConfig';

export interface CreateExpenseCategoryResponse {
  id: string;
  name: string;
}
export async function createExpenseCategory(
  config: RequestConfig,
  groupId: string,
  body: { name: string }
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expense-categories';

  const res = await config.httpClient.post<CreateExpenseCategoryResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
