import { Injectable } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ExpenseCategoriesService {
  create(createExpensesCategoryDto: CreateExpenseCategoryDto, groupId: string) {
    return prisma.expenseCategory.create({
      data: {
        ...createExpensesCategoryDto,
        groupId,
      },
    });
  }

  createBulk(
    createExpensesCategoryDtos: CreateExpenseCategoryDto[],
    groupId: string,
  ) {
    return prisma.expenseCategory.createMany({
      data: createExpensesCategoryDtos.map((createDto) => ({
        ...createDto,
        groupId,
      })),
    });
  }

  findAll(groupId: string) {
    return prisma.expenseCategory.findMany({
      where: {
        groupId,
      },
    });
  }

  findOne(id: string, groupId: string) {
    return prisma.expenseCategory.findFirst({
      where: {
        id,
        groupId,
      },
    });
  }

  async exists(id: string, groupId: string) {
    return (
      (await prisma.expenseCategory.findFirst({
        where: {
          id,
          groupId,
        },
      })) !== null
    );
  }
  update(
    id: string,
    updateExpensesCategoryDto: UpdateExpenseCategoryDto,
    groupId: string,
  ) {
    return prisma.expenseCategory.update({
      where: {
        id,
        groupId,
      },
      data: {
        ...updateExpensesCategoryDto,
      },
    });
  }

  async removeAllByGroupId(groupId: string) {
    await prisma.expenseCategory.deleteMany({
      where: {
        groupId,
      },
    });
  }

  async remove(id: string, groupId: string) {
    const findResult = await prisma.mappingExpenseCategory.findMany({
      where: {
        expenseId: id,
      },
    });

    if (findResult.length > 0) {
      throw new Error('Category is associated to Expenses');
    }

    return prisma.expenseCategory.delete({
      where: {
        id,
        groupId,
      },
    });
  }
}
