import type { CartItem } from "@/types/cart";

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
