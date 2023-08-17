import {Controller, Get, Param} from '@nestjs/common';
import {CurrenciesService} from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
    constructor(private readonly currenciesService: CurrenciesService) {
    }

    @Get()
    findAll() {
        return this.currenciesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.currenciesService.findOne(+id);
    }
}
