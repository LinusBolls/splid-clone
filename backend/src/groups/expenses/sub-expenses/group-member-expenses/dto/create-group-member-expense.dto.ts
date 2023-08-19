import { Big } from 'big.js';
import { IsNotEmpty } from 'class-validator';

export class CreateGroupMemberExpenseDto {
  @IsNotEmpty()
  groupMemberId: string;

  @IsNotEmpty()
  role: keyof typeof GROUP_MEMBER_EXPENSE_ROLE;

  @IsNotEmpty()
  amount: Big;

  @IsNotEmpty()
  currency: string;
}

export const GROUP_MEMBER_EXPENSE_ROLE = {
  SPONSOR: 'SPONSOR',
  GAINER: 'GAINER',
} as const;
