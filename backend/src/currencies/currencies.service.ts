import {Injectable} from '@nestjs/common';
import {fetchCurrencies} from "./ExchangeRatesApiClient";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

@Injectable()
export class CurrenciesService {
    findAll() {
        return `This action returns all currencies`;
    }

    findOne(id: number) {
        return `This action returns a #${id} currency`;
    }
}

interface Currency {
    symbol: string;
    name: string;
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