import {SubExpenseEntity} from '../sub-expenses/entities/sub-expense.entity';
import {ExpensesCategoryEntity} from '../../expense-categories/entities/expense-category.entity';
import {Expose} from 'class-transformer';
import Big from "big.js";

export class ExpenseEntity {
  @Expose() id: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
  @Expose() name: String;
  @Expose() description: string;
  @Expose() location: string;

  @Expose() amount: Big;
  @Expose() currency: string;
  @Expose() amountReferenceCurrency: Big;

  //@Expose() assets: ExpensesAssetEntity[];
  @Expose() subExpenses: SubExpenseEntity[];
  //@Expose() group: Group;
  @Expose() categories: ExpensesCategoryEntity[];
}
