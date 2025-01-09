export interface OrderPaymentModel {
  orderId: string;
  orderDate: Date;
  paymentDate: Date;
  secondary: boolean;
}
