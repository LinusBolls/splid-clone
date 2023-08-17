import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {fetchCurrencies} from "./ExchangeRatesApiClient";
import {PrismaClient} from "@prisma/client";
import {Currency} from "./entities/currency.entity";

const prisma = new PrismaClient()

@Injectable()
export class CurrenciesService {
    findAll() {
        return prisma.currency.findMany();
    }

    findOne(symbol: string) {
        const result = prisma.currency.findFirst({
            where: {
                symbol
            }
        });

        if (result === null) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }
}

export async function populateDbs() {
    const symbols = await fetchCurrencies();

    if (symbols !== null) {
        const symbolArray: Currency[] = []
        Object.keys(symbols).forEach((symbol) => {
            symbolArray.push({
                symbol,
                name: symbols[symbol]
            })
        })

        await prisma.currency.deleteMany()
        await prisma.currency.createMany({
            data: symbolArray
        })
    }
}