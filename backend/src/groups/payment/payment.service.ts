import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaClient } from '@prisma/client';
import Big from 'big.js';
const prisma = new PrismaClient();

@Injectable()
export class PaymentService {
  create(createPaymentDto: CreatePaymentDto, groupId: string) {
    return prisma.payment.create({
      data: {
        ...createPaymentDto,
        amount: createPaymentDto.amount.toString(),
        amountReferenceCurrency: new Big(23).toString(),
        groupId
      }
    });
  }

  findAll(groupId: string, senderId?: string, receiverId?: string) {
    return prisma.payment.findMany({
      where: {
        OR: [
          {
            groupId
          },
          {
            groupId,
            senderId
          },
          {
            groupId,
            receiverId
          },
        ]
      }
    });
  }

  findOne(id: string, groupId: string) {
    return prisma.payment.findMany({
      where: {
        id,
        groupId,
      }
    });
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto, groupId: string) {
    return prisma.payment.update({
      where: {
        id,
        groupId
      },
      data: {
        ...updatePaymentDto,
        amount: updatePaymentDto.amount.toString(),
        //TODO: Change the 23
        amountReferenceCurrency: new Big(23).toString(),
      }
    });
  }

  remove(id: string, groupId: string) {
    return prisma.payment.delete({
      where: {
        id,
        groupId
      }
    });
  }
}
