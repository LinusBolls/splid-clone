import { CreatePaymentDto } from '../../../../../backend/src/groups/payment/dto/create-payment.dto';
import { PaymentDto } from '../../../../../backend/src/groups/payment/dto/payment.dto';
import { RequestConfig } from '../../requestConfig';

export type CreatePaymentResponse = PaymentDto;

export async function createPayment(
  config: RequestConfig,
  groupId: string,
  body: CreatePaymentDto
) {
  const url = config.baseUrl + '/groups/' + groupId + '/payments';

  const res = await config.httpClient.post<CreatePaymentResponse>(
    url,
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
