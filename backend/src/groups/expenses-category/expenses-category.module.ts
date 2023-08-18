import { Module, forwardRef } from '@nestjs/common';
import { ExpensesCategoryService } from './expenses-category.service';
import { ExpensesCategoryController } from './expenses-category.controller';
import { GroupsModule } from '../groups.module';

@Module({
  controllers: [ExpensesCategoryController],
  providers: [ExpensesCategoryService],
  imports: [forwardRef(() => GroupsModule)],
  exports: [ExpensesCategoryService],
})
export class ExpensesCategoryModule {}
