import { Module } from '@nestjs/common';
import { GroupMemberExpensesService } from './group-member-expenses.service';
import { GroupMemberExpensesController } from './group-member-expenses.controller';

@Module({
  controllers: [GroupMemberExpensesController],
  providers: [GroupMemberExpensesService],
})
export class GroupMemberExpensesModule {}
