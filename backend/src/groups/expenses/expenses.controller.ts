import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { GroupsService } from '../groups.service';
import { ExpenseCategoriesService } from '../expense-categories/expense-categories.service';
import { ExpenseMapper } from './mapping/expense.mapper';

@Controller('/groups/:groupId/expenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly groupsService: GroupsService,
    private readonly categoryService: ExpenseCategoriesService,
    private readonly expenseMapper: ExpenseMapper,
  ) {}

  @Post()
  async create(
    @Param('groupId') groupId: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    for (const categoryId of createExpenseDto.categoryIds) {
      if (!(await this.categoryService.exists(categoryId, groupId))) {
        throw new HttpException(
          `Category with the id: ${categoryId} doesn't exist`,
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
    }

    const result = await this.expensesService.create(createExpenseDto, groupId);

    return this.expenseMapper.dtoFromEntity(result);
  }

  @Get()
  async findAll(@Param('groupId') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.expensesService.findAll(groupId);

    return this.expenseMapper.dtosFromEntities(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Param('groupId') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const findResult = await this.expensesService.findOne(id, groupId);

    if (findResult === null) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }


    return this.expenseMapper.dtoFromEntity(findResult);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Param('groupId') groupId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.expensesService.exists(id, groupId))) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    for (const categoryId of updateExpenseDto.categoryIds) {
      if (!(await this.categoryService.exists(categoryId, groupId))) {
        throw new HttpException(
          `Category with the id: ${categoryId} doesn't exist`,
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
    }

    const result = await this.expensesService.update(id, updateExpenseDto);

    return this.expenseMapper.dtoFromEntity(result);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Param('groupId') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.expensesService.exists(id, groupId))) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    return this.expensesService.remove(id, groupId);
  }
}
