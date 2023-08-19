import { ExpenseCategoryDto } from 'src/groups/expense-categories/dto/expense-category.dto';
import { ExpensesAssetDto } from '../expenses-asset/dto/expenses-asset.dto';
import { SubExpenseDto } from '../sub-expenses/dto/sub-expense.dto';
import {Expose} from "class-transformer";

export class ExpenseDto {
  @Expose() id: string
  @Expose() name: String
  @Expose() description: string
  @Expose() location: string

  @Expose() assets: ExpensesAssetDto[]
  @Expose() categories: ExpenseCategoryDto[]
  @Expose() subExpenses: SubExpenseDto[]
}
