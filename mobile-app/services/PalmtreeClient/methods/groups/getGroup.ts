import { GroupDto } from '../../../../../backend/src/groups/dto/group.dto';
import { RequestConfig } from '../../requestConfig';

export type GetGroupResponse = GroupDto;
export async function getGroup(config: RequestConfig, groupId: string) {
  const url = config.baseUrl + '/groups/' + groupId;

  const res = await config.httpClient.get<GetGroupResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
