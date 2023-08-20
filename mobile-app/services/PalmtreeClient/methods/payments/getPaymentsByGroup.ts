import { PaymentDto } from '../../../../../backend/src/groups/payment/dto/payment.dto';
import { RequestConfig } from '../../requestConfig';

export type GetPaymentsByGroupResponse = PaymentDto[];

export async function getPaymentsByGroup(
  config: RequestConfig,
  groupId: string,
  senderId?: string | null,
  receiverId?: string | null
) {
  const url = new URL(config.baseUrl + '/groups/' + groupId + '/payments/');

  if (senderId) url.searchParams.set('senderId', senderId);
  if (receiverId) url.searchParams.set('receiverId', receiverId);

  const res = await config.httpClient.get<GetPaymentsByGroupResponse>(
    url.toString(),
    config.getHeaders()
  );
  const data = res.data;

  return data;
}
