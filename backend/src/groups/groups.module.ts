import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { ExpensesModule } from './expenses/expenses.module';
import { GroupMembersModule } from './group-members/group-members.module';
import { CurrenciesModule } from '../currencies/currencies.module';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    CurrenciesModule,
    ExpensesModule,
    ExpenseCategoriesModule,
    GroupMembersModule,
  ],
  exports: [GroupsService],
})
export class GroupsModule {}
