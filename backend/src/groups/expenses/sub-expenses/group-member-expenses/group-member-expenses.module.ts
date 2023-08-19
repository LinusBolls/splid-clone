import { Module, forwardRef } from '@nestjs/common';
import { GroupMemberExpensesService } from './group-member-expenses.service';
import { GroupMemberExpensesController } from './group-member-expenses.controller';
import { SubExpensesModule } from '../sub-expenses.module';
import { ExpensesModule } from '../../expenses.module';
import { GroupsModule } from 'src/groups/groups.module';
import { GroupMembersModule } from 'src/groups/group-members/group-members.module';

@Module({
  controllers: [GroupMemberExpensesController],
  providers: [GroupMemberExpensesService],
  imports: [
    forwardRef(() => GroupsModule),
    forwardRef(() => ExpensesModule),
    forwardRef(() => SubExpensesModule),
    forwardRef(() => GroupMembersModule),
  ],
  exports: [GroupMemberExpensesService]
})
export class GroupMemberExpensesModule {}
