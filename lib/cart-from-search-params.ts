import type { CartItem } from "@/types/cart";
import { mockCartItems } from "@/data/cart";
import { getInventoryProductBySlug } from "@/lib/supabase/inventory-products";

type CartSearchParams = {
  product?: string;
  size?: string;
  qty?: string;
};

export async function getCartItemsFromSearchParams(
  searchParams: CartSearchParams,
  fallbackToMock = true
): Promise<CartItem[]> {
  const productSlug = searchParams.product;
  const selectedSize = searchParams.size;
  const quantity = Number(searchParams.qty || "1");

  if (!productSlug || !selectedSize) {
    return fallbackToMock ? mockCartItems : [];
  }

  const product = await getInventoryProductBySlug(productSlug);

  if (!product) {
    return fallbackToMock ? mockCartItems : [];
  }

  return [
    {
      id: `cart-${product.id}-${selectedSize}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      color: product.color,
      size: selectedSize,
      quantity:
        Number.isFinite(quantity) && quantity > 0
          ? quantity
          : 1,
      availableStock: product.availableStock,
    },
  ];
}
