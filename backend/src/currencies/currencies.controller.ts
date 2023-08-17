import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrencyMapper } from './mapping/currency.mapper';
import { ConvertCurrencyRequestDto } from './dto/convert-currency-request.dto';
import { ConvertCurrencyResponseDto } from './dto/convert-currency-response.dto';
import * as dayjs from 'dayjs';

@Controller('currencies')
export class CurrenciesController {
  constructor(
    private readonly currenciesService: CurrenciesService,
    private currencyMapper: CurrencyMapper,
  ) {}

  @Get()
  async findAll() {
    const currencies = await this.currenciesService.findAllCurrencies(
      new Date(),
    );

    return this.currencyMapper.dtosFromEntities(currencies);
  }

  @Get(':symbol')
  async findOne(@Param('symbol') symbol: string) {
    const currency = await this.currenciesService.findOneCurrency(
      symbol,
      new Date(),
    );

    return this.currencyMapper.dtoFromEntity(currency);
  }

  @Patch()
  async convert(
    @Body() convertCurrencyDto: ConvertCurrencyRequestDto,
  ): Promise<ConvertCurrencyResponseDto> {
    let date = new Date();

    const dtoDate = convertCurrencyDto.date;

    if (dtoDate !== undefined) {
      date = dtoDate;
    }

    const quoteAmount = await this.currenciesService.convert(
      convertCurrencyDto.from,
      convertCurrencyDto.to,
      convertCurrencyDto.amount,
      date,
    );

    if (quoteAmount === null) {
      throw new HttpException(
        "Couldn't convert",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      ...convertCurrencyDto,
      quoteAmount,
      date: dayjs(date).format('YYYY-MM-DD').toString(),
    };
  }
}
