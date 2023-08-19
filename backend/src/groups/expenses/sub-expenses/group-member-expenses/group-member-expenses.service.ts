import { Injectable } from '@nestjs/common';
import {
  CreateGroupMemberExpenseDto,
  GROUP_MEMBER_EXPENSE_ROLE,
} from './dto/create-group-member-expense.dto';
import { UpdateGroupMemberExpenseDto } from './dto/update-group-member-expense.dto';
import { PrismaClient } from '@prisma/client';
import Big from 'big.js';
const prisma = new PrismaClient();

interface GroupMemberExpenseMany {
  amount: string;
  amountReferenceCurrency: string;
  role: keyof typeof GROUP_MEMBER_EXPENSE_ROLE;
  currency: string;
  groupMemberId: string;
  subExpenseId: string;
}
@Injectable()
export class GroupMemberExpensesService {
  async create(
    createGroupMemberExpenseDto: CreateGroupMemberExpenseDto[],
    subExpenseId: string,
  ) {
    const groupMemberExpenses: GroupMemberExpenseMany[] =
      createGroupMemberExpenseDto.map((groupMemberExpense) => ({
        ...groupMemberExpense,
        amount: groupMemberExpense.amount.toString(),
        //TODO: Needs to be changed from 23
        amountReferenceCurrency: new Big(23).toString(),
        subExpenseId,
      }));

    await prisma.groupMemberExpense.createMany({
      data: groupMemberExpenses,
    });

    return this.findAll(subExpenseId);
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

  async removeAllGroupMemberExpensesBelongingToSubExpense(
    subExpenseId: string,
  ) {
    const findResults = await this.findAll(subExpenseId);

    if (findResults.length === 0) return;

    return prisma.groupMemberExpense.deleteMany({
      where: {
        subExpenseId,
      },
    });
  }
}
