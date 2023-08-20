import { CreateSubExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/dto/create-sub-expense.dto';
import { SubExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/dto/sub-expense.dto';
import { RequestConfig } from '../../requestConfig';

export type CreateSubexpensesResponse = SubExpenseDto[];

export async function createSubexpenses(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  body: CreateSubExpenseDto[]
) {
  const url =
    config.baseUrl +
    '/groups/' +
    groupId +
    '/expenses/' +
    expenseId +
    '/sub-expenses';

  const res = await config.httpClient.post<CreateSubexpensesResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
