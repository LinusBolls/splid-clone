import { Allow } from 'class-validator';

export class CreateExpensesCategoryDto {
  @Allow()
  name: string;
}

export class MapCategoryToExpenseDto {
  id: string;
}
