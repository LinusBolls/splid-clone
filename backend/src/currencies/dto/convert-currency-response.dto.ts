import { Decimal } from '@prisma/client/runtime/library';

export class ConvertCurrencyResponseDto {
  from: string;
  to: string;
  amount: number;
  date: String;
  quoteAmount: Decimal;
}
