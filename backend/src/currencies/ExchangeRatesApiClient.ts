import * as process from "process";

const apiKey = process.env.EXCHANGE_RATES_API_KEY
const baseUrl = process.env.EXCHANGE_RATES_API_BASE

const fetchCurrencies = async () => {
    const response = await fetch(baseUrl + `symbols?access_key=${apiKey}`);

    if (response.status === 200) {
        return (await response.json()).symbols;
    } else {
        return null
    }
}

export {fetchCurrencies}