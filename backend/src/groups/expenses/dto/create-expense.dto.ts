import {Allow, IsOptional} from 'class-validator';

export class CreateExpenseDto {
  @Allow()
  name: string;
  @Allow()
  description: string;
  @Allow()
  location: string;

  @IsOptional()
  categoryIds: string[];
}