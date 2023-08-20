import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { GroupsModule } from '../groups.module';
import { GroupMembersModule } from '../group-members/group-members.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [forwardRef(()=> GroupsModule), forwardRef(()=> GroupMembersModule)]
})
export class PaymentModule {}
