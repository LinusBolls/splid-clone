import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaClient } from '@prisma/client';
import { ExpenseMapper } from './mapping/expense.mapper';
import { SubExpensesService } from './sub-expenses/sub-expenses.service';

const prisma = new PrismaClient();

@Injectable()
export class ExpensesService {
  constructor(
    private readonly subExpensesService: SubExpensesService,
    private readonly expenseMapper: ExpenseMapper,
  ) {}

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
      await this.addCategory(expense.id, categoryId);
    }

    return this.expenseMapper.entityFromDb(expense);
  }

  async findAll(groupId: string) {
    const dbResult = await prisma.expense.findMany({
      where: {
        groupId,
      },
      include: {
        categories: {
          include: {
            expenseCategory: true,
          },
        },
      },
    });

    return this.expenseMapper.categoryEnhancedEntitiesFromDb(dbResult);
  }

  async findOne(id: string, groupId: string) {
    const dbResult = await prisma.expense.findFirst({
      where: {
        id,
        groupId,
      },
      include: {
        categories: {
          include: {
            expenseCategory: true,
          },
        },
      },
    });

    return this.expenseMapper.categoryEnhancedEntityFromDb(dbResult);
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
    //TODO prisma transaction

    await this.deleteCategoryMapping(id);
    await this.addCategories(id, updateExpenseDto.categoryIds);

    const dbResult = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        name: updateExpenseDto.name,
        description: updateExpenseDto.description,
        location: updateExpenseDto.location,
      },
      include: {
        categories: {
          include: {
            expenseCategory: true,
          },
        },
      },
    });

    return this.expenseMapper.categoryEnhancedEntityFromDb(dbResult);
  }

  async removeAllByGroupId(groupId: string) {
    //TODO prisma transaction

    for (const expense of await this.findAll(groupId)) {
      await this.deleteCategoryMapping(expense.id);
    }

    await prisma.expense.deleteMany({
      where: {
        groupId,
      },
    });
  }

  async remove(id: string) {
    //TODO prisma transaction
    await this.deleteCategoryMapping(id);

    await this.subExpensesService.removeSubExpensesBelongingToExpense(id);

    await prisma.expense.delete({
      where: {
        id,
      },
    });
  }

  private addCategory(expenseId: string, categoryId: string) {
    return prisma.mappingExpenseCategory.create({
      data: {
        expenseId,
        expenseCategoryId: categoryId,
      },
    });
  }

  private addCategories(expenseId: string, categoryIds: string[]) {
    return prisma.mappingExpenseCategory.createMany({
      data: categoryIds.map((categoryId) => ({
        expenseCategoryId: categoryId,
        expenseId,
      })),
    });
  }

  private deleteCategoryMapping(expenseId: string) {
    return prisma.mappingExpenseCategory.deleteMany({
      where: {
        expenseId,
      },
    });
  }
}
