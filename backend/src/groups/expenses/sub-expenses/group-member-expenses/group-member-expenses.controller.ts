import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GroupMemberExpensesService } from './group-member-expenses.service';
import { CreateGroupMemberExpenseDto } from './dto/create-group-member-expense.dto';
import { UpdateGroupMemberExpenseDto } from './dto/update-group-member-expense.dto';
import { GroupsService } from 'src/groups/groups.service';
import { SubExpensesService } from '../sub-expenses.service';
import { ExpensesService } from '../../expenses.service';

@Controller(
  '/groups/:groupid/expenses/:expenseid/sub-expense/:subexpenseid/group-member-expenses',
)
export class GroupMemberExpensesController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly subExpensesService: SubExpensesService,
    private readonly expensesService: ExpensesService,
    private readonly groupMemberService: GroupsService,
    private readonly groupMemberExpensesService: GroupMemberExpensesService,
  ) {}

  @Post()
  async create(
    @Param('groupid') groupId: string,
    @Param('expenseid') expenseId: string,
    @Param('subExpenseId') subExpenseId: string,
    @Body() createGroupMemberExpenseDto: CreateGroupMemberExpenseDto,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupExpenseAndSubExpenseExist(
      groupId,
      expenseId,
      subExpenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    if (!(await this.groupMemberService.exists(createGroupMemberExpenseDto.groupMemberId)))
        throw new HttpException('GroupMember not found', HttpStatus.NOT_FOUND);

    return this.groupMemberExpensesService.create(
      createGroupMemberExpenseDto,
      subExpenseId,
    );
  }

  @Get()
  async findAll(
    @Param('groupid') groupId: string,
    @Param('expenseid') expenseId: string,
    @Param('subExpenseId') subExpenseId: string,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupExpenseAndSubExpenseExist(
      groupId,
      expenseId,
      subExpenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    return this.groupMemberExpensesService.findAll(subExpenseId);
  }

  @Get(':id')
  async findOne(
    @Param('groupid') groupId: string,
    @Param('expenseid') expenseId: string,
    @Param('subExpenseId') subExpenseId: string,
    @Param('id') id: string,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupExpenseAndSubExpenseExist(
      groupId,
      expenseId,
      subExpenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    const findResult = await this.subExpensesService.findOne(id, subExpenseId)

    if (findResult === null) 
      throw new HttpException('GroupMemberExpense not found', HttpStatus.NOT_FOUND);

    return findResult;
  }

  @Patch(':id')
  async update(
    @Param('groupid') groupId: string,
    @Param('expenseid') expenseId: string,
    @Param('subExpenseId') subExpenseId: string,
    @Param('id') id: string,
    @Body() updateGroupMemberExpenseDto: UpdateGroupMemberExpenseDto,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupExpenseAndSubExpenseExist(
      groupId,
      expenseId,
      subExpenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    if (!(await this.groupMemberExpensesService.exists(id, subExpenseId)))
      return new HttpException('GroupMemberExpense not found', HttpStatus.NOT_FOUND);

    return this.groupMemberExpensesService.update(
      id,
      updateGroupMemberExpenseDto,
      subExpenseId,
    );
  }

  @Delete(':id')
  async remove(
    @Param('groupid') groupId: string,
    @Param('expenseid') expenseId: string,
    @Param('subExpenseId') subExpenseId: string,
    @Param('id') id: string,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupExpenseAndSubExpenseExist(
      groupId,
      expenseId,
      subExpenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    if (!(await this.groupMemberExpensesService.exists(id, subExpenseId)))
      return new HttpException('GroupMemberExpense not found', HttpStatus.NOT_FOUND);

    return this.groupMemberExpensesService.remove(id, subExpenseId);
  }

  async checkIfGroupExpenseAndSubExpenseExist(
    groupId: string,
    expenseId: string,
    subExpenseId: string,
  ): Promise<HttpException | null> {
    if (!(await this.groupsService.exists(groupId)))
      return new HttpException('Group not found', HttpStatus.NOT_FOUND);

    if (!(await this.expensesService.exists(expenseId, groupId)))
      return new HttpException('Expense not found', HttpStatus.NOT_FOUND);

    if (!(await this.subExpensesService.exists(subExpenseId, expenseId)))
      return new HttpException('SubExpense not found', HttpStatus.NOT_FOUND);

    return null;
  }
}
