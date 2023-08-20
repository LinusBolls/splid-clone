import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Param,
  Delete,
  Query,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { GroupsService } from '../groups.service';
import { GroupMembersService } from '../group-members/group-members.service';

@Controller('/groups/:groupId/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly groupsService: GroupsService,
    private readonly groupMembersService: GroupMembersService,
  ) {}

  @Post()
  async create(
    @Param('groupId') groupId: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    if (!(await this.groupsService.exists(groupId)))
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);

    if (!(await this.groupMembersService.exists(createPaymentDto.senderId))) 
      throw new HttpException('GroupMember not found', HttpStatus.NOT_FOUND);

    if (!(await this.groupMembersService.exists(createPaymentDto.receiverId))) 
      throw new HttpException('GroupMember not found', HttpStatus.NOT_FOUND);

    if (createPaymentDto.senderId === createPaymentDto.receiverId )
      throw new HttpException("Sender and Reiceiver cannot be the same", HttpStatus.BAD_REQUEST)
    
    return this.paymentService.create(createPaymentDto, groupId);
  }

  @Get()
  async findAll(
    @Param('groupId') groupId: string,
    @Query('senderId') senderId: string,
    @Query('receiverId') receiverId: string,
  ) {
    if (!(await this.groupsService.exists(groupId))) 
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);

    if (!(await this.groupMembersService.exists(senderId))) 
      throw new HttpException('GroupMember not found', HttpStatus.NOT_FOUND);

    if (!(await this.groupMembersService.exists(receiverId))) 
      throw new HttpException('GroupMember not found', HttpStatus.NOT_FOUND);

    if (senderId != null)
      return this.paymentService.findAllFromSender(groupId, senderId)
    if (receiverId != null) 
      return this.paymentService.findAllFromReceiver(groupId, receiverId)

    return this.paymentService.findAll(groupId);
  }

  @Get(':id')
  async findOne(@Param('groupId') groupId: string, @Param('id') id: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const findResult = await this.paymentService.findOne(id, groupId);

    if (findResult === null)
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);

    return findResult;
  }

  @Put(':id')
  async update(
    @Param('groupId') groupId: string,
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    if (!(await this.groupsService.exists(groupId))) 
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    
    if (!(await this.groupMembersService.exists(updatePaymentDto.senderId))) 
      throw new HttpException('GroupMember not found', HttpStatus.NOT_FOUND);

    if (!(await this.groupMembersService.exists(updatePaymentDto.receiverId))) 
      throw new HttpException('GroupMember not found', HttpStatus.NOT_FOUND);

    if (!(await this.paymentService.exists(id, groupId))) 
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    

    if (updatePaymentDto.senderId === updatePaymentDto.receiverId && (updatePaymentDto.senderId != null && updatePaymentDto != null))
      throw new HttpException("Sender and Reiceiver cannot be the same", HttpStatus.BAD_REQUEST)




    return this.paymentService.update(id, updatePaymentDto, groupId);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('groupId') groupId: string, @Param('id') id: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.paymentService.exists(id, groupId))) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    return this.paymentService.remove(id, groupId);
  }
}
