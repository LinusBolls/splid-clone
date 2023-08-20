import { RequestConfig } from '../../requestConfig';

export type DeletePaymentResponse = void;

export async function createPayment(
  config: RequestConfig,
  groupId: string,
  paymentId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/payments/' + paymentId;

  const res = await config.httpClient.delete<DeletePaymentResponse>(
    url,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
