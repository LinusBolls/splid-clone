import { Mapper, Mappings } from 'ts-mapstruct';
import { Injectable } from '@nestjs/common';
import { PaymentDetail } from '../entities/payment-detail.entity';
import { GroupMemberPaymentDetail } from '@prisma/client';

@Injectable()
@Mapper()
export class PaymentDetailMapper {
  @Mappings({
    target: 'detail',
    expression: 'JSON.parse(paymentDetail.detail)',
  })
  entityFromDb(paymentDetail: GroupMemberPaymentDetail): PaymentDetail {
    return new PaymentDetail();
  }

  entitiesFromDb(paymentDetails: GroupMemberPaymentDetail[]): PaymentDetail[] {
    return paymentDetails.map((paymentDetail) =>
      this.entityFromDb(paymentDetail),
    );
  }
}
