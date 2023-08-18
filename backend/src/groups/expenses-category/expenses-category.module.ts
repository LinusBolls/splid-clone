import { Module } from '@nestjs/common';
import { ExpensesCategoryService } from './expenses-category.service';
import { ExpensesCategoryController } from './expenses-category.controller';

@Module({
  controllers: [ExpensesCategoryController],
  providers: [ExpensesCategoryService],
  exports: [ExpensesCategoryService],
})
export class ExpensesCategoryModule {}
