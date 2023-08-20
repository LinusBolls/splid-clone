import { CreateExpenseDto } from '../../../../../backend/src/groups/expenses/dto/create-expense.dto';
import { ExpenseDto } from '../../../../../backend/src/groups/expenses/dto/expense.dto';
import { RequestConfig } from '../../requestConfig';

export type CreateExpenseResponse = ExpenseDto;

export async function createExpense(
  config: RequestConfig,
  groupId: string,
  body: CreateExpenseDto
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expenses';

  const res = await config.httpClient.post<CreateExpenseResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
