import { PaymentDto } from '../../../../../backend/src/groups/payment/dto/payment.dto';
import { UpdatePaymentDto } from '../../../../../backend/src/groups/payment/dto/update-payment.dto';
import { RequestConfig } from '../../requestConfig';

export type UpdatePaymentResponse = PaymentDto;

export async function updatePayment(
  config: RequestConfig,
  groupId: string,
  paymentId: string,
  body: UpdatePaymentDto
) {
  const url = config.baseUrl + '/groups/' + groupId + '/payments/' + paymentId;

  const res = await config.httpClient.put<UpdatePaymentResponse>(
    url,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
