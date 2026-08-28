import type { Product } from "@/types/product";

export type HomeDepartment =
  | "clothing"
  | "skincare"
  | "haircare"
  | "makeup"
  | "accessories";

export const homeDepartments: {
  id: HomeDepartment;
  label: string;
  href: string;
}[] = [
  {
    id: "skincare",
    label: "Skincare",
    href: "/shop/skincare",
  },
  {
    id: "haircare",
    label: "Haircare",
    href: "/shop/haircare",
  },
  {
    id: "clothing",
    label: "Clothing",
    href: "/shop/clothing",
  },
  {
    id: "makeup",
    label: "Beauty",
    href: "/shop/makeup",
  },
  {
    id: "accessories",
    label: "Accessories",
    href: "/shop/accessories",
  },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchableText(product: Product) {
  return normalize(
    [
      product.name,
      product.category,
      ...(product.categories ?? []),
    ].join(" "),
  );
}

const departmentKeywords: Record<
  HomeDepartment,
  string[]
> = {
  clothing: [
    "clothing",
    "ethnic",
    "co ord",
    "coord",
    "top",
    "dress",
    "kurti",
    "saree",
    "fashion",
  ],

  skincare: [
    "skincare",
    "skin care",
    "micellar",
    "sunscreen",
    "facial",
    "cleanser",
    "cleansing",
    "face wash",
    "serum",
    "sheet mask",
    "snail mask",
    "collagen mask",
    "acne",
  ],

  haircare: [
    "haircare",
    "hair care",
    "shampoo",
    "conditioner",
    "hair mask",
    "keratin",
    "hair treatment",
    "anti hairfall",
    "anti-hairfall",
  ],

  makeup: [
    "makeup",
    "make up",
    "lipstick",
    "mascara",
    "blush",
    "palette",
    "eyeshadow",
    "eye shadow",
    "eyeliner",
    "lip pencil",
    "velvet pencil",
  ],

  accessories: [
    "accessories",
    "accessory",
    "jewellery",
    "jewelry",
    "earring",
    "necklace",
    "bracelet",
    "bag",
    "wallet",
  ],
};

export function productMatchesHomeDepartment(
  product: Product,
  department: HomeDepartment,
) {
  const text = searchableText(product);

  return departmentKeywords[department].some(
    (keyword) => text.includes(keyword),
  );
}

export function pickHomeDepartmentProduct(
  products: Product[],
  department: HomeDepartment,
  usedProductIds: Set<string> = new Set(),
) {
  const matches = products.filter(
    (product) =>
      !usedProductIds.has(product.id) &&
      product.images.length > 0 &&
      productMatchesHomeDepartment(
        product,
        department,
      ),
  );

  const inStock =
    matches.find(
      (product) =>
        product.availability !== "sold-out",
    ) ?? matches[0];

  return inStock ?? null;
}

export function getHomeDepartmentProducts(
  products: Product[],
) {
  const used = new Set<string>();

  return homeDepartments.map((department) => {
    const product = pickHomeDepartmentProduct(
      products,
      department.id,
      used,
    );

    if (product) {
      used.add(product.id);
    }

    return {
      ...department,
      product,
    };
  });
}
