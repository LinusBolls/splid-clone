import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { ExpensesModule } from './expenses/expenses.module';
import { GroupMembersModule } from './group-members/group-members.module';
import { CurrenciesModule } from '../currencies/currencies.module';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    CurrenciesModule,
    ExpensesModule,
    ExpenseCategoriesModule,
    GroupMembersModule,
    PaymentModule,
  ],
  exports: [GroupsService],
})
export class GroupsModule {}
