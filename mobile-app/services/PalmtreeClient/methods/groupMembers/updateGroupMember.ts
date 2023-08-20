import { RequestConfig } from '../../requestConfig';

export interface UpdateGroupMemberResponse {
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
export async function updateGroupMember(
  config: RequestConfig,
  groupId: string,
  memberId: string,
  body: {
    name: string;
    status: string | null;
  }
) {
  const url =
    config.baseUrl + '/groups/' + groupId + '/group-members/' + memberId;

  const res = await config.httpClient.put<UpdateGroupMemberResponse>(
    url,
    body,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
