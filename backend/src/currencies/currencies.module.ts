import {Module} from '@nestjs/common';
import {CurrenciesService} from './currencies.service';
import {CurrenciesController} from './currencies.controller';
import {CurrencyMapper} from "./mapping/currency.mapper";

@Module({
    controllers: [CurrenciesController],
    providers: [CurrenciesService, CurrencyMapper],
})
export class CurrenciesModule {
}