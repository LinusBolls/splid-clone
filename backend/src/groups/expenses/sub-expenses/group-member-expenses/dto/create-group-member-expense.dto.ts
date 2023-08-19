import { Big } from 'big.js';
import { IsNotEmpty } from 'class-validator';

export class CreateGroupMemberExpenseDto {
  @IsNotEmpty()
  groupMemberId: string;

  @IsNotEmpty()
  role: typeof ROLE;

  @IsNotEmpty()
  amount: Big;

  @IsNotEmpty()
  currency: string;
}

const ROLE = {
  SPONSOR: 'SPONSOR',
  GAINER: 'GAINER',
};
