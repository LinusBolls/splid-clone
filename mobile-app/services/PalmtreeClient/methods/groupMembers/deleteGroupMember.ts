import { RequestConfig } from '../../requestConfig';
import { CreateGroupMemberResponse } from './createGroupMember';

export type DeleteGroupMemberResponse = void;
export async function deleteGroupMember(
  config: RequestConfig,
  groupId: string,
  memberId: string
) {
  const url =
    config.baseUrl + '/groups/' + groupId + '/group-members/' + memberId;

  const res = await config.httpClient.delete<CreateGroupMemberResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
