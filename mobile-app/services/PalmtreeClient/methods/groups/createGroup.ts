import { RequestConfig } from '../../requestConfig';

export interface CreateGroupResponse {
  id: string;
  name: string;
  description: string;
  inviteCode: string;
  currency: string; // e.g. "EUR" | "USD"
}
export async function createGroup(
  config: RequestConfig,
  body: { name: string; description: string; currency: 'EUR' }
) {
  const url = config.baseUrl + '/groups';

  const res = await config.httpClient.post<CreateGroupResponse>(
    url,
    body,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
