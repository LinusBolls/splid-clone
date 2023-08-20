import { GroupMemberDto } from '../../../../../backend/src/groups/group-members/dto/group-member.dto';
import { UpdateGroupMemberDto } from '../../../../../backend/src/groups/group-members/dto/update-group-member.dto';
import { RequestConfig } from '../../requestConfig';

export type UpdateGroupMemberResponse = GroupMemberDto;
export async function updateGroupMember(
  config: RequestConfig,
  groupId: string,
  memberId: string,
  body: UpdateGroupMemberDto
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
