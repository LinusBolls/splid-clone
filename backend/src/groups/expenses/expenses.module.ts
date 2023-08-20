import { Module, forwardRef } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { SubExpensesModule } from './sub-expenses/sub-expenses.module';
import { ExpensesAssetModule } from './expenses-asset/expenses-asset.module';
import { ExpenseCategoriesModule } from '../expense-categories/expense-categories.module';
import { GroupsModule } from '../groups.module';
import { ExpenseMapper } from './mapping/expense.mapper';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpenseMapper],
  imports: [
    SubExpensesModule,
    ExpensesAssetModule,
    ExpenseCategoriesModule,
    forwardRef(() => GroupsModule),
  ],
  exports: [ExpensesService],
})
export class ExpensesModule {}
