import { IsNotEmpty } from 'class-validator';
import { Big } from 'big.js';
import { Type } from 'class-transformer';

export class UpdateGroupMemberExpenseDto {
  @IsNotEmpty()
  groupMemberId: string;

  @IsNotEmpty()
  role: keyof typeof GROUP_MEMBER_EXPENSE_ROLE;

  @IsNotEmpty()
  amount: Big;

  @IsNotEmpty()
  currency: string;

  @Type(() => Date)
  @IsNotEmpty()
  date: Date;
}

export const GROUP_MEMBER_EXPENSE_ROLE = {
  SPONSOR: 'SPONSOR',
  GAINER: 'GAINER',
} as const;
