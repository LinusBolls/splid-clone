import { RequestConfig } from '../../requestConfig';

export interface CreateExpenseResponse {
  id: string;
  name: string;
}
export async function createExpense(
  config: RequestConfig,
  groupId: string,
  body: {
    name: 'dangs';
    description: 'dongs';
    location: 'dongs';
    categoryIds: string[];
  }
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expenses';

  const res = await config.httpClient.post<CreateExpenseResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
