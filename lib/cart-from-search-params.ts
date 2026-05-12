import type { CartItem } from "@/types/cart";
import { mockCartItems } from "@/data/cart";
import { getProductBySlug } from "@/lib/products";

type CartSearchParams = {
  product?: string;
  size?: string;
  qty?: string;
};

export function getCartItemsFromSearchParams(
  searchParams: CartSearchParams,
  fallbackToMock = true
): CartItem[] {
  const productSlug = searchParams.product;
  const selectedSize = searchParams.size;
  const quantity = Number(searchParams.qty || "1");

  if (!productSlug || !selectedSize) {
    return fallbackToMock ? mockCartItems : [];
  }

  const product = getProductBySlug(productSlug);

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
      quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    },
  ];
}
