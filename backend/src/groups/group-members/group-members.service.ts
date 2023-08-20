import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { GroupMember, PrismaClient } from '@prisma/client';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';
import { PaymentDetailsService } from './payment-details/payment-details.service';
import { GroupMemberEntity } from './entities/group-member.entity';
import { PaymentDetailMapper } from './payment-details/mapping/payment-detail.mapper';
import { GroupMemberExpensesService } from '../expenses/sub-expenses/group-member-expenses/group-member-expenses.service';
import { PaymentService } from '../payment/payment.service';
import Big from "big.js";

const prisma = new PrismaClient();

@Injectable()
export class GroupMembersService {
  constructor(
    private readonly paymentDetailsService: PaymentDetailsService,
    private readonly paymentDetailMapper: PaymentDetailMapper,
    @Inject(forwardRef(() => GroupMemberExpensesService))
    private readonly groupMemberExpensesService: GroupMemberExpensesService,
    private readonly paymentService: PaymentService,
  ) {}

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
        id,
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
        id,
      },
      data: {
        ...updateGroupMemberDto,
      },
    });

    return this.includePaymentDetail(result);
  }

  async remove(id: string) {
    //TODO prisma transaction
    await this.paymentDetailsService.removeByMemberId(id);

    return prisma.groupMember.delete({
      where: {
        id,
      },
    });
  }

  async removeAllByGroupId(groupId: string) {
    //TODO prisma transaction
    for (const member of await this.findAll(groupId)) {
      await this.paymentDetailsService.removeByMemberId(member.id);
    }

    return prisma.groupMember.deleteMany({
      where: {
        groupId,
      },
    });
  }

  private async includePaymentDetail(
    member: GroupMember,
  ): Promise<GroupMemberEntity> {
    return {
      ...member,
      paymentDetails: this.paymentDetailMapper.entitiesFromDb(
        await this.paymentDetailsService.findAll(member.id),
      ),
    };
  }

  private async includePaymentDetails(
    members: GroupMember[],
  ): Promise<GroupMemberEntity[]> {
    const list: GroupMemberEntity[] = [];

    for (const member of members) {
      const completedMember = await this.includePaymentDetail(member);
      list.push(completedMember);
    }

    return list;
  }

  private async includeAmount(){

  }

  private async includeAmountBulk(){

  }

  private async calculateGroupMemberBalance(groupMemberId: string) {
    const allExpenses = await this.groupMemberExpensesService.findAllExpensesByGroupMemberId(groupMemberId);

    const allPayments = await this.paymentService.findAllPaymentsByGroupMemberId(groupMemberId);

    let amount: Big;

    for (const expense of allExpenses) {
      if (expense.role === "SPONSOR"){
        amount = expense.amount.add(amount || 0)
      } else if (expense.role === "GAINER") {
        amount = expense.amount.sub(amount || 0)
      }
    }
    //for (const payment of allPayments){
    //  if (payment.senderId === groupMemberId) {
    //    amount = payment.amount.add(amount || 0)
    //  } else if (payment.receiverId === groupMemberId) {
    //    amoun = payment.amount.sub(amount || 0)
    //  }
    //}
    


  }
}
