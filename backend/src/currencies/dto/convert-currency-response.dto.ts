import Big from "big.js";

export class ConvertCurrencyResponseDto {
  from: string;
  to: string;
  amount: Big;
  date: String;
  quoteAmount: Big;
}
