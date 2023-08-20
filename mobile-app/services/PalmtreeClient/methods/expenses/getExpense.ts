import { ExpenseDto } from '../../../../../backend/src/groups/expenses/dto/expense.dto';
import { RequestConfig } from '../../requestConfig';

export type GetExpenseResponse = ExpenseDto;

export async function getExpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expenses/' + expenseId;

  const res = await config.httpClient.get<GetExpenseResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
