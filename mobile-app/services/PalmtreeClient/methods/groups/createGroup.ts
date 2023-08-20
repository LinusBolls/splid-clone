import { CreateGroupDto } from '../../../../../backend/src/groups/dto/create-group.dto';
import { GroupDto } from '../../../../../backend/src/groups/dto/group.dto';
import { RequestConfig } from '../../requestConfig';

export type CreateGroupResponse = GroupDto;

export async function createGroup(config: RequestConfig, body: CreateGroupDto) {
  const url = config.baseUrl + '/groups';

  const res = await config.httpClient.post<CreateGroupResponse>(
    url,
    body,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
