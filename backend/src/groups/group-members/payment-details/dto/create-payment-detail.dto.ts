import {IsNotEmpty, IsOptional} from 'class-validator';

export class CreatePaymentDetailDto {
  @IsOptional()
  name: string;
  @IsNotEmpty()
  type: keyof typeof Type;
  @IsNotEmpty()
  detail: PayPalPaymentDetailDto | IbanPaymentDetailDto
}

interface PayPalPaymentDetailDto {
  userName: string
}

interface IbanPaymentDetailDto {
  iban: string
  bic?: string
}