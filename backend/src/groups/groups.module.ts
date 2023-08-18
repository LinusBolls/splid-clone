import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { ExpensesModule } from './expenses/expenses.module';
import { GroupMembersModule } from './group-members/group-members.module';
import { CurrenciesModule } from '../currencies/currencies.module';
import { ExpensesCategoryModule } from './expenses-category/expenses-category.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    CurrenciesModule,
    ExpensesModule,
    ExpensesCategoryModule,
    GroupMembersModule,
  ],
  exports: [GroupsService],
})
export class GroupsModule {}
