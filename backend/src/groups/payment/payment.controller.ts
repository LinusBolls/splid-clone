import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('/groups/groupId/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Param("groupId") groupId: string, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto, groupId);
  }

  @Get()
  findAll(@Param("groupId") groupId: string) {
    return this.paymentService.findAll(groupId);
  }

  @Get(':id')
  findOne(@Param("groupId") groupId: string, @Param('id') id: string) {
    return this.paymentService.findOne(id, groupId);
  }

  @Patch(':id')
  update(@Param("groupId") groupId: string, @Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto, groupId);
  }

  @Delete(':id')
  remove(@Param("groupId") groupId: string, @Param('id') id: string) {
    return this.paymentService.remove(id, groupId);
  }
}
