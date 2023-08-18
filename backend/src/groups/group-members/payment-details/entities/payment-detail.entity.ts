import {Expose} from "class-transformer";

export class PaymentDetail {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() type: typeof Type;
  @Expose() detail: PayPalPaymentDetail | IbanPaymentDetail
}

interface PayPalPaymentDetail {
  username: string
}

interface IbanPaymentDetail {
  iban: string
  bic?: string
}