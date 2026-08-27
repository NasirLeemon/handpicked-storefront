export const checkoutDeliveryAreas = [
  {
    value: "inside_dhaka",
    label: "Inside Dhaka",
    description: "",
    charge: 80,
  },
  {
    value: "suburb_dhaka",
    label: "Dhaka Suburb",
    description: "Gazipur, Keraniganj, Narayanganj, Savar",
    charge: 110,
  },
  {
    value: "outside_dhaka",
    label: "Outside Dhaka",
    description: "",
    charge: 150,
  },
] as const;

export type CheckoutDeliveryArea =
  (typeof checkoutDeliveryAreas)[number]["value"];

export const checkoutDeliveryCharges: Record<
  CheckoutDeliveryArea,
  number
> = {
  inside_dhaka: 80,
  suburb_dhaka: 110,
  outside_dhaka: 150,
};

export const deliveryAreaOptions = [
  {
    label: "Inside Dhaka",
    value: "inside-dhaka",
  },
  {
    label: "Outside Dhaka",
    value: "outside-dhaka",
  },
];

export const insideDhakaPaymentOptions = [
  {
    label: "Cash on Delivery",
    value: "cash-on-delivery",
  },
  {
    label: "bKash",
    value: "bkash",
  },
  {
    label: "Nagad",
    value: "nagad",
  },
  {
    label: "Bank Transfer",
    value: "bank-transfer",
  },
];

export const outsideDhakaPaymentOptions = [
  {
    label: "bKash",
    value: "bkash",
  },
  {
    label: "Nagad",
    value: "nagad",
  },
  {
    label: "Bank Transfer",
    value: "bank-transfer",
  },
  {
    label: "Advance Payment",
    value: "advance-payment",
  },
];
