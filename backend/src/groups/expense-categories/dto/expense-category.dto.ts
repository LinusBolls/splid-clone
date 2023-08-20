import { Expose } from 'class-transformer';

export class ExpenseCategoryDto {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() groupId: string;
}
