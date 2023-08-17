import { Expose } from 'class-transformer';

export class Currency {
  @Expose() symbol: string;
  @Expose() name: string;
  createdAt?: Date;
  @Expose() date: Date;
}
