import { SubExpenseDto } from '../../../../../backend/src/groups/expenses/sub-expenses/dto/sub-expense.dto';
import { RequestConfig } from '../../requestConfig';

export type GetSubexpenseResponse = SubExpenseDto;

export async function getSubexpense(
  config: RequestConfig,
  groupId: string,
  expenseId: string,
  subsxpenseId: string
) {
  const url =
    config.baseUrl +
    '/groups/' +
    groupId +
    '/expenses/' +
    expenseId +
    '/sub-expenses/' +
    subsxpenseId;

  const res = await config.httpClient.get<GetSubexpenseResponse>(
    url,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
