import { RequestConfig } from '../../requestConfig';

export type GetGroupMembersByGroupResponse = {
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
}[];

export async function getGroupMembersByGroup(
  config: RequestConfig,
  groupId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/group-members';

  const res = await config.httpClient.get<GetGroupMembersByGroupResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
