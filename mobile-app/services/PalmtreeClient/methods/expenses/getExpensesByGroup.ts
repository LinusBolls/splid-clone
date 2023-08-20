import { ExpenseDto } from '../../../../../backend/src/groups/expenses/dto/expense.dto';
import { RequestConfig } from '../../requestConfig';

export type GetExpensesByGroupResponse = ExpenseDto[];

export async function getExpensesByGroup(
  config: RequestConfig,
  groupId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/expenses';

  const res = await config.httpClient.get<GetExpensesByGroupResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
