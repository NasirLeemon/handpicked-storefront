import type { CartItem } from "@/types/cart";

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => {
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 0);

    return total + price * quantity;
  }, 0);
}

export function getCartItemCount(items: CartItem[]) {
  return items.reduce((total, item) => {
    return total + Number(item.quantity || 0);
  }, 0);
}
