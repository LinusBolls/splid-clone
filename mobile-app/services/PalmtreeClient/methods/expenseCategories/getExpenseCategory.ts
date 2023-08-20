import { ExpenseCategoryDto } from '../../../../../backend/src/groups/expense-categories/dto/expense-category.dto';
import { RequestConfig } from '../../requestConfig';

export type GetExpenseCategoryResponse = ExpenseCategoryDto;

export async function getExpenseCategory(
  config: RequestConfig,
  groupId: string,
  categoryId: string
) {
  const url =
    config.baseUrl + '/groups/' + groupId + '/expense-categories/' + categoryId;

  const res = await config.httpClient.get<GetExpenseCategoryResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
