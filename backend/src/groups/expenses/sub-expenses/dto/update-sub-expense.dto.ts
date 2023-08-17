import { PartialType } from '@nestjs/mapped-types';
import { CreateSubExpenseDto } from './create-sub-expense.dto';

export class UpdateSubExpenseDto extends PartialType(CreateSubExpenseDto) {}
