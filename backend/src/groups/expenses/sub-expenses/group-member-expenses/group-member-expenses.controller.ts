import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Put,
} from '@nestjs/common';
import { GroupMemberExpensesService } from './group-member-expenses.service';
import { UpdateGroupMemberExpenseDto } from './dto/update-group-member-expense.dto';
import { GroupsService } from 'src/groups/groups.service';
import { SubExpensesService } from '../sub-expenses.service';
import { ExpensesService } from '../../expenses.service';
import { GroupMembersService } from 'src/groups/group-members/group-members.service';
import { GroupMemberExpenseMapper } from './mapping/group-member-expense.mapper';
import Big from "big.js";

@Controller(
  '/groups/:groupId/expenses/:expenseId/sub-expenses/:subExpenseId/group-member-expenses',
)
export class GroupMemberExpensesController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly subExpensesService: SubExpensesService,
    private readonly expensesService: ExpensesService,
    private readonly groupMemberService: GroupMembersService,
    private readonly groupMemberExpensesService: GroupMemberExpensesService,
    private readonly groupMemberExpenseMapper: GroupMemberExpenseMapper,
  ) {}

  @Get()
  async findAll(
    @Param('groupId') groupId: string,
    @Param('expenseId') expenseId: string,
    @Param('subExpenseId') subExpenseId: string,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupExpenseAndSubExpenseExist(
      groupId,
      expenseId,
      subExpenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    const result = await this.groupMemberExpensesService.findAll(subExpenseId);

    return this.groupMemberExpenseMapper.dtosFromEntities(result);
  }

  @Get(':id')
  async findOne(
    @Param('groupId') groupId: string,
    @Param('expenseId') expenseId: string,
    @Param('subExpenseId') subExpenseId: string,
    @Param('id') id: string,
  ) {
    const groupAndExpenseErr = await this.checkIfGroupExpenseAndSubExpenseExist(
      groupId,
      expenseId,
      subExpenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    const findResult = await this.groupMemberExpensesService.findOne(
      id,
      subExpenseId,
    );

    if (findResult === null)
      throw new HttpException(
        'GroupMemberExpense not found',
        HttpStatus.NOT_FOUND,
      );

    return this.groupMemberExpenseMapper.dtoFromEntity(findResult);
  }

  @Put()
  async update(
    @Param('groupId') groupId: string,
    @Param('expenseId') expenseId: string,
    @Param('subExpenseId') subExpenseId: string,
    @Body(new ParseArrayPipe({ items: UpdateGroupMemberExpenseDto }))
    updateGroupMemberExpenseDtos: UpdateGroupMemberExpenseDto[],
  ) {
    const groupAndExpenseErr = await this.checkIfGroupExpenseAndSubExpenseExist(
      groupId,
      expenseId,
      subExpenseId,
    );
    if (groupAndExpenseErr !== null) throw groupAndExpenseErr;

    for (const groupMember of updateGroupMemberExpenseDtos) {
      if (!(await this.groupMemberService.exists(groupMember.groupMemberId)))
        throw new HttpException('GroupMember not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.groupMemberExpensesService.update(
      updateGroupMemberExpenseDtos.map(group => ({
        ...group,
        amount: Big(group.amount)
      })),
      subExpenseId,
      groupId,
    );

    return this.groupMemberExpenseMapper.dtosFromEntities(result);
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
