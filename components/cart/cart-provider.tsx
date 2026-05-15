"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

type AddItemInput = {
  product: Product;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (input: AddItemInput) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "handpicked-cart";

function createCartItemId(productSlug: string, size: string) {
  return `${productSlug}-${size}`;
}

function normalizeCartItem(item: CartItem): CartItem | null {
  if (!item.slug || !item.size) {
    return null;
  }

  return {
    ...item,
    id: item.id || createCartItemId(item.slug, item.size),
    name: item.name || "Product",
    image: item.image || "",
    color: item.color || "",
    price: Number(item.price || 0),
    availableStock:
      typeof item.availableStock === "number"
        ? Math.max(0, Number(item.availableStock || 0))
        : undefined,
    quantity:
      typeof item.availableStock === "number"
        ? Math.min(
            Math.max(1, Number(item.quantity || 1)),
            Math.max(1, Number(item.availableStock || 1))
          )
        : Math.max(1, Number(item.quantity || 1)),
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

      if (!storedCart) {
        return;
      }

      const parsedItems = JSON.parse(storedCart) as CartItem[];
      const normalizedItems = parsedItems
        .map(normalizeCartItem)
        .filter(Boolean) as CartItem[];

      setItems(normalizedItems);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hasMounted, items]);

  function addItem({ product, size, quantity }: AddItemInput) {
    const id = createCartItemId(product.slug, size);

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === id);

      if (existingItem) {
        const maxQuantity = Number(product.availableStock ?? Infinity);

        return currentItems.map((item) =>
          item.id === id
            ? {
                ...item,
                availableStock: product.availableStock,
                quantity: Math.min(maxQuantity, item.quantity + quantity),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          id,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.images[0] || "",
          price: product.price,
          color: product.color,
          size,
          quantity: Math.min(Number(product.availableStock ?? quantity), quantity),
          availableStock: product.availableStock,
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const maxQuantity =
          typeof item.availableStock === "number"
            ? Math.max(1, item.availableStock)
            : quantity;

        return {
          ...item,
          quantity: Math.min(quantity, maxQuantity),
        };
      })
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) => total + Math.max(0, Number(item.quantity || 0)),
        0
      ),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
