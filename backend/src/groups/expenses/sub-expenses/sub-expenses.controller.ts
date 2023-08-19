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
import { SubExpensesService } from './sub-expenses.service';
import { CreateSubExpenseDto } from './dto/create-sub-expense.dto';
import { UpdateSubExpenseDto } from './dto/update-sub-expense.dto';
import { GroupsService } from 'src/groups/groups.service';
import { ExpensesService } from '../expenses.service';

@Controller('/groups/:groupid/expenses/:expenseid/sub-expenses')
export class SubExpensesController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly subExpensesService: SubExpensesService,
    private readonly expensesService: ExpensesService,
  ) {}

  @Post()
  async create(
    @Param('groupid') groupId: string,
    @Param('expenseid') expenseId: string,
    @Body() createSubExpenseDto: CreateSubExpenseDto,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupAndExpenseExist(
      groupId,
      expenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    return this.subExpensesService.create(createSubExpenseDto, expenseId);
  }

  @Get()
  async findAll(
    @Param('groupid') groupId: string,
    @Param('expenseid') expenseId: string,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupAndExpenseExist(
      groupId,
      expenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    return this.subExpensesService.findAll(expenseId);
  }

  @Get(':id')
  async findOne(
    @Param('groupid') groupId: string,
    @Param('id') id: string,
    @Param('expenseid') expenseId: string,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupAndExpenseExist(
      groupId,
      expenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    const findResult = await this.subExpensesService.findOne(id, expenseId);

    if (findResult === null)
      throw new HttpException('SubExpense not found', HttpStatus.NOT_FOUND);

    return findResult;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Param('groupid') groupId: string,
    @Param('expenseid') expenseId: string,
    @Body() updateSubExpenseDto: UpdateSubExpenseDto,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupAndExpenseExist(
      groupId,
      expenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    if (!(await this.subExpensesService.exists(id, expenseId)))
      throw new HttpException('SubExpense not found', HttpStatus.NOT_FOUND);

    return this.subExpensesService.update(id, updateSubExpenseDto, expenseId);
  }

  @Delete(':id')
  async remove(
    @Param('groupid') groupId: string,
    @Param('id') id: string,
    @Param('expenseid') expenseId: string,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupAndExpenseExist(
      groupId,
      expenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    if (!(await this.subExpensesService.exists(id, expenseId)))
      throw new HttpException('SubExpense not found', HttpStatus.NOT_FOUND);

    return this.subExpensesService.remove(id, expenseId);
  }

  async checkIfGroupAndExpenseExist(
    groupId: string,
    expenseId: string,
  ): Promise<HttpException | null> {
    if (!(await this.groupsService.exists(groupId))) {
      return new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.expensesService.exists(groupId, expenseId))) {
      return new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    return null;
  }
}
