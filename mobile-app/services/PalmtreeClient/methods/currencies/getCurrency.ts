import { CurrencyDto } from '../../../../../backend/src/currencies/dto/currency.dto';
import { RequestConfig } from '../../requestConfig';

export type GetCurrencyResponse = CurrencyDto;

export async function getCurrency(
  config: RequestConfig,
  currencySymbol: string
) {
  const url = config.baseUrl + '/currencies/' + currencySymbol;

  const res = await config.httpClient.get<GetCurrencyResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
