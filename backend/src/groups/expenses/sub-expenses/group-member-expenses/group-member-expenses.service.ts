import { Injectable } from '@nestjs/common';
import { CreateGroupMemberExpenseDto } from './dto/create-group-member-expense.dto';
import { UpdateGroupMemberExpenseDto } from './dto/update-group-member-expense.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class GroupMemberExpensesService {
  create(
    createGroupMemberExpenseDto: CreateGroupMemberExpenseDto,
    subExpenseId: string,
  ) {
    return prisma.groupMemberExpense.create({
      data: {
        ...createGroupMemberExpenseDto,
        amount: createGroupMemberExpenseDto.amount.toString(),
        //TODO: Change 23 to an acutal thing
        amountReferenceCurrency: 23,
        groupMemberId: createGroupMemberExpenseDto.groupMemberId,
        subExpenseId: subExpenseId,
      },
    });
  }

  findAll(subExpenseId: string) {
    return prisma.groupMemberExpense.findMany({
      where: {
        subExpenseId,
      },
    });
  }

  findOne(id: string, subExpenseId: string) {
    return prisma.groupMemberExpense.findFirst({
      where: {
        id,
        subExpenseId,
      },
    });
  }

  async exists(id: string, subExpenseId: string) {
    return (
      (await prisma.groupMemberExpense.findFirst({
        where: {
          id,
          subExpenseId,
        },
      })) !== null
    );
  }

  update(
    id: string,
    updateGroupMemberExpenseDto: UpdateGroupMemberExpenseDto,
    subExpenseId: string,
  ) {
    return prisma.groupMemberExpense.update({
      where: {
        id,
        subExpenseId,
      },
      data: {
        ...updateGroupMemberExpenseDto,
        amount: updateGroupMemberExpenseDto.amount.toString(),
      },
    });
  }

  remove(id: string, subExpenseId: string) {
    return prisma.groupMemberExpense.delete({
      where: {
        id,
        subExpenseId,
      },
    });
  }

  removeAllGroupMemberExpenseBelongingToSubExpense(subExpenseId: string) {
    return prisma.groupMemberExpense.deleteMany({
      where: {
        subExpenseId
      }
    })
  }
}
