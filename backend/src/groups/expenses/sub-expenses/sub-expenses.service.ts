import { Injectable } from '@nestjs/common';
import { CreateSubExpenseDto } from './dto/create-sub-expense.dto';
import { UpdateSubExpenseDto } from './dto/update-sub-expense.dto';
import {GroupMember, PrismaClient, SubExpense} from '@prisma/client';
import { GroupMemberExpensesService } from './group-member-expenses/group-member-expenses.service';
import {GroupMemberEntity} from "../../group-members/entities/group-member.entity";
import {SubExpenseEntity} from "./entities/sub-expense.entity";
import Big from "big.js";
const prisma = new PrismaClient();

interface SubExpenseMany {
  name: string;
  expenseId: string;
}

@Injectable()
export class SubExpensesService {
  constructor(
    private readonly groupMemberExpensesService: GroupMemberExpensesService,
  ) {}
  async create(createSubExpenseDto: CreateSubExpenseDto[], expenseId: string) {
    const subExpenses: SubExpenseMany[] = createSubExpenseDto.map(
      (subExpense) => ({
        name: subExpense.name,
        expenseId,
      }),
    );

    await prisma.subExpense.createMany({
      data: subExpenses,
    });

    return this.findAll(expenseId);
  }

  async findAll(expenseId: string) {
    const result = await prisma.subExpense.findMany({
      where: {
        expenseId,
      },
    });

    return this.includeAmountBulk(result);
  }

  findOne(id: string, expenseId: string) {
    return prisma.subExpense.findFirst({
      where: {
        expenseId,
        id,
      },
    });
  }

  async exists(id: string, expenseId: string) {
    return (
      (await prisma.subExpense.findFirst({
        where: {
          id,
          expenseId,
        },
      })) !== null
    );
  }

  update(
    id: string,
    updateSubExpenseDto: UpdateSubExpenseDto,
    expenseId: string,
  ) {
    return prisma.subExpense.update({
      where: {
        expenseId,
        id,
      },
      data: {
        ...updateSubExpenseDto,
      },
    });
  }

  async remove(id: string, expenseId: string) {
    //TODO: delete all Groupmemberexpenses and assets

    await this.groupMemberExpensesService.removeAllGroupMemberExpensesBelongingToSubExpense(
      id,
    );

    return prisma.subExpense.delete({
      where: {
        expenseId,
        id,
      },
    });
  }

  async removeSubExpensesBelongingToExpense(expenseId: string) {
    const allSubExpenses = await this.findAll(expenseId);

    for (const subExpense of allSubExpenses) {
      this.groupMemberExpensesService.removeAllGroupMemberExpensesBelongingToSubExpense(
        subExpense.id,
      );
    }

    return prisma.subExpense.deleteMany({
      where: {
        expenseId,
      },
    });
  }

  private async includeAmount(
      subExpense: SubExpense,
  ): Promise<SubExpenseEntity> {
    const memberExpenses = await this.groupMemberExpensesService.findAll(subExpense.id);

    let amount: Big
    let amountReferenceCurrency: Big
    let currency: string

    memberExpenses.forEach(value => {
      if (value.role === "SPONSOR") {
        amount = value.amount.add(amount || 0)
        amountReferenceCurrency = value.amountReferenceCurrency.add(amountReferenceCurrency || 0)
        currency = value.currency
      }
    })

    return {
      ...subExpense,
      amount,
      amountReferenceCurrency,
      currency,
      groupMemberExpenses: memberExpenses
    };
  }

  private async includeAmountBulk(
      subExpenses: SubExpense[],
  ): Promise<SubExpenseEntity[]> {
    const list: SubExpenseEntity[] = [];

    for (const subExpense of subExpenses) {
      const completedExpense = await this.includeAmount(subExpense);
      list.push(completedExpense);
    }

    return list;
  }
}
