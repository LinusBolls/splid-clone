import { RequestConfig } from '../../requestConfig';

export async function deleteGroup(config: RequestConfig, groupId: string) {
  const url = config.baseUrl + '/groups/' + groupId;

  const res = await config.httpClient.delete<void>(url, config.getHeaders());

  const data = res.data;

  return data;
}
