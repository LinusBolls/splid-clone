import { Allow } from 'class-validator';
import { MapCategoryToExpenseDto } from 'src/groups/expenses-category/dto/create-expenses-category.dto';

export class CreateExpenseDto {
  @Allow()
  name: string;
  @Allow()
  description: string;
  @Allow()
  location: string;

  @Allow()
  categories: MapCategoryToExpenseDto[];
}
