import { RequestConfig } from '../../requestConfig';

export interface GetCurrenciesResponse {
  symbol: string;
  name: string;
}
export async function getCurrencies(config: RequestConfig) {
  const url = config.baseUrl + '/currencies';

  const res = await config.httpClient.get<GetCurrenciesResponse>(
    url,
    config.getHeaders()
  );

  const data = res.data;

  return data;
}
