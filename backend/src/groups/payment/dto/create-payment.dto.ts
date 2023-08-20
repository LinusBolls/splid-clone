import { IsNotEmpty } from "class-validator";
import Big from "big.js";

export class CreatePaymentDto {
  @IsNotEmpty()
  amount: Big;

  @IsNotEmpty()
  currency: string;

}
