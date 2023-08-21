import { Expose } from 'class-transformer';
import { GroupMemberExpenseEntity } from '../group-member-expenses/entities/group-member-expense.entity';

export class SubExpenseEntity {
  @Expose() id: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  @Expose() amount: Big;
  @Expose() currency: string;
  @Expose() amountReferenceCurrency: Big;

  @Expose() expenseId: string;
  @Expose() groupMemberExpenses: GroupMemberExpenseEntity[];
}
