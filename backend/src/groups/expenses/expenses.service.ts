import {Injectable} from '@nestjs/common';
import {CreateExpenseDto} from './dto/create-expense.dto';
import {UpdateExpenseDto} from './dto/update-expense.dto';
import {PrismaClient} from '@prisma/client';
import {ExpenseMapper} from './mapping/expense.mapper';
import {SubExpensesService} from './sub-expenses/sub-expenses.service';
import Big from "big.js";
import {GroupMemberExpensesService} from "./sub-expenses/group-member-expenses/group-member-expenses.service";
import {ExpenseEntity} from "./entities/expense.entity";

const prisma = new PrismaClient();

@Injectable()
export class ExpensesService {
  constructor(
    private readonly subExpensesService: SubExpensesService,
    private readonly expenseMapper: ExpenseMapper,
    private readonly groupMemberExpensesService: GroupMemberExpensesService,
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

    const result = this.expenseMapper.categoryEnhancedEntitiesFromDb(dbResult);

    return Promise.all(result.map(async value => ({
      ...await this.includeAmount(value),
      ...result
    })));
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

    const result = this.expenseMapper.categoryEnhancedEntityFromDb(dbResult);

    return {
      ...await this.includeAmount(result),
      ...result
    };
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
      await this.subExpensesService.removeSubExpensesBelongingToExpense(
        expense.id,
      );
      await this.deleteCategoryMapping(expense.id);
    }

    await prisma.expense.deleteMany({
      where: {
        groupId,
      },
    });
  }

  async remove(id: string, groupId: string) {
    //TODO prisma transaction
    await this.deleteCategoryMapping(id);

    await this.subExpensesService.removeSubExpensesBelongingToExpense(id);

    await prisma.expense.delete({
      where: {
        id,
        groupId,
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

  private async includeAmount(
      expense: ExpenseEntity,
  ): Promise<ExpenseEntity> {
    const subExpenses = await this.subExpensesService.findAll(expense.id);

    let amount: Big;
    let amountReferenceCurrency: Big;
    let currency: string;

    for (let subExpense of subExpenses) {
      const memberExpenses = await this.groupMemberExpensesService.findAll(
          subExpense.id,
      );

      memberExpenses.forEach((value) => {
        if (value.role === 'SPONSOR') {
          amount = value.amount.add(amount || 0);
          amountReferenceCurrency = value.amountReferenceCurrency.add(
              amountReferenceCurrency || 0,
          );
          currency = value.currency;
        }
      });
    }

    return {
      ...expense,
      amount,
      amountReferenceCurrency,
      currency,
      subExpenses,
      categories: undefined
    };
  }

  private async includeAmountBulk(
      expenses: ExpenseEntity[],
  ): Promise<ExpenseEntity[]> {
    const list: ExpenseEntity[] = [];

    for (const subExpense of expenses) {
      const completedExpense = await this.includeAmount(subExpense);
      list.push(completedExpense);
    }

    return list;
  }
}
