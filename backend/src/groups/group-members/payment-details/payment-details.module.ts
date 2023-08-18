import {forwardRef, Module} from '@nestjs/common';
import {PaymentDetailsService} from './payment-details.service';
import {PaymentDetailsController} from './payment-details.controller';
import {GroupMembersModule} from "../group-members.module";
import {GroupsModule} from "../../groups.module";
import {PaymentDetailMapper} from "./mapping/payment-detail.mapper";

@Module({
  controllers: [PaymentDetailsController],
  providers: [PaymentDetailsService, PaymentDetailMapper],
  imports: [forwardRef(() => GroupMembersModule), forwardRef(() => GroupsModule)],
  exports: [PaymentDetailsService, PaymentDetailMapper]
})
export class PaymentDetailsModule {}