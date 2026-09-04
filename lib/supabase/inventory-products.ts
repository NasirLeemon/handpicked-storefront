import { createClient } from "@supabase/supabase-js";
import type { Product, ProductAvailability } from "@/types/product";

type CategoryRelation = {
  id: string;
  name: string;
} | null;

type ProductCategoryRelation = {
  categories: CategoryRelation | CategoryRelation[];
};

type VariantRow = {
  id: string;
  sku: string;
  color: string | null;
  size: string | null;
  selling_price: number | string;
  compare_at_price: number | string | null;
  available_stock: number;
  low_stock_threshold: number;
  is_default: boolean;
  is_active: boolean;
};

type ImageRow = {
  url: string;
  display_order: number;
  is_primary: boolean;
};

type OfferRow = {
  id: string;
  name: string;
  discount_percent: number | string;
  starts_at: string | null;
  ends_at: string | null;
  applies_to_all_products: boolean;
  offer_products:
    | { product_id: string }[]
    | null;
  offer_categories:
    | { category_id: string }[]
    | null;
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  details: string | null;
  size_guidance: string | null;
  delivery_payment_info: string | null;
  brand: string | null;
  country_of_origin: string | null;
  storefront_content: unknown;
  is_featured: boolean;
  is_new_arrival: boolean;
  show_on_storefront: boolean;
  status: "active" | "archived";
  created_at: string;
  categories: CategoryRelation | CategoryRelation[];
  product_categories: ProductCategoryRelation[];
  product_variants: VariantRow[];
  product_images: ImageRow[];
};

function getInventorySupabaseClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_INVENTORY_SUPABASE_URL;

  const serviceRoleKey =
    process.env.INVENTORY_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

function normalizeStorefrontContent(value: unknown) {
  const content =
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};

  const stringList = (item: unknown): string[] =>
    Array.isArray(item)
      ? item.filter(
          (entry): entry is string =>
            typeof entry === "string" &&
            entry.trim().length > 0,
        )
      : [];

  const productInfo = Array.isArray(content.productInfo)
    ? content.productInfo
        .filter(
          (item): item is Record<string, unknown> =>
            Boolean(
              item &&
              typeof item === "object" &&
              !Array.isArray(item),
            ),
        )
        .map((item) => ({
          label:
            typeof item.label === "string"
              ? item.label.trim()
              : "",
          value:
            typeof item.value === "string"
              ? item.value.trim()
              : "",
        }))
        .filter(
          (item) =>
            item.label.length > 0 &&
            item.value.length > 0,
        )
    : [];

  return {
    benefits: stringList(content.benefits),
    howToUse:
      typeof content.howToUse === "string"
        ? content.howToUse.trim()
        : "",
    keyIngredients: stringList(content.keyIngredients),
    suitableFor: stringList(content.suitableFor),
    typeTags: stringList(content.typeTags),
    warnings:
      typeof content.warnings === "string"
        ? content.warnings.trim()
        : "",
    productInfo,
  };
}

function getAvailability(
  availableStock: number,
  lowStockThreshold: number,
): ProductAvailability {
  if (availableStock <= 0) {
    return "sold-out";
  }

  if (availableStock <= lowStockThreshold) {
    return "low-stock";
  }

  return "available";
}

function isOfferLive(offer: OfferRow, now: number) {
  if (
    offer.starts_at &&
    new Date(offer.starts_at).getTime() > now
  ) {
    return false;
  }

  if (
    offer.ends_at &&
    new Date(offer.ends_at).getTime() < now
  ) {
    return false;
  }

  return true;
}

function mapProduct(
  row: ProductRow,
  offers: OfferRow[],
): Product | null {
  const activeVariants = row.product_variants.filter(
    (variant) => variant.is_active,
  );

  if (activeVariants.length === 0) {
    return null;
  }

  const defaultVariant =
    activeVariants.find((variant) => variant.is_default) ??
    activeVariants[0];

  const sortedImages = [...row.product_images].sort(
    (a, b) => a.display_order - b.display_order,
  );

  const images = sortedImages.map((image) => image.url);

  if (images.length === 0) {
    return null;
  }

  const legacyCategoryRelation = Array.isArray(row.categories)
    ? row.categories[0] ?? null
    : row.categories;

  const categories = [
    ...new Set(
      (row.product_categories ?? [])
        .flatMap((relation) =>
          Array.isArray(relation.categories)
            ? relation.categories
            : [relation.categories]
        )
        .map((category) => category?.name?.trim())
        .filter((name): name is string => Boolean(name))
    ),
  ];

  const primaryCategory =
    legacyCategoryRelation?.name?.trim() ||
    categories[0] ||
    "Uncategorized";

  const categoryIds = new Set(
    [
      legacyCategoryRelation?.id,
      ...(row.product_categories ?? []).flatMap(
        (relation) =>
          (Array.isArray(relation.categories)
            ? relation.categories
            : [relation.categories]
          )
            .map((category) => category?.id)
            .filter(
              (id): id is string => Boolean(id),
            ),
      ),
    ].filter(
      (id): id is string => Boolean(id),
    ),
  );

  const now = Date.now();

  const applicableOffers = offers
    .filter((offer) => isOfferLive(offer, now))
    .filter((offer) => {
      if (offer.applies_to_all_products) {
        return true;
      }

      const productMatch =
        offer.offer_products?.some(
          (target) =>
            target.product_id === row.id,
        ) ?? false;

      if (productMatch) {
        return true;
      }

      return (
        offer.offer_categories?.some(
          (target) =>
            categoryIds.has(
              target.category_id,
            ),
        ) ?? false
      );
    })
    .map((offer) => ({
      id: offer.id,
      name: offer.name,
      discountPercent: Number(
        offer.discount_percent || 0,
      ),
    }))
    .filter(
      (offer) =>
        Number.isFinite(
          offer.discountPercent,
        ) &&
        offer.discountPercent > 0,
    )
    .sort(
      (first, second) =>
        second.discountPercent -
        first.discountPercent,
    )
    .slice(0, 1);

  const regularPrice = Number(
    defaultVariant.selling_price || 0,
  );

  const highestOfferDiscount =
    applicableOffers[0]?.discountPercent ?? 0;

  const offerPrice =
    highestOfferDiscount > 0
      ? Math.round(
          regularPrice *
            (1 -
              highestOfferDiscount /
                100),
        )
      : regularPrice;

  const storefrontVariants = activeVariants.map(
    (variant) => {
      const variantRegularPrice = Number(
        variant.selling_price || 0,
      );

      const variantPrice =
        highestOfferDiscount > 0
          ? Math.round(
              variantRegularPrice *
                (1 -
                  highestOfferDiscount /
                    100),
            )
          : variantRegularPrice;

      return {
        id: variant.id,
        sku: variant.sku,
        color: variant.color?.trim() || "",
        size: variant.size?.trim() || "",
        price: variantPrice,
        compareAtPrice:
          applicableOffers.length > 0
            ? variantRegularPrice
            : variant.compare_at_price == null
              ? null
              : Number(
                  variant.compare_at_price,
                ),
        availableStock: Number(
          variant.available_stock || 0,
        ),
        lowStockThreshold: Number(
          variant.low_stock_threshold || 0,
        ),
        isDefault: variant.is_default,
      };
    },
  );

  if (
    primaryCategory !== "Uncategorized" &&
    !categories.includes(primaryCategory)
  ) {
    categories.unshift(primaryCategory);
  }

  const sizes = [
    ...new Set(
      activeVariants
        .map((variant) => variant.size?.trim())
        .filter((size): size is string => Boolean(size)),
    ),
  ];

  const colors = [
    ...new Set(
      activeVariants
        .map((variant) => variant.color?.trim())
        .filter((color): color is string => Boolean(color)),
    ),
  ];

  const availableStock = activeVariants.reduce(
    (sum, variant) => sum + Number(variant.available_stock || 0),
    0,
  );

  const lowStockThreshold = activeVariants.reduce(
    (sum, variant) => sum + Number(variant.low_stock_threshold || 0),
    0,
  );

  const description =
    row.description ||
    row.short_description ||
    `${row.name}. Message us for delivery and availability support.`;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: offerPrice,
    compareAtPrice:
      applicableOffers.length > 0
        ? regularPrice
        : defaultVariant.compare_at_price == null
          ? null
          : Number(defaultVariant.compare_at_price),
    offers: applicableOffers,
    category: primaryCategory,
    categories,
    description,
    details: row.details || description,
    shortDescription: row.short_description || undefined,
    brand: row.brand || undefined,
    countryOfOrigin: row.country_of_origin || undefined,
    sizeGuidance: row.size_guidance || undefined,
    deliveryPaymentInfo:
      row.delivery_payment_info || undefined,
    storefrontContent: normalizeStorefrontContent(
      row.storefront_content,
    ),
    images,
    color: colors.join(", "),
    sizes,
    variants: storefrontVariants,
    availability: getAvailability(
      availableStock,
      lowStockThreshold,
    ),
    featured: row.is_featured,
    isNewArrival: row.is_new_arrival,
    createdAt: row.created_at,
    availableStock,
  };
}

export async function getInventoryProductsForStorefront(): Promise<Product[]> {
  const supabase = getInventorySupabaseClient();

  if (!supabase) {
    return [];
  }

  const [productsResult, offersResult] =
    await Promise.all([
      supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          short_description,
          description,
          details,
          size_guidance,
          delivery_payment_info,
          brand,
          country_of_origin,
          storefront_content,
          is_featured,
          is_new_arrival,
          show_on_storefront,
          status,
          created_at,
          categories!products_category_id_fkey (
            id,
            name
          ),
          product_categories (
            categories (
              id,
              name
            )
          ),
          product_variants (
            id,
            sku,
            color,
            size,
            selling_price,
            compare_at_price,
            available_stock,
            low_stock_threshold,
            is_default,
            is_active
          ),
          product_images (
            url,
            display_order,
            is_primary
          )
        `)
        .eq("status", "active")
        .eq("show_on_storefront", true)
        .order("created_at", {
          ascending: false,
        }),

      supabase
        .from("offers")
        .select(`
          id,
          name,
          discount_percent,
          starts_at,
          ends_at,
          applies_to_all_products,
          offer_products (
            product_id
          ),
          offer_categories (
            category_id
          )
        `)
        .eq("is_active", true),
    ]);

  if (productsResult.error) {
    console.error(
      "Failed to load V2 storefront products:",
      productsResult.error,
    );
    return [];
  }

  if (offersResult.error) {
    console.error(
      "Failed to load storefront offers:",
      offersResult.error,
    );
  }

  const offers =
    offersResult.error
      ? []
      : ((offersResult.data ??
          []) as unknown as OfferRow[]);

  return (
    (productsResult.data ??
      []) as unknown as ProductRow[]
  )
    .map((row) =>
      mapProduct(row, offers),
    )
    .filter(
      (product): product is Product =>
        product !== null,
    );
}

export async function getInventoryProductBySlug(slug: string) {
  const products = await getInventoryProductsForStorefront();

  return products.find((product) => product.slug === slug);
}

export async function getInventoryNewArrivals() {
  const products = await getInventoryProductsForStorefront();

  return products.filter((product) => product.isNewArrival);
}

export async function getInventoryRelatedProducts(
  category: string,
  currentSlug: string,
) {
  const products = await getInventoryProductsForStorefront();

  return products.filter(
    (product) =>
      product.category === category &&
      product.slug !== currentSlug,
  );
}
