import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaClient } from '@prisma/client';
import { ExpensesCategoryService } from '../expenses-category/expenses-category.service';
const prisma = new PrismaClient();

@Injectable()
export class ExpensesService {
  constructor(private categoryService: ExpensesCategoryService) {}


  async create(createExpenseDto: CreateExpenseDto, groupId: string) {
    const expense = await prisma.expense.create({
      data: {
        name: createExpenseDto.name,
        description: createExpenseDto.description,
        location: createExpenseDto.location,
        groupId
      },
    });

    for (const category of createExpenseDto.categories) {
      await this.categoryService.addCategoryToExpense(expense.id, category.id);
    }
    
    return expense;
  }

  findAll() {
    return prisma.expense.findMany();
  }

  findOne(id: string) {
    return prisma.expense.findFirst({
      where: {
        id: id,
      },
    });
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

  async removeAllExpensesAndMappedCategoriesByGroupId(groupId: string) {
    const expenses = await prisma.expense.findMany({
      where: {
        groupId
      }
    })

    for (const expense of expenses) {
      await this.categoryService.deleteCategoryMappingByExpenseId(expense.id);
    }

    await prisma.expense.deleteMany({
      where: {
        groupId
      }
    })
  }

  async remove(id: string) {

    await this.categoryService.deleteCategoryMappingByExpenseId(id);

    return prisma.expense.delete({
      where: {
        id,
      },
    });
  }
}
