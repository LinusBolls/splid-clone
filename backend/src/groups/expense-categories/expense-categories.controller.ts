import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put,} from '@nestjs/common';
import {ExpenseCategoriesService} from './expense-categories.service';
import {CreateExpenseCategoryDto} from './dto/create-expense-category.dto';
import {UpdateExpenseCategoryDto} from './dto/update-expense-category.dto';
import {GroupsService} from '../groups.service';

@Controller('/groups/:groupId/expense-categories')
export class ExpenseCategoriesController {
  constructor(
    private readonly expensesCategoryService: ExpenseCategoriesService,
    private readonly groupsService: GroupsService,
  ) {}

  @Post()
  async create(
    @Param('groupId') groupId: string,
    @Body() createExpensesCategoryDto: CreateExpenseCategoryDto,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    return this.expensesCategoryService.create(
      createExpensesCategoryDto,
      groupId,
    );
  }

  @Get()
  async findAll(@Param('groupId') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    return this.expensesCategoryService.findAll(groupId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Param('groupId') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const findResult = await this.expensesCategoryService.findOne(id, groupId);

    if (findResult === null) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return findResult;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Param('groupId') groupId: string,
    @Body() updateExpensesCategoryDto: UpdateExpenseCategoryDto,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.expensesCategoryService.exists(id, groupId))) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return this.expensesCategoryService.update(
      id,
      updateExpensesCategoryDto,
      groupId,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Param('groupId') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.expensesCategoryService.exists(id, groupId))) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.expensesCategoryService.remove(id, groupId);
    } catch (e) {
      throw new HttpException(
        'Category is still associated to at least 1 expense',
        HttpStatus.CONFLICT,
      );
    }
  }
}
