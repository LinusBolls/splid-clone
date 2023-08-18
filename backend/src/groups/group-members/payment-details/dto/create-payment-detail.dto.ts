import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDetailDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  content: object;
}
