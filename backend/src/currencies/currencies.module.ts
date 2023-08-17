import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { CurrencyMapper } from './mapping/currency.mapper';
import { CurrencyRateMapper } from './mapping/currency-rate.mapper';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, CurrencyMapper, CurrencyRateMapper],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
