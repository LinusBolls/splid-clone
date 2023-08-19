import { Injectable } from '@nestjs/common';
import { CreateGroupMemberExpenseDto } from './dto/create-group-member-expense.dto';
import { UpdateGroupMemberExpenseDto } from './dto/update-group-member-expense.dto';
import { PrismaClient, GROUP_MEMBER_EXPENSE_ROLE} from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class GroupMemberExpensesService {
  create(createGroupMemberExpenseDto: CreateGroupMemberExpenseDto, subExpenseId: string) {
    return prisma.groupMemberExpense.create({
      data: {
        ...createGroupMemberExpenseDto,
        amount: createGroupMemberExpenseDto.amount.toString(),
        //TODO: Change 23 to an acutal thing
        amountReferenceCurrency: 23,
        groupMemberId: createGroupMemberExpenseDto.groupMemberId,
      }
    });
  }

  findAll(subExpenseId: string) {
    return `This action returns all groupMemberExpenses`;
  }

  findOne(id: number, subExpenseId: string) {
    return `This action returns a #${id} groupMemberExpense`;
  }

  update(id: number, updateGroupMemberExpenseDto: UpdateGroupMemberExpenseDto, subExpenseId: string) {
    return `This action updates a #${id} groupMemberExpense`;
  }

  remove(id: number, subExpenseId: string) {
    return `This action removes a #${id} groupMemberExpense`;
  }
}
