import { Allow } from "class-validator";
import { CreateExpensesCategoryDto } from "../expenses-category/dto/create-expenses-category.dto";

export class CreateExpenseDto {
  @Allow()
  name: string;
  @Allow()
  description: string;
  @Allow()
  location: string;

  @Allow()
  categories: CreateExpensesCategoryDto[];
}
