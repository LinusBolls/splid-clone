import { RequestConfig } from '../../requestConfig';

export interface GetGroupResponse {
  id: string;
  name: string;
  description: string;
  inviteCode: string;
  currency: string; // e.g. "EUR" | "USD"
}
export async function getGroup(config: RequestConfig, groupId: string) {
  const url = config.baseUrl + '/groups/' + groupId;

  const res = await config.httpClient.get<GetGroupResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
