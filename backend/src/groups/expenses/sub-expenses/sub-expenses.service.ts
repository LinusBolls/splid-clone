import { Injectable } from '@nestjs/common';
import { CreateSubExpenseDto } from './dto/create-sub-expense.dto';
import { UpdateSubExpenseDto } from './dto/update-sub-expense.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class SubExpensesService {
  async create(createSubExpenseDto: CreateSubExpenseDto, expenseId: string) {
    return prisma.subExpense.create({
      data: {
        ...createSubExpenseDto,
        //TODO: change 23 to an acutal number
        expenseId
      }
    });
  }

  findAll(expenseId: string) {
    return prisma.subExpense.findMany({
      where: {
        expenseId
      }
    });
  }

  findOne(id: string, expenseId: string) {
    return prisma.subExpense.findFirst({
      where: {
        expenseId,
        id
      }
    });
  }

  update(id: string, updateSubExpenseDto: UpdateSubExpenseDto, expenseId: string) {
    return prisma.subExpense.update({
      where: {
        expenseId,
        id
      },
      data: {
        ...updateSubExpenseDto,
      }
    });
  }

  remove(id: string, expenseId: string) {
    //TODO: delete all Groupmemberexpenses and assets
    return prisma.subExpense.delete({
      where: {
        expenseId,
        id
      }
    });
  }
}
