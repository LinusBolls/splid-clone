import { CurrencyDto } from '../../../../../backend/src/currencies/dto/currency.dto';
import { RequestConfig } from '../../requestConfig';

export type GetCurrenciesResponse = CurrencyDto[];

export async function getCurrencies(config: RequestConfig) {
  const url = config.baseUrl + '/currencies';

  const res = await config.httpClient.get<GetCurrenciesResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
