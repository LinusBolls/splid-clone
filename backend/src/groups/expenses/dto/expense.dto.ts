import { ExpenseCategoryDto } from 'src/groups/expense-categories/dto/expense-category.dto';
import { ExpensesAssetDto } from '../expenses-asset/dto/expenses-asset.dto';
import { SubExpenseDto } from '../sub-expenses/dto/sub-expense.dto';

export class ExpenseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: String;
  descirption: string;
  location: string;

  assets: ExpensesAssetDto[];
  categories: ExpenseCategoryDto[];
  subExpenses: SubExpenseDto[];

  groupId: string;
}
