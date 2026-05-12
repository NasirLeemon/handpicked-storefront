import { getProductBySlug } from "@/lib/products";
import type { CartItem } from "@/types/cart";

type CreateCartItemInput = {
  productSlug: string;
  size: string;
  quantity: number;
};

export function createCartItemFromProduct({
  productSlug,
  size,
  quantity,
}: CreateCartItemInput): CartItem | null {
  const product = getProductBySlug(productSlug);

  if (!product) {
    return null;
  }

  return {
    id: `cart-${product.id}-${size}`,
    productId: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.images[0] || "",
    color: product.color,
    size,
    quantity,
  };
}
