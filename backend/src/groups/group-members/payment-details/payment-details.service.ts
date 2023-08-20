import { Injectable } from '@nestjs/common';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PaymentDetailsService {
  create(createPaymentDetailDto: CreatePaymentDetailDto, memberId: string) {
    return prisma.groupMemberPaymentDetail.create({
      data: {
        ...createPaymentDetailDto,
        detail: JSON.stringify(createPaymentDetailDto.detail),
        groupMemberId: memberId,
      },
    });
  }

  findAll(memberId: string) {
    return prisma.groupMemberPaymentDetail.findMany({
      where: {
        groupMemberId: memberId,
      },
    });
  }

  findOne(id: string) {
    return prisma.groupMemberPaymentDetail.findFirst({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    return (
      (await prisma.groupMemberPaymentDetail.findFirst({
        where: {
          id,
        },
      })) !== null
    );
  }

  remove(id: string) {
    return prisma.groupMemberPaymentDetail.delete({
      where: {
        id,
      },
    });
  }

  removeByMemberId(groupMemberId: string) {
    return prisma.groupMemberPaymentDetail.deleteMany({
      where: {
        groupMemberId,
      },
    });
  }
}
