import { Module, forwardRef } from '@nestjs/common';
import { SubExpensesService } from './sub-expenses.service';
import { SubExpensesController } from './sub-expenses.controller';
import { GroupMemberExpensesModule } from './group-member-expenses/group-member-expenses.module';
import { GroupsModule } from 'src/groups/groups.module';
import { ExpensesModule } from '../expenses.module';

@Module({
  controllers: [SubExpensesController],
  providers: [SubExpensesService],
  imports: [
    forwardRef(() => GroupsModule),
    forwardRef(() => ExpensesModule),
    GroupMemberExpensesModule,
  ],
  exports: [SubExpensesService],
})
export class SubExpensesModule {}
