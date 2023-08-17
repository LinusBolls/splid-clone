import { Expose } from 'class-transformer';

export class CurrencyDto {
  @Expose() symbol: string;
  @Expose() name: string;
}
