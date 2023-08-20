import { RequestConfig } from '../../requestConfig';

export type GetExpenseCategoryResponse = {
  id: string;
  name: string;
};

export async function getExpenseCategory(
  config: RequestConfig,
  groupId: string,
  categoryId: string
) {
  const url =
    config.baseUrl + '/groups/' + groupId + '/expense-categories/' + categoryId;

  const res = await config.httpClient.get<GetExpenseCategoryResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
