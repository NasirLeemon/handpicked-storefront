import type { CartItem } from "@/types/cart";

const CART_STORAGE_KEY = "handpicked-cart";

export function getStoredCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    return JSON.parse(storedCart) as CartItem[];
  } catch {
    return [];
  }
}

export function saveStoredCartItems(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function clearStoredCartItems() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(CART_STORAGE_KEY);
}
