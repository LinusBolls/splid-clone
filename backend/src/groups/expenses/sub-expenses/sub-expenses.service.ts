import { Injectable } from '@nestjs/common';
import { CreateSubExpenseDto } from './dto/create-sub-expense.dto';
import { UpdateSubExpenseDto } from './dto/update-sub-expense.dto';

@Injectable()
export class SubExpensesService {
  create(createSubExpenseDto: CreateSubExpenseDto) {
    return 'This action adds a new subExpense';
  }

  findAll() {
    return `This action returns all subExpenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subExpense`;
  }

  update(id: number, updateSubExpenseDto: UpdateSubExpenseDto) {
    return `This action updates a #${id} subExpense`;
  }

  remove(id: number) {
    return `This action removes a #${id} subExpense`;
  }
}
