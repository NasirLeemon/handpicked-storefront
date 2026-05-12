"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearStoredCartItems,
  getStoredCartItems,
  saveStoredCartItems,
} from "@/lib/cart-storage";
import type { CartItem } from "@/types/cart";

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: React.ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setItems(getStoredCartItems());
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    saveStoredCartItems(items);
  }, [hasLoaded, items]);

  const cartCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  function addItem(nextItem: CartItem) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.productId === nextItem.productId && item.size === nextItem.size
      );

      if (!existingItem) {
        return [...currentItems, nextItem];
      }

      return currentItems.map((item) => {
        if (item.id !== existingItem.id) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + nextItem.quantity,
        };
      });
    });
  }

  function removeItem(itemId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  }

  function updateQuantity(itemId: string, quantity: number) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, quantity),
        };
      })
    );
  }

  function clearCart() {
    clearStoredCartItems();
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
