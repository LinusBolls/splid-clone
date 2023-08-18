import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExpensesCategoryService } from './expenses-category.service';
import { CreateExpensesCategoryDto } from './dto/create-expenses-category.dto';
import { UpdateExpensesCategoryDto } from './dto/update-expenses-category.dto';
import { GroupsService } from '../groups.service';

@Controller('/groups/:groupid/expenses-category')
export class ExpensesCategoryController {
  constructor(
    private readonly expensesCategoryService: ExpensesCategoryService,
    private readonly groupsService: GroupsService,
  ) {}

  @Post()
  async create(
    @Param('groupid') groupId: string,
    @Body() createExpensesCategoryDto: CreateExpensesCategoryDto,
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
  async findAll(@Param('groupid') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    return this.expensesCategoryService.findAll(groupId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Param('groupid') groupId: string) {
    console.log(groupId);
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const findResult = await this.expensesCategoryService.findOne(id, groupId);

    if (findResult === null) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return findResult;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Param('groupid') groupId: string,
    @Body() updateExpensesCategoryDto: UpdateExpensesCategoryDto,
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
  async remove(@Param('id') id: string, @Param('groupid') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.expensesCategoryService.exists(id, groupId))) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    try {
      return await this.expensesCategoryService.remove(id, groupId);
    } catch (e) {
      throw new HttpException(
        'Category is associated to Expenses',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
