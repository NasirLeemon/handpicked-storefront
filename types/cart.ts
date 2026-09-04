export type CartItem = {
  id: string;
  productId: string;
  variantId?: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  availableStock?: number;
};
