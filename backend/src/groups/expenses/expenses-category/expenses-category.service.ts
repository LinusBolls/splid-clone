import { Injectable } from '@nestjs/common';
import { CreateExpensesCategoryDto } from './dto/create-expenses-category.dto';
import { UpdateExpensesCategoryDto } from './dto/update-expenses-category.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ExpensesCategoryService {
  create(
    createExpensesCategoryDto: CreateExpensesCategoryDto,
    groupId: string,
  ) {
    return prisma.expenseCategory.create({
      data: {
        ...createExpensesCategoryDto,
        groupId,
      },
    });
  }

  async initalizeDefaultCategories(groupId: string) {
    await prisma.expenseCategory.createMany({
      data: [
        {
          name: 'Transportation',
          groupId,
        },
      ],
    });
  }

  async deleteCategoriesByGroupId(groupId: string) {
    await prisma.expenseCategory.deleteMany({
      where: {
        groupId,
      },
    });
  }

  findAll() {
    return `This action returns all expensesCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expensesCategory`;
  }

  update(id: number, updateExpensesCategoryDto: UpdateExpensesCategoryDto) {
    return `This action updates a #${id} expensesCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} expensesCategory`;
  }
}
