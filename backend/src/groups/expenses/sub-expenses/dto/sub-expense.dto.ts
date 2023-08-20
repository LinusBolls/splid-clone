import { GroupMemberExpenseDto } from '../group-member-expenses/dto/group-member-expenses.dto';
import Big from 'big.js';
import { Expose } from 'class-transformer';

export class SubExpenseDto {
  @Expose() id: string;

  @Expose() amount: Big;
  @Expose() currency: string;
  @Expose() amountReferenceCurrency: Big;

  @Expose() groupMemberExpenses: GroupMemberExpenseDto[];
}
