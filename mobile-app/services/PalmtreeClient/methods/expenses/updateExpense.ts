import { ExpenseDto } from '../../../../../backend/src/groups/expenses/dto/expense.dto';
import { UpdateExpenseDto } from '../../../../../backend/src/groups/expenses/dto/update-expense.dto';
import { RequestConfig } from '../../requestConfig';

export type UpdateExpenseResponse = ExpenseDto;
export async function updateExpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  body: UpdateExpenseDto
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expenses/' + expenseId;

  const res = await config.httpClient.put<UpdateExpenseResponse>(
    url,
    body,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
