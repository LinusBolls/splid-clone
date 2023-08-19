import { Big } from "big.js";
import { IsNotEmpty } from "class-validator";

export class CreateGroupMemberExpenseDto {
  @IsNotEmpty()
  groupMemberId: string;
  
  @IsNotEmpty()
  role: keyof typeof ROLE;


  @IsNotEmpty()
  amount: Big

}

const ROLE = {
  SPONSOR: "SPONSOR",
  GAINER: "GAINER",
}
