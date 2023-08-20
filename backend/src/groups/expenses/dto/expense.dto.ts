import {ExpenseCategoryDto} from 'src/groups/expense-categories/dto/expense-category.dto';
import {SubExpenseDto} from '../sub-expenses/dto/sub-expense.dto';
import {Expose} from 'class-transformer';
import Big from "big.js";

export class ExpenseDto {
  @Expose() id: string;
  @Expose() name: String;
  @Expose() description: string;
  @Expose() location: string;

  @Expose() amount: Big;
  @Expose() currency: string;
  @Expose() amountReferenceCurrency: Big;

  //@Expose() assets: ExpensesAssetDto[];
  @Expose() categories: ExpenseCategoryDto[];
  @Expose() subExpenses: SubExpenseDto[];
}
