import { Injectable } from '@nestjs/common';
import { CreateGroupMemberExpenseDto } from './dto/create-group-member-expense.dto';
import { UpdateGroupMemberExpenseDto } from './dto/update-group-member-expense.dto';

@Injectable()
export class GroupMemberExpensesService {
  create(createGroupMemberExpenseDto: CreateGroupMemberExpenseDto) {
    return 'This action adds a new groupMemberExpense';
  }

  findAll() {
    return `This action returns all groupMemberExpenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupMemberExpense`;
  }

  update(id: number, updateGroupMemberExpenseDto: UpdateGroupMemberExpenseDto) {
    return `This action updates a #${id} groupMemberExpense`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupMemberExpense`;
  }
}
