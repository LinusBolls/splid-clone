import { RequestConfig } from '../../requestConfig';

export type GetExpenseResponse = {
  id: string;
  name: String;
  description: string;
  location: string;

  assets: {}[];
  categories: {}[];
  subExpenses: {}[];
};

export async function getExpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expenses/' + expenseId;

  const res = await config.httpClient.get<GetExpenseResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
