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
        //TODO: Change the 23
        amountReferenceCurrency: new Big(23).toString(),
        groupId,
      },
    });
  }

  findAllFromReceiver(groupId: string, receiverId: string) {
    return prisma.payment.findMany({
      where: {
        groupId,
        receiverId,
      },
    });
  }

  findAllFromSender(groupId: string, senderId: string) {
    return prisma.payment.findMany({
      where: {
        groupId,
        senderId,
      },
    });
  }

  findAll(groupId: string) {
    return prisma.payment.findMany({
      where: {
        groupId,
      },
    });
  }

  findOne(id: string, groupId: string) {
    return prisma.payment.findFirst({
      where: {
        id,
        groupId,
      },
    });
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

  update(id: string, updatePaymentDto: UpdatePaymentDto, groupId: string) {
    return prisma.payment.update({
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
    });
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
