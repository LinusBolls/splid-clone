import { GroupMemberDto } from '../../../../../backend/src/groups/group-members/dto/group-member.dto';
import { RequestConfig } from '../../requestConfig';

export type GetGroupMembersByGroupResponse = GroupMemberDto[];

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
