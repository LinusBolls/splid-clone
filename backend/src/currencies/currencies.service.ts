import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  fetchCurrencies,
  fetchHistoricalRates,
} from './ExchangeRatesApiClient';
import { PrismaClient } from '@prisma/client';
import { CurrencyRateMapper } from './mapping/currency-rate.mapper';
import { CurrencyMapper } from './mapping/currency.mapper';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

@Injectable()
export class CurrenciesService {
  constructor(
    private currencyMapper: CurrencyMapper,
    private currencyRateMapper: CurrencyRateMapper,
  ) {}

  async findAllCurrencies(date: Date) {
    await this.populateTables(date);

    return prisma.currency.findMany({
      where: {
        date,
      },
    });
  }

  async findOneCurrency(symbol: string, date: Date) {
    await this.populateTables(date);

    const result = prisma.currency.findFirst({
      where: {
        symbol,
        date,
      },
    });

    if (result === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findAllRates(date: Date) {
    await this.populateTables(date);

    return prisma.currencyRate.findMany({
      where: {
        date,
      },
    });
  }

  async findOneRate(symbol: string, date: Date) {
    await this.populateTables(date);

    const result = prisma.currencyRate.findFirst({
      where: {
        symbol,
        date,
      },
    });

    if (result === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async convert(
    symbolBase: string,
    symbolQuote: string,
    amount: number,
    date: Date,
  ) {
    await this.populateTables(date);

    const rates = await this.findAllRates(date);
    let eurAmount: Decimal;

    if (symbolBase !== 'EUR') {
      const rateEurBased = rates.find((value) => value.symbol === symbolBase);

      if (rateEurBased === undefined) {
        return null;
      }

      eurAmount = Decimal.mul(amount, rateEurBased.rateEurBase);
    } else {
      eurAmount = new Decimal(amount);
    }

    let quoteAmount: Decimal;

    if (symbolQuote === 'EUR') {
      quoteAmount = eurAmount;
    } else {
      const quoteRate = rates.find((value) => value.symbol === symbolQuote);
      quoteAmount = Decimal.div(quoteRate.rateEurBase, eurAmount);
    }

    return quoteAmount;
  }

  private async populateTables(date: Date) {
    //currencies / symbols [EUR, USD ...]
    const currencyResult = await prisma.currency.findFirst({
      where: {
        date,
      },
    });

    if (currencyResult === null) {
      const currencies = await fetchCurrencies(date);
      const domainCurrencies = this.currencyMapper.entitiesFromApi(currencies);

      await prisma.currency.createMany({
        data: domainCurrencies,
      });
    }

    //rates [e.g. 1.10 EUR/USD]
    const rateResult = await prisma.currencyRate.findFirst({
      where: {
        date,
      },
    });

    if (rateResult === null) {
      const rates = await fetchHistoricalRates(date);
      const domainRates = this.currencyRateMapper.entitiesFromApi(rates);

      await prisma.currencyRate.createMany({
        data: domainRates,
      });
    }
  }
}
