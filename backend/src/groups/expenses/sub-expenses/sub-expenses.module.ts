import { Module } from '@nestjs/common';
import { SubExpensesService } from './sub-expenses.service';
import { SubExpensesController } from './sub-expenses.controller';
import { GroupMemberExpensesModule } from './group-member-expenses/group-member-expenses.module';

@Module({
  controllers: [SubExpensesController],
  providers: [SubExpensesService],
  imports: [GroupMemberExpensesModule],
})
export class SubExpensesModule {}
