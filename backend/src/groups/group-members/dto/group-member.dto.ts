import {PaymentDetail} from "../payment-details/entities/payment-detail.entity";

export class GroupMemberDto {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  status: string
  paymentDetails: PaymentDetail[]
}
