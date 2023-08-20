import { RequestConfig } from '../../requestConfig';

export type GetGroupsByInviteCodeResponse = {
  id: string;
  name: string;
  description: string;
  inviteCode: string;
  currency: string; // e.g. "EUR" | "USD"
}[];
export async function getGroupsByInviteCode(
  config: RequestConfig,
  inviteCode: string
) {
  const url = config.baseUrl + '/groups?inviteCode=' + inviteCode;

  const res = await config.httpClient.get<GetGroupsByInviteCodeResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
