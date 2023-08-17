import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { ExpensesModule } from './expenses/expenses.module';
import { GroupMembersModule } from './group-members/group-members.module';
import { ExpensesCategoryModule } from './expenses/expenses-category/expenses-category.module';
import { CurrenciesModule } from '../currencies/currencies.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    CurrenciesModule,
    ExpensesModule,
    ExpensesCategoryModule,
    GroupMembersModule,
  ],
})
export class GroupsModule {}
