import { forwardRef, Module } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { GroupMembersController } from './group-members.controller';
import { PaymentDetailsModule } from './payment-details/payment-details.module';
import { GroupsModule } from '../groups.module';
import { GroupMemberExpensesModule } from '../expenses/sub-expenses/group-member-expenses/group-member-expenses.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
  imports: [forwardRef(() => GroupMemberExpensesModule), PaymentDetailsModule, forwardRef(() => GroupsModule), PaymentModule],
  exports: [GroupMembersService],
})
export class GroupMembersModule {}
