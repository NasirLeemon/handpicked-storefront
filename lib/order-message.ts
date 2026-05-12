import type { CartItem } from "@/types/cart";
import type { DeliveryArea } from "@/types/order";

type CreateOrderMessageInput = {
  items: CartItem[];
  fullName: string;
  phone: string;
  address: string;
  deliveryArea: DeliveryArea;
  paymentType: string;
  note: string;
};

const paymentLabels: Record<string, string> = {
  "cash-on-delivery": "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
  "bank-transfer": "Bank Transfer",
  "advance-payment": "Advance Payment",
};

const deliveryAreaLabels: Record<DeliveryArea, string> = {
  "inside-dhaka": "Inside Dhaka",
  "outside-dhaka": "Outside Dhaka",
};

export function createOrderMessage({
  items,
  fullName,
  phone,
  address,
  deliveryArea,
  paymentType,
  note,
}: CreateOrderMessageInput) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const productLines = items
    .map((item, index) => {
      return [
        `${index + 1}. ${item.name}`,
        `   Size: ${item.size}`,
        `   Color: ${item.color}`,
        `   Quantity: ${item.quantity}`,
        `   Price: ৳ ${(item.price * item.quantity).toLocaleString()}`,
      ].join("\n");
    })
    .join("\n\n");

  return [
    "New Order Request - Handpicked",
    "",
    "Customer Details:",
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    `Delivery Area: ${deliveryAreaLabels[deliveryArea]}`,
    `Payment Type: ${paymentLabels[paymentType] || paymentType}`,
    "",
    "Order Items:",
    productLines,
    "",
    `Subtotal: ৳ ${subtotal.toLocaleString()}`,
    "Delivery Charge: To be confirmed",
    "",
    note.trim() ? `Customer Note: ${note.trim()}` : "Customer Note: None",
    "",
    deliveryArea === "outside-dhaka"
      ? "Note: Outside Dhaka orders require advance payment before dispatch."
      : "Note: Inside Dhaka delivery/payment will be confirmed by the team.",
  ].join("\n");
}
