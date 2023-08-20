import { RequestConfig } from '../../requestConfig';

export type DeleteGroupResponse = void;

export async function deleteGroup(config: RequestConfig, groupId: string) {
  const url = config.baseUrl + '/groups/' + groupId;

  const res = await config.httpClient.delete<DeleteGroupResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
