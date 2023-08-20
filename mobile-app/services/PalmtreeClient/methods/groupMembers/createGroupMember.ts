import { CreateGroupMemberDto } from '../../../../../backend/src/groups/group-members/dto/create-group-member.dto';
import { GroupMemberDto } from '../../../../../backend/src/groups/group-members/dto/group-member.dto';
import { RequestConfig } from '../../requestConfig';

export type CreateGroupMemberResponse = GroupMemberDto;

export async function createGroupMember(
  config: RequestConfig,
  groupId: string,
  body: CreateGroupMemberDto
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
