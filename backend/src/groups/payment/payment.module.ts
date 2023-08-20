import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { GroupsModule } from '../groups.module';
import { GroupMembersModule } from '../group-members/group-members.module';
import {CurrenciesModule} from "../../currencies/currencies.module";
import {PaymentMapper} from "./mapping/payment.mapper";

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PaymentMapper],
  imports: [
    forwardRef(() => GroupsModule),
    forwardRef(() => GroupMembersModule),
      CurrenciesModule
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
