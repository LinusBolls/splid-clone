import { IsNotEmpty } from 'class-validator';

export class CreateSubExpenseDto {
  @IsNotEmpty()
  name: string;
}
