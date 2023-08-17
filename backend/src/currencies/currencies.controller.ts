import {Controller, Get, HttpException, HttpStatus, Param} from '@nestjs/common';
import {CurrenciesService} from './currencies.service';
import {CurrencyMapper} from "./mapping/currency.mapper";

@Controller('currencies')
export class CurrenciesController {
    constructor(private readonly currenciesService: CurrenciesService, private currencyMapper: CurrencyMapper) {
    }

    @Get()
    async findAll() {
        const currencies = await this.currenciesService.findAll();

        return this.currencyMapper.dtosFromEntities(currencies);
    }

    @Get(':symbol')
    async findOne(@Param('symbol') symbol: string) {
        const currency = await this.currenciesService.findOne(symbol);

        return this.currencyMapper.dtoFromEntity(currency);
    }
}
