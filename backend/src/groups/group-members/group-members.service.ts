import { Injectable } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import {GroupMember, PrismaClient} from '@prisma/client';
import {UpdateGroupMemberDto} from "./dto/update-group-member.dto";
import {PaymentDetailsService} from "./payment-details/payment-details.service";
import {GroupMemberEntity} from "./entities/group-member.entity";
import {PaymentDetailMapper} from "./payment-details/mapping/payment-detail.mapper";

const prisma = new PrismaClient();

@Injectable()
export class GroupMembersService {
  constructor(private paymentDetailsService: PaymentDetailsService, private paymentDetailMapper: PaymentDetailMapper) {
  }

  async create(createGroupMemberDto: CreateGroupMemberDto, groupId: string) {
    const result = await prisma.groupMember.create({
      data: {
        ...createGroupMemberDto,
        groupId,
      },
    });

    return this.includePaymentDetail(result);
  }

  async findAll(groupId: string) {
    const result = await prisma.groupMember.findMany({
      where: {
        groupId,
      },
    });

    return this.includePaymentDetails(result);
  }

  async findOne(id: string) {
    const result = await prisma.groupMember.findFirst({
      where: {
        id
      },
    });

    return this.includePaymentDetail(result);
  }

  async exists(id: string) {
    return (
        (await prisma.groupMember.findFirst({
          where: {
            id,
          },
        })) !== null
    );
  }

  async update(updateGroupMemberDto: UpdateGroupMemberDto, id: string) {
    const result = await prisma.groupMember.update({
      where: {
        id
      },
      data: {
        ...updateGroupMemberDto,
      },
    });

    return this.includePaymentDetail(result);
  }

  async remove(id: string) {
    await this.paymentDetailsService.removeByMemberId(id)

    return prisma.groupMember.delete({
      where: {
        id
      },
    });
  }

  private async includePaymentDetail(member: GroupMember): Promise<GroupMemberEntity> {
    return {
      ...member,
      paymentDetails: this.paymentDetailMapper.entitiesFromDb(await this.paymentDetailsService.findAll(member.id))
    }
  }

  private async includePaymentDetails(members: GroupMember[]): Promise<GroupMemberEntity[]> {
    const list: GroupMemberEntity[] = []

    for (const member of members) {
      const completedMember = await this.includePaymentDetail(member)
      list.push(completedMember)
    }

    return list
  }
}