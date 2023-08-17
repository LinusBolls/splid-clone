import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupMemberExpensesService } from './group-member-expenses.service';
import { CreateGroupMemberExpenseDto } from './dto/create-group-member-expense.dto';
import { UpdateGroupMemberExpenseDto } from './dto/update-group-member-expense.dto';

@Controller(
  '/groups/:groupid/expenses/:expenseid/sub-expense/:subexpenseid/group-member-expenses',
)
export class GroupMemberExpensesController {
  constructor(
    private readonly groupMemberExpensesService: GroupMemberExpensesService,
  ) {}

  @Post()
  create(@Body() createGroupMemberExpenseDto: CreateGroupMemberExpenseDto) {
    return this.groupMemberExpensesService.create(createGroupMemberExpenseDto);
  }

  @Get()
  findAll() {
    return this.groupMemberExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupMemberExpensesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupMemberExpenseDto: UpdateGroupMemberExpenseDto,
  ) {
    return this.groupMemberExpensesService.update(
      +id,
      updateGroupMemberExpenseDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMemberExpensesService.remove(+id);
  }
}
