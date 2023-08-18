import { Injectable } from '@nestjs/common';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';

@Injectable()
export class PaymentDetailsService {
  create(createPaymentDetailDto: CreatePaymentDetailDto) {
    return 'This action adds a new paymentDetail';
  }

  findAll() {
    return `This action returns all paymentDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentDetail`;
  }
}
