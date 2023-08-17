import * as process from "process";

const apiKey = process.env.EXCHANGE_RATES_API_KEY
const baseUrl = process.env.EXCHANGE_RATES_API_BASE

const fetchCurrencies = async (date: Date) => {
    const response = await fetch(baseUrl + `symbols?access_key=${apiKey}`);

    if (response.status === 200) {
        const symbols = (await response.json()).symbols;

        const symbolsArray: ApiCurrency[] = []
        Object.keys(symbols).forEach(symbol => {
            symbolsArray.push({
                date: date,
                symbol,
                name: symbols[symbol]
            })
        })

        return symbolsArray;
    } else {
        return null
    }
}

const fetchHistoricalRates = async (date: Date) => {
    const response = await fetch(baseUrl + `${date.toISOString().split('T')[0]}?access_key=${apiKey}&base=EUR`);

    if (response.status === 200) {
        const rates = (await response.json()).rates;

        const ratesArray: ApiRate[] = []
        Object.keys(rates).forEach(symbol => {
            ratesArray.push({
                date,
                symbol,
                rate: rates[symbol]
            })
        })

        return ratesArray;
    } else {
        return null
    }
}

export {fetchCurrencies, fetchHistoricalRates}