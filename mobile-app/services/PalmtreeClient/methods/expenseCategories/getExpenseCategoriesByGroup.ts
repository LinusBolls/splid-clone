import { ExpenseCategoryDto } from '../../../../../backend/src/groups/expense-categories/dto/expense-category.dto';
import { RequestConfig } from '../../requestConfig';

export type GetExpenseCategoriesByGroupResponse = ExpenseCategoryDto[];

export async function getExpenseCategoriesByGroup(
  config: RequestConfig,
  groupId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expense-categories';

  const res = await config.httpClient.get<GetExpenseCategoriesByGroupResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
