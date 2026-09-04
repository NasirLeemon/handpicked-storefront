export type ProductAvailability = "available" | "low-stock" | "sold-out";

export type ProductOffer = {
  id: string;
  name: string;
  discountPercent: number;
};

export type ProductVariant = {
  id: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  compareAtPrice: number | null;
  availableStock: number;
  lowStockThreshold: number;
  isDefault: boolean;
};

export type ProductInfoItem = {
  label: string;
  value: string;
};

export type ProductStorefrontContent = {
  benefits: string[];
  howToUse: string;
  keyIngredients: string[];
  suitableFor: string[];
  typeTags: string[];
  warnings: string;
  productInfo: ProductInfoItem[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  offers?: ProductOffer[];
  category: string;
  categories?: string[];
  description: string;
  details?: string;
  shortDescription?: string;
  brand?: string;
  countryOfOrigin?: string;
  sizeGuidance?: string;
  deliveryPaymentInfo?: string;
  storefrontContent?: ProductStorefrontContent;
  images: string[];
  sharedImages?: string[];
  variantImages?: Record<string, string[]>;
  color: string;
  sizes: string[];
  variants?: ProductVariant[];
  availability: ProductAvailability;
  featured: boolean;
  isNewArrival: boolean;
  createdAt?: string;
  availableStock?: number;
};
