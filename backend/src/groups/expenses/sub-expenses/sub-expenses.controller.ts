import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubExpensesService } from './sub-expenses.service';
import { CreateSubExpenseDto } from './dto/create-sub-expense.dto';
import { UpdateSubExpenseDto } from './dto/update-sub-expense.dto';

@Controller('/groups/:groupid/expenses/:expenseid/sub-expenses')
export class SubExpensesController {
  constructor(private readonly subExpensesService: SubExpensesService) {}

  @Post()
  create(@Param("groupid") groupId: string, @Param("expenseid") expenseId: string, @Body() createSubExpenseDto: CreateSubExpenseDto) {
    return this.subExpensesService.create(createSubExpenseDto, expenseId);
  }

  @Get()
  findAll(@Param("groupid") groupId: string, @Param("expenseid") expenseId: string) {
    return this.subExpensesService.findAll(expenseId);
  }

  @Get(':id')
  findOne(@Param("groupid") groupId: string, @Param('id') id: string, @Param("expenseid") expenseId: string) {
    return this.subExpensesService.findOne(id, expenseId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Param("groupid") groupId: string, 
    @Param("expenseid") expenseId: string,
    @Body() updateSubExpenseDto: UpdateSubExpenseDto,
  ) {
    return this.subExpensesService.update(id, updateSubExpenseDto, expenseId);
  }

  @Delete(':id')
  remove(
    @Param("groupid") groupId: string,
    @Param('id') id: string,
    @Param("expenseid") expenseId: string
  ) {
    return this.subExpensesService.remove(id, expenseId);
  }
}
