import { ArrayNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  description: string;
  @IsOptional()
  location: string;

  @ArrayNotEmpty()
  categoryIds: string[];
}
