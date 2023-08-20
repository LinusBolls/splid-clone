import { RequestConfig } from '../../requestConfig';

export async function deleteGroupMember(
  config: RequestConfig,
  groupId: string,
  memberId: string
) {
  const url =
    config.baseUrl + '/groups/' + groupId + '/group-members/' + memberId;

  const res = await config.httpClient.delete<void>(url, config.getHeaders());

  const data = res.data;

  return data;
}
