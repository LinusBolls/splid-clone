import { RequestConfig } from '../../requestConfig';

export type GetExpenseCategoriesByGroupResponse = {
  id: string;
  name: string;
}[];

export async function getExpenseCategoriesByGroup(
  config: RequestConfig,
  groupId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expense-categories';

  const res = await config.httpClient.get<GetExpenseCategoriesByGroupResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
