import { RequestConfig } from '../../requestConfig';

export interface CreateGroupMemberResponse {
  id: string;
  name: string;
  status: string | null;
  paymentDetails: {
    id: string;
    name: null;
    type: 'PAYPAL';
    detail: {
      userName: string;
    };
  }[];
}

export async function createGroupMember(
  config: RequestConfig,
  groupId: string,
  body: { name: string }
) {
  const url = config.baseUrl + '/groups/' + groupId + '/group-members';

  const res = await config.httpClient.post<CreateGroupMemberResponse>(
    url,
    body,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
