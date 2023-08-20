import { IsNotEmpty } from "class-validator";
import Big from "big.js";

export class CreatePaymentDto {
  @IsNotEmpty()
  amount: Big;

  @IsNotEmpty()
  currency: string;

<<<<<<< Updated upstream
=======
  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  receiverId: string;
>>>>>>> Stashed changes
}
