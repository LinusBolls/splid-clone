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

  async addCategoryToExpense(expenseId: string, categoryId: string) {
    await prisma.mappingExpenseCategory.create({
      data: {
        expenseId,
        expenseCategoryId: categoryId
      }
    })
  }

  async deleteCategoryMappingByExpenseId(expenseId: string) {
    await prisma.mappingExpenseCategory.deleteMany({
      where: {
        expenseId
      }
    })
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
    return prisma.expenseCategory.findMany();
  }

  findOne(id: string) {
    return prisma.expenseCategory.findFirst({
      where: {
        id
      }
    });
  }

  update(id: string, updateExpensesCategoryDto: UpdateExpensesCategoryDto) {
    return prisma.expenseCategory.update({
      where: {
        id
      },
      data: {
        ...updateExpensesCategoryDto
      }
    });
  }

  remove(id: string) {
    return prisma.expenseCategory.delete({
      where: {
        id
      }
    });
  }
}
