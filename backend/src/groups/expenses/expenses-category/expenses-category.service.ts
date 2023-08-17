import { Injectable } from '@nestjs/common';
import { CreateExpensesCategoryDto } from './dto/create-expenses-category.dto';
import { UpdateExpensesCategoryDto } from './dto/update-expenses-category.dto';

@Injectable()
export class ExpensesCategoryService {
  create(createExpensesCategoryDto: CreateExpensesCategoryDto) {
    return 'This action adds a new expensesCategory';
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
