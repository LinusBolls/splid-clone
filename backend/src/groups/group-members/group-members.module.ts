import { forwardRef, Module } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { GroupMembersController } from './group-members.controller';
import { PaymentDetailsModule } from './payment-details/payment-details.module';
import { GroupsModule } from '../groups.module';

@Module({
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
  imports: [PaymentDetailsModule, forwardRef(() => GroupsModule)],
  exports: [GroupMembersService]
})
export class GroupMembersModule {}
