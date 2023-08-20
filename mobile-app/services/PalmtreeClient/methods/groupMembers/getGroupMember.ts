import { RequestConfig } from '../../requestConfig';

export type GetGroupMemberResponse = {
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
};

export async function getGroupMember(
  config: RequestConfig,
  groupId: string,
  memberId: string
) {
  const url =
    config.baseUrl + '/groups/' + groupId + '/group-members/' + memberId;

  const res = await config.httpClient.get<GetGroupMemberResponse>(
    url,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
