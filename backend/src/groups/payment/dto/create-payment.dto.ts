import {IsDate, IsNotEmpty} from 'class-validator';
import Big from 'big.js';
import {Type} from "class-transformer";

export class CreatePaymentDto {
  @IsNotEmpty()
  amount: Big;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  receiverId: string;

  @Type(() => Date)
  @IsDate()
  date: Date;
}
