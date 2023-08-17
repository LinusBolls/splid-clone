import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupMemberExpenseDto } from './create-group-member-expense.dto';

export class UpdateGroupMemberExpenseDto extends PartialType(CreateGroupMemberExpenseDto) {}
