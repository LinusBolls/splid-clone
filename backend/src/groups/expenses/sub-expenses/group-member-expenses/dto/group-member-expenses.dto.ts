import Big from 'big.js';
import { GroupMemberDto } from '../../../../group-members/dto/group-member.dto';
import { Expose } from 'class-transformer';

export class GroupMemberExpenseDto {
  @Expose() id: string;

  @Expose() amountReferenceCurrency: Big;
  @Expose() currency: string;
  @Expose() amount: Big;
  @Expose() role: keyof typeof GROUP_MEMBER_EXPENSE_ROLE;
  @Expose() date: Date;

  @Expose() groupMember: GroupMemberDto;
}

export const GROUP_MEMBER_EXPENSE_ROLE = {
  SPONSOR: 'SPONSOR',
  GAINER: 'GAINER',
} as const;
