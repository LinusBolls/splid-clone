import { Module, forwardRef } from '@nestjs/common';
import { GroupMemberExpensesService } from './group-member-expenses.service';
import { GroupMemberExpensesController } from './group-member-expenses.controller';
import { SubExpensesModule } from '../sub-expenses.module';
import { ExpensesModule } from '../../expenses.module';
import { GroupsModule } from 'src/groups/groups.module';
import { GroupMembersModule } from 'src/groups/group-members/group-members.module';
import {CurrenciesModule} from "../../../../currencies/currencies.module";
import {GroupMemberExpenseMapper} from "./mapping/group-member-expense.mapper";

@Module({
  controllers: [GroupMemberExpensesController],
  providers: [GroupMemberExpensesService, GroupMemberExpenseMapper],
  imports: [
    forwardRef(() => ExpensesModule),
    forwardRef(() => GroupsModule),
    forwardRef(() => SubExpensesModule),
    forwardRef(() => GroupMembersModule),
    CurrenciesModule
  ],
  exports: [GroupMemberExpensesService],
})
export class GroupMemberExpensesModule {}
