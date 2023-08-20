import { IsNotEmpty } from "class-validator";

export class CreatePaymentDto {
  @IsNotEmpty()
  amount: Big;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  currency: string;

}
