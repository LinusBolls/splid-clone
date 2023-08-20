import { GroupDto } from '../../../../../backend/src/groups/dto/group.dto';
import { RequestConfig } from '../../requestConfig';

export type GetGroupsByInviteCodeResponse = GroupDto[];

export async function getGroupsByInviteCode(
  config: RequestConfig,
  inviteCode: string
) {
  const url = config.baseUrl + '/groups?inviteCode=' + inviteCode;

  const res = await config.httpClient.get<GetGroupsByInviteCodeResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
