import { Expose } from 'class-transformer';

export class CurrencyRate {
  @Expose() date: Date;
  @Expose() symbol: string;
  @Expose() createdAt?: Date;
  @Expose() rateEurBase: number;
}
