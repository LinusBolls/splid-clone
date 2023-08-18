import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {PaymentDetailsService} from './payment-details.service';
import {CreatePaymentDetailDto} from './dto/create-payment-detail.dto';

@Controller('/groups/:groupId/group-members/:memberId/payment-details')
export class PaymentDetailsController {
  constructor(private readonly paymentDetailsService: PaymentDetailsService) {}

  @Post()
  create(@Body() createPaymentDetailDto: CreatePaymentDetailDto) {
    return this.paymentDetailsService.create(createPaymentDetailDto);
  }

  @Get()
  findAll() {
    return this.paymentDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentDetailsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentDetailsService.remove(+id);
  }
}