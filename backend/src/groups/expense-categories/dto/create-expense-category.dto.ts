import {IsNotEmpty} from 'class-validator';

export class CreateExpenseCategoryDto {
  @IsNotEmpty()
  name: string;
}