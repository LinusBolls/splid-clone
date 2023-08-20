import { RequestConfig } from '../../requestConfig';

export type GetExpensesByGroupResponse = {
  id: string;
  name: String;
  description: string;
  location: string;

  assets: {}[];
  categories: {}[];
  subExpenses: {}[];
}[];

export async function getExpensesByGroup(
  config: RequestConfig,
  groupId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expenses';

  const res = await config.httpClient.get<GetExpensesByGroupResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
