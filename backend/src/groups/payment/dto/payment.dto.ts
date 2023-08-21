import Big from 'big.js';
import { GroupMemberEntity } from '../../group-members/entities/group-member.entity';
import { Group } from '@prisma/client';
import { Expose } from 'class-transformer';

export class PaymentDto {
  @Expose() id: string;

  @Expose() amountReferenceCurrency: Big;
  @Expose() currency: string;
  @Expose() amount: Big;
  @Expose() date: Date;

  @Expose() sender: GroupMemberEntity;
  @Expose() receiver: GroupMemberEntity;
  @Expose() group: Group; //TODO entity
}
