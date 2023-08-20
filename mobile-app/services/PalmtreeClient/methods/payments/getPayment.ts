import { PaymentDto } from '../../../../../backend/src/groups/payment/dto/payment.dto';
import { RequestConfig } from '../../requestConfig';

export type GetPaymentResponse = PaymentDto;

export async function getPayment(
  config: RequestConfig,
  groupId: string,
  paymentId: string
) {
  const url = config.baseUrl + '/groups/' + groupId + '/payments/' + paymentId;

  const res = await config.httpClient.get<GetPaymentResponse>(
    url,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
