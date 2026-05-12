export type DeliveryArea = "inside-dhaka" | "outside-dhaka";

export type PaymentType =
  | "cash-on-delivery"
  | "bkash"
  | "nagad"
  | "bank-transfer"
  | "advance-payment";

export type OrderRequest = {
  fullName: string;
  phone: string;
  address: string;
  deliveryArea: DeliveryArea;
  paymentType: PaymentType;
  note?: string;
};
