import { Module } from '@nestjs/common';
import { GroupService } from './groups.service';
import { GroupController } from './groups.controller';
import { ExpensesModule } from './expenses/expenses.module';
import { GroupMembersModule } from './group-members/group-members.module';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [ExpensesModule, GroupMembersModule],
})
export class GroupModule {}
