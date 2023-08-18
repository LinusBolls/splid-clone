import { Injectable } from '@nestjs/common';
import { CreateExpensesCategoryDto } from './dto/create-expenses-category.dto';
import { UpdateExpensesCategoryDto } from './dto/update-expenses-category.dto';
import { PrismaClient } from '@prisma/client';
import { throws } from 'assert';
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

  async addCategoryToExpense(expenseId: string, categoryId: string) {
    await prisma.mappingExpenseCategory.create({
      data: {
        expenseId,
        expenseCategoryId: categoryId,
      },
    });
  }

  async deleteCategoryMappingByExpenseId(expenseId: string) {
    await prisma.mappingExpenseCategory.deleteMany({
      where: {
        expenseId,
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

  findAll(groupId: string) {
    return prisma.expenseCategory.findMany({
      where: {
        groupId
      }
    });
  }

  findOne(id: string, groupId: string) {
    return prisma.expenseCategory.findFirst({
      where: {
        id,
        groupId
      },
    });
  }

  async exists(id: string, groupId: string){
    return (
      (await prisma.expenseCategory.findFirst({
        where: {
          id,
          groupId
        },
      })) !== null
    );
  }
  update(id: string, updateExpensesCategoryDto: UpdateExpensesCategoryDto, groupId: string) {
    return prisma.expenseCategory.update({
      where: {
        id,
        groupId
      },
      data: {
        ...updateExpensesCategoryDto,
      },
    });
  }

  async remove(id: string, groupId: string) {
    const findResult = await prisma.mappingExpenseCategory.findMany();
    if (findResult.length > 0) {
      throw new Error("Category is associated to Expenses");
    }

    return prisma.expenseCategory.delete({
      where: {
        id,
        groupId
      },
    });
  }
}
