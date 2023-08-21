import { Expose } from 'class-transformer';
import { PaymentDetail } from '../payment-details/entities/payment-detail.entity';
import Big from "big.js";

export class GroupMemberEntity {
  @Expose() id: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
  
  @Expose() name: string;
  @Expose() status: string;
  @Expose() balance: Big;

  @Expose() groupId: string
  @Expose() paymentDetails: PaymentDetail[];
}
