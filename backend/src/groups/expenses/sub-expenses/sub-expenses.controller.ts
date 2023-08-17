import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubExpensesService } from './sub-expenses.service';
import { CreateSubExpenseDto } from './dto/create-sub-expense.dto';
import { UpdateSubExpenseDto } from './dto/update-sub-expense.dto';

@Controller('/groups/:groupid/expenses/:expenseid/sub-expenses')
export class SubExpensesController {
  constructor(private readonly subExpensesService: SubExpensesService) {}

  @Post()
  create(@Body() createSubExpenseDto: CreateSubExpenseDto) {
    return this.subExpensesService.create(createSubExpenseDto);
  }

  @Get()
  findAll() {
    return this.subExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subExpensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubExpenseDto: UpdateSubExpenseDto) {
    return this.subExpensesService.update(+id, updateSubExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subExpensesService.remove(+id);
  }
}
