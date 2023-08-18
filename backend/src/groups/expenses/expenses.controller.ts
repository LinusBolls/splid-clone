import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { GroupsService } from '../groups.service';
import { ExpensesCategoryService } from '../expenses-category/expenses-category.service';

@Controller('/groups/:groupid/expenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly groupsService: GroupsService,
    private readonly categoryService: ExpensesCategoryService,
  ) {}

  @Post()
  async create(
    @Param('groupid') groupId: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    for (const category of createExpenseDto.categories) {
      if (!(await this.categoryService.exists(category.id, groupId))) {
        throw new HttpException(
          `Category with the id: ${category.id} doesn't exist`,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return this.expensesService.create(createExpenseDto, groupId);
  }

  @Get()
  async findAll(@Param('groupid') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }
    return this.expensesService.findAll(groupId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Param('groupid') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const findResult = await this.expensesService.findOne(id, groupId);

    if (findResult === null) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    return findResult;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Param('groupid') groupId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.expensesService.exists(id, groupId))) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Param('groupid') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.expensesService.exists(id, groupId))) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return this.expensesService.remove(id);
  }
}
