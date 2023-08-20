import { Module, forwardRef } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategoriesController } from './expense-categories.controller';
import { GroupsModule } from '../groups.module';

@Module({
  controllers: [ExpenseCategoriesController],
  providers: [ExpenseCategoriesService],
  imports: [forwardRef(() => GroupsModule)],
  exports: [ExpenseCategoriesService],
})
export class ExpenseCategoriesModule {}
