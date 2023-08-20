import { SubExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/dto/sub-expense.dto';
import { RequestConfig } from '../../requestConfig';

export type GetSubexpensesByExpenseResponse = SubExpenseDto[];

export async function getSubexpensesByExpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string
) {
  const url =
    config.baseUrl +
    '/groups/' +
    groupId +
    '/expenses/' +
    expenseId +
    '/sub-expenses';

  const res = await config.httpClient.get<GetSubexpensesByExpenseResponse>(
    url,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
