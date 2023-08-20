import { SubExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/dto/sub-expense.dto';
import { UpdateSubExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/dto/update-sub-expense.dto';
import { RequestConfig } from '../../requestConfig';

export type UpdateSubexpenseResponse = SubExpenseDto;

export async function updateSubexpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  subsxpenseId: string,
  body: UpdateSubExpenseDto
) {
  const url =
    config.baseUrl +
    '/groups/' +
    groupId +
    '/expenses/' +
    expenseId +
    '/sub-expenses/' +
    subsxpenseId;

  const res = await config.httpClient.put<UpdateSubexpenseResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
