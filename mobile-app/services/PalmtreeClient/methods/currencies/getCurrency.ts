import { RequestConfig } from '../../requestConfig';

export interface GetCurrencyResponse {
  symbol: string;
  name: string;
}
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
