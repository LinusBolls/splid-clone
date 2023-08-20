import { CreateExpenseCategoryDto } from '../../../../../backend/src/groups/expense-categories/dto/create-expense-category.dto';
import { ExpenseCategoryDto } from '../../../../../backend/src/groups/expense-categories/dto/expense-category.dto';
import { RequestConfig } from '../../requestConfig';

export type CreateExpenseCategoryResponse = ExpenseCategoryDto;
export async function createExpenseCategory(
  config: RequestConfig,
  groupId: string,
  body: CreateExpenseCategoryDto
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expense-categories';

  const res = await config.httpClient.post<CreateExpenseCategoryResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
