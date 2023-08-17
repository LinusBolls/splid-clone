import { ExpenseDto } from '../expenses/dto/expense.dto';
import { GroupMemberDto } from '../group-members/dto/group-member.dto';

export class GroupDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  currency: string;
  expenses: ExpenseDto[];
  groupMembers: GroupMemberDto[];
}
