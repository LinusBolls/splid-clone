import { RequestConfig } from '../../requestConfig';

export interface UpdateExpenseResponse {
  id: string;
  name: string;
}
export async function updateExpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  body: {
    name: 'dangs';
    description: 'dongs';
    location: 'dongs';
    categoryIds: string[];
  }
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expenses/' + expenseId;

  const res = await config.httpClient.put<UpdateExpenseResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
