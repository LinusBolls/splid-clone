import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaClient } from '@prisma/client';
import { ExpenseCategoriesService } from '../expense-categories/expense-categories.service';
const prisma = new PrismaClient();

@Injectable()
export class ExpensesService {
  constructor(private categoryService: ExpenseCategoriesService) {}

  async create(createExpenseDto: CreateExpenseDto, groupId: string) {
    const expense = await prisma.expense.create({
      data: {
        name: createExpenseDto.name,
        description: createExpenseDto.description,
        location: createExpenseDto.location,
        groupId,
      },
    });

    for (const categoryId of createExpenseDto.categoryIds) {
      await this.categoryService.addCategoryToExpense(expense.id, categoryId);
    }

    return expense;
  }

  findAll(groupId: string) {
    return prisma.expense.findMany({
      where: {
        groupId,
      },
    });
  }

  findOne(id: string, groupId: string) {
    return prisma.expense.findFirst({
      where: {
        id,
        groupId,
      },
    });
  }

  async exists(id: string, groupId: string) {
    return (
      (await prisma.expense.findFirst({
        where: {
          id,
          groupId,
        },
      })) !== null
    );
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return prisma.expense.update({
      where: {
        id,
      },
      data: {
        name: updateExpenseDto.name,
        description: updateExpenseDto.description,
        location: updateExpenseDto.location,
      },
    });
  }

  async removeAllByGroupId(groupId: string) {
    //TODO prisma transaction

    for (const expense of (await this.findAll(groupId))) {
      await this.categoryService.deleteCategoryMappingByExpenseId(expense.id);
    }

    await prisma.expense.deleteMany({
      where: {
        groupId,
      },
    });
  }

  async remove(id: string) {
    //TODO prisma transaction
    await this.categoryService.deleteCategoryMappingByExpenseId(id);

    return prisma.expense.delete({
      where: {
        id,
      },
    });
  }
}
