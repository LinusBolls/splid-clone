import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesCategoryService } from './expenses-category/expenses-category.service';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

@Injectable()
export class ExpensesService {
  constructor(private categoryService: ExpensesCategoryService) {}

  async create(createExpenseDto: CreateExpenseDto, id: string) {
    const expense = await prisma.expense.create({
      data: {
        ...createExpenseDto,
        groupId: id
      }
    })



//    for (const category of createExpenseDto.categories) {
//      await this.categoryService.create(category, expense.id);
//    }
//
    return 1;
  }

  findAll() {
    return prisma.expense.findMany();
  }

  findOne(id: string) {
    return prisma.expense.findFirst({
      where: {
        id: id,
      }
    });
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return prisma.expense.update({
      where: {
        id
      },
      data: {
        name: updateExpenseDto.name,
        description: updateExpenseDto.description,
        location: updateExpenseDto.location,
      }
    });
  }

  remove(id: string) {
    return prisma.expense.delete({
      where: {
        id
      }
    });
  }
}
