import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaClient } from '@prisma/client';
import Big from 'big.js';
import {PaymentMapper} from "./mapping/payment-mapper.service";
const prisma = new PrismaClient();

@Injectable()
export class PaymentService {
  constructor(private readonly paymentMapper: PaymentMapper) {
  }

  async create(createPaymentDto: CreatePaymentDto, groupId: string) {
    const result = await prisma.payment.create({
      data: {
        ...createPaymentDto,
        amount: createPaymentDto.amount.toString(),
        //TODO: Change the 23
        amountReferenceCurrency: new Big(23).toString(),
        groupId,
      },
      include: {
        sender: true,
        receiver: true,
        group: true
      }
    });

    return this.paymentMapper.categoryEnhancedEntityFromDb(result);
  }

  async findAllFromReceiver(groupId: string, receiverId: string) {
    const result = await prisma.payment.findMany({
      where: {
        groupId,
        receiverId,
      },
      include: {
        sender: true,
        receiver: true,
        group: true
      }
    });

    return this.paymentMapper.categoryEnhancedEntitiesFromDb(result);
  }

  async findAllFromSender(groupId: string, senderId: string) {
    const result = await prisma.payment.findMany({
      where: {
        groupId,
        senderId,
      },
      include: {
        sender: true,
        receiver: true,
        group: true
      }
    });

    return this.paymentMapper.categoryEnhancedEntitiesFromDb(result);
  }

  async findAll(groupId: string) {
    const result = await prisma.payment.findMany({
      where: {
        groupId,
      },
      include: {
        sender: true,
        receiver: true,
        group: true
      }
    });

    return this.paymentMapper.categoryEnhancedEntitiesFromDb(result);
  }

  async findOne(id: string, groupId: string) {
    const result = await prisma.payment.findFirst({
      where: {
        id,
        groupId,
      },
      include: {
        sender: true,
        receiver: true,
        group: true
      }
    });

    return this.paymentMapper.categoryEnhancedEntityFromDb(result);
  }

  async groupMemberHasPayment(groupMemberId: string) {
    return (
      (await prisma.payment.findFirst({
        where: {
          OR: [
            {
              senderId: groupMemberId,
            },
            {
              receiverId: groupMemberId,
            },
          ],
        },
      })) !== null
    );
  }

  async exists(id: string, groupId: string) {
    return (
      (await prisma.payment.findFirst({
        where: {
          id,
          groupId,
        },
      })) !== null
    );
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto, groupId: string) {
    const result = await prisma.payment.update({
      where: {
        id,
        groupId,
      },
      data: {
        ...updatePaymentDto,
        amount: updatePaymentDto.amount.toString(),
        //TODO: Change the 23
        amountReferenceCurrency: new Big(23).toString(),
      },
      include: {
        sender: true,
        receiver: true,
        group: true
      }
    });

    return this.paymentMapper.categoryEnhancedEntityFromDb(result);
  }

  remove(id: string, groupId: string) {
    return prisma.payment.delete({
      where: {
        id,
        groupId,
      },
    });
  }

  removeAllByGroupId(groupId: string) {
    return prisma.payment.deleteMany({
      where: {
        groupId,
      },
    });
  }
}
