import { GroupMemberDto } from '../../../../../backend/src/groups/group-members/dto/group-member.dto';
import { RequestConfig } from '../../requestConfig';

export type GetGroupMemberResponse = GroupMemberDto;

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
