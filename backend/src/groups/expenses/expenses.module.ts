import { Module, forwardRef } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { SubExpensesModule } from './sub-expenses/sub-expenses.module';
import { ExpensesAssetModule } from './expenses-asset/expenses-asset.module';
import { ExpensesCategoryModule } from '../expenses-category/expenses-category.module';
import { GroupsModule } from '../groups.module';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  imports: [SubExpensesModule, ExpensesAssetModule, ExpensesCategoryModule, forwardRef(()=> GroupsModule)],
  exports: [ExpensesService],
})
export class ExpensesModule {}
