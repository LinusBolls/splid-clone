import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { PaymentDetailsService } from './payment-details.service';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';
import { GroupMembersService } from '../group-members.service';
import { GroupsService } from '../../groups.service';
import { PaymentDetailMapper } from './mapping/payment-detail.mapper';

@Controller('/groups/:groupId/group-members/:memberId/payment-details')
export class PaymentDetailsController {
  constructor(
    private readonly paymentDetailsService: PaymentDetailsService,
    private groupMembersService: GroupMembersService,
    private groupsService: GroupsService,
    private paymentDetailMapper: PaymentDetailMapper,
  ) {}

  @Post()
  async create(
    @Body() createPaymentDetailDto: CreatePaymentDetailDto,
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.groupMembersService.exists(memberId))) {
      throw new HttpException('Group member not found', HttpStatus.NOT_FOUND);
    }

    const insertionResult = await this.paymentDetailsService.create(
      createPaymentDetailDto,
      memberId,
    );

    return this.paymentDetailMapper.entityFromDb(insertionResult);
  }

  @Get()
  async findAll(
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.paymentDetailsService.findAll(memberId);

    return this.paymentDetailMapper.entitiesFromDb(result);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.groupMembersService.exists(memberId))) {
      throw new HttpException('Group member not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.paymentDetailsService.findOne(id);

    if (result === null) {
      throw new HttpException('Payment detail not found', HttpStatus.NOT_FOUND);
    }

    return this.paymentDetailMapper.entityFromDb(result);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.groupMembersService.exists(memberId))) {
      throw new HttpException('Group member not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.paymentDetailsService.exists(id))) {
      throw new HttpException('Payment detail not found', HttpStatus.NOT_FOUND);
    }

    return this.paymentDetailsService.remove(id);
  }
}
