"use client";

import Link from "next/link";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";
import { MobileFilterDrawer } from "@/components/shop/mobile-filter-drawer";
import { ProductGrid } from "@/components/product/product-grid";
import { ShopFilterSelect } from "@/components/shop/shop-filter-select";
import { ShopSearchInput } from "@/components/shop/shop-search-input";
import { toCategorySlug } from "@/lib/shop/category-slug";
import type { Product } from "@/types/product";

type ShopProductsClientProps = {
  products: Product[];
  initialCategory?: string;
  catalogOnly?: boolean;
};

const PRODUCTS_PER_PAGE = 18;

function getCategoryOptions(products: Product[]) {
  const categories = Array.from(
    new Set(
      products
        .flatMap((product) =>
          product.categories?.length
            ? product.categories
            : [product.category]
        )
        .map((category) => category.trim())
        .filter((category) => category && category !== "Uncategorized")
    )
  ).sort((a, b) => a.localeCompare(b));

  return [
    { label: "All Categories", value: "all" },
    ...categories.map((category) => ({
      label: category,
      value: category,
    })),
  ];
}

const availabilityOptions = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Low Stock", value: "low-stock" },
  { label: "Sold Out", value: "sold-out" },
];

const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low-high" },
  { label: "Price: High to Low", value: "price-high-low" },
];

function getInitialCategory(
  categoryParam: string | null,
  categoryOptions: { label: string; value: string }[]
) {
  if (!categoryParam) {
    return "all";
  }

  const validCategory = categoryOptions.some(
    (option) => option.value === categoryParam
  );

  return validCategory ? categoryParam : "all";
}

function getSortLabel(value: string) {
  return (
    sortOptions.find((option) => option.value === value)?.label ?? "Recommended"
  );
}

function sortRecommendedProducts(products: Product[]) {
  return [...products].sort((a, b) => {
    const aSoldOut = a.availability === "sold-out" ? 1 : 0;
    const bSoldOut = b.availability === "sold-out" ? 1 : 0;

    if (aSoldOut !== bSoldOut) {
      return aSoldOut - bSoldOut;
    }

    const featuredDifference =
      Number(b.featured) - Number(a.featured);

    if (featuredDifference !== 0) {
      return featuredDifference;
    }

    const newArrivalDifference =
      Number(b.isNewArrival) - Number(a.isNewArrival);

    if (newArrivalDifference !== 0) {
      return newArrivalDifference;
    }

    return (
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime()
    );
  });
}

const departmentCategoryAliases: Record<string, string[]> = {
  skincare: [
    "skincare",
    "skin care",
  ],
  haircare: [
    "haircare",
    "hair care",
  ],
  clothing: [
    "clothing",
    "ethnic",
    "ethnic wear",
    "co-ords",
    "co ords",
    "coords",
    "tops",
    "top",
    "dress",
    "dresses",
    "kurti",
    "kurtis",
    "saree",
    "sarees",
    "fashion",
  ],
  makeup: [
    "makeup",
    "make up",
    "eyeshadow",
    "eye shadow",
    "mascara",
    "lipstick",
    "blush",
  ],
  accessories: [
    "accessories",
    "accessory",
  ],
};

function normalizeDepartmentCategory(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function productMatchesDepartment(
  productCategories: string[],
  department: string,
) {
  if (!department) {
    return true;
  }

  const aliases =
    departmentCategoryAliases[department];

  if (!aliases) {
    return true;
  }

  const normalizedCategories =
    productCategories.map(
      normalizeDepartmentCategory,
    );

  return aliases.some((alias) =>
    normalizedCategories.some(
      (category) =>
        category === alias ||
        category.includes(alias),
    ),
  );
}

export function ShopProductsClient({
  products,
  initialCategory,
  catalogOnly = false,
}: ShopProductsClientProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const cleanDepartment =
    pathname.match(
      /^\/shop\/(new-in|skincare|haircare|clothing|makeup|accessories)\/?$/
    )?.[1] ?? "";

  const department =
    cleanDepartment ||
    searchParams.get("department")?.trim().toLowerCase() ||
    "";

  const isNewInView = department === "new-in";
  const isShopAllView = !catalogOnly && !department;

  const isPremiumDepartmentView =
    isShopAllView ||
    isNewInView ||
    department === "skincare" ||
    department === "haircare" ||
    department === "clothing" ||
    department === "makeup" ||
    department === "accessories";

  const premiumDepartmentLabel =
    isShopAllView
      ? "All products"
      : isNewInView
        ? "New arrivals"
        : department === "skincare"
          ? "Skincare"
          : department === "haircare"
            ? "Haircare"
            : department === "clothing"
              ? "Clothing"
              : department === "makeup"
                ? "Makeup"
                : department === "accessories"
                  ? "Accessories"
                  : "";

  const categoryOptions = useMemo(
    () => getCategoryOptions(products),
    [products]
  );

  const urlSearch =
    searchParams.get("search") ?? "";

  const [search, setSearch] =
    useState(urlSearch);

  const [category, setCategory] = useState(() =>
    initialCategory ??
    getInitialCategory(searchParams.get("category"), categoryOptions)
  );
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const productCategories =
        product.categories?.length
          ? product.categories
          : [product.category];

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        productCategories.some((productCategory) =>
          productCategory.toLowerCase().includes(normalizedSearch)
        ) ||
        product.color.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "all" ||
        productCategories.includes(category);

      const matchesDepartment =
        department === "new-in"
          ? product.isNewArrival
          : productMatchesDepartment(
              productCategories,
              department,
            );

      const matchesAvailability =
        availability === "all" || product.availability === availability;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDepartment &&
        matchesAvailability
      );
    });

    if (sort === "price-low-high") {
      return [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high-low") {
      return [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      return [...result].sort((a, b) => {
        const aSoldOut = a.availability === "sold-out" ? 1 : 0;
        const bSoldOut = b.availability === "sold-out" ? 1 : 0;

        if (aSoldOut !== bSoldOut) {
          return aSoldOut - bSoldOut;
        }

        return (
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
        );
      });
    }

    return sortRecommendedProducts(result);
  }, [
    availability,
    category,
    department,
    products,
    search,
    sort,
  ]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMoreProducts = visibleCount < filteredProducts.length;

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    if (department) {
      setCategory("all");
    }
  }, [department]);

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [
    availability,
    category,
    department,
    search,
    sort,
  ]);

  function clearFilters() {
    setSearch("");

    setCategory(
      catalogOnly && initialCategory
        ? initialCategory
        : "all"
    );

    setAvailability("all");
    setSort("newest");
    setVisibleCount(PRODUCTS_PER_PAGE);
    setFiltersOpen(false);
    setSortOpen(false);
  }

  function handleSortChange(value: string) {
    setSort(value);
    setSortOpen(false);
  }

  function loadMoreProducts() {
    setVisibleCount((currentCount) => currentCount + PRODUCTS_PER_PAGE);
  }

  const showingCount = Math.min(
    visibleProducts.length,
    filteredProducts.length
  );

  const isCuratedView =
    !catalogOnly &&
    search.trim().length === 0 &&
    category === "all" &&
    department.length === 0 &&
    availability === "all" &&
    sort === "newest";

  const curatedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const aSoldOut = a.availability === "sold-out" ? 1 : 0;
      const bSoldOut = b.availability === "sold-out" ? 1 : 0;

      if (aSoldOut !== bSoldOut) {
        return aSoldOut - bSoldOut;
      }

      return (
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
      );
    });
  }, [products]);

  const featuredProducts = useMemo(
    () => curatedProducts.filter((product) => product.featured).slice(0, 8),
    [curatedProducts]
  );

  const categorySections = useMemo(() => {
    const storefrontCategoryOrder = [
      "Hair Care",
      "Skincare",
      "Beauty",
      "Personal Care",
      "Ethnic",
      "Co-ords",
      "Kurti",
      "Tops",
      "Bottom",
      "Accessories",
      "Earrings",
    ];

    const categoryOrder = new Map(
      storefrontCategoryOrder.map((categoryName, index) => [
        categoryName,
        index,
      ])
    );

    return categoryOptions
      .filter((option) => option.value !== "all")
      .map((option) => ({
        category: option.value,
        products: curatedProducts
          .filter(
            (product) =>
              product.category === option.value
          )
          .slice(0, 4),
      }))
      .filter((section) => section.products.length > 0)
      .sort((a, b) => {
        const aOrder =
          categoryOrder.get(a.category) ?? Number.MAX_SAFE_INTEGER;
        const bOrder =
          categoryOrder.get(b.category) ?? Number.MAX_SAFE_INTEGER;

        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }

        return a.category.localeCompare(b.category);
      });
  }, [categoryOptions, curatedProducts]);

  return (
    <div
      className={
        isPremiumDepartmentView
          ? "relative left-1/2 w-screen -translate-x-1/2 px-4 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-7 lg:px-8"
          : ""
      }
    >
      <div className="mb-4 md:hidden">
        {!isPremiumDepartmentView ? (
          <ShopSearchInput
            value={search}
            onChange={setSearch}
          />
        ) : null}
        {catalogOnly || isPremiumDepartmentView ? (
          <>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-warm-border bg-[#FFFDF9] px-3 text-[10px] font-medium text-deep-brown"
              >
                <SlidersHorizontal
                  className="h-3.5 w-3.5"
                  strokeWidth={1.7}
                />
                Filters
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((current) => !current)}
                  className="inline-flex h-8 w-full items-center justify-between rounded-full border border-warm-border bg-[#FFFDF9] px-3 text-[10px] font-medium text-deep-brown"
                >
                  {getSortLabel(sort)}
                  <span className="text-[10px] text-muted-gold">⌄</span>
                </button>

                {sortOpen ? (
                  <div className="absolute right-0 top-10 z-30 w-48 overflow-hidden rounded-xl border border-warm-border bg-soft-white shadow-[0_16px_40px_rgba(47,33,24,0.14)]">
                    {sortOptions.map((option) => {
                      const isSelected = sort === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSortChange(option.value)}
                          className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[12px] transition ${
                            isSelected
                              ? "bg-light-sand font-semibold text-deep-brown"
                              : "text-soft-brown hover:bg-ivory hover:text-deep-brown"
                          }`}
                        >
                          {option.label}

                          {isSelected ? (
                            <span className="text-muted-gold">✓</span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>

            {(search ||
              availability !== "all" ||
              sort !== "newest") ? (
              <div className="mt-2 flex items-center justify-between px-0.5">
                <p className="text-[10px] text-soft-brown">
                  <span className="font-semibold text-deep-brown">
                    {filteredProducts.length}
                  </span>{" "}
                  results
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[8px] font-semibold tracking-[0.1em] text-muted-gold uppercase transition hover:text-deep-brown"
                >
                  Clear
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {!catalogOnly && !isPremiumDepartmentView ? (
        <div className="mb-6 hidden md:block">
          <div className="max-w-md">
            <ShopSearchInput value={search} onChange={setSearch} />
          </div>
        </div>
      ) : null}

      {isPremiumDepartmentView ? (
        <div className="mb-5 hidden md:flex md:items-end md:justify-between md:gap-8 md:py-3.5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-gold">
              {premiumDepartmentLabel}
            </p>

            <p className="mt-1 text-sm text-soft-brown">
              <span className="font-semibold text-deep-brown">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          <div className="flex items-end gap-8">
            <div className="w-[180px]">
              <ShopFilterSelect
                label="Availability"
                value={availability}
                options={availabilityOptions}
                onChange={setAvailability}
              />
            </div>

            <div className="w-[200px]">
              <ShopFilterSelect
                label="Sort"
                value={sort}
                options={sortOptions}
                onChange={setSort}
              />
            </div>

            {(availability !== "all" ||
              sort !== "newest") ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-gold transition hover:text-deep-brown"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {catalogOnly ? (
        <div className="mb-6 hidden md:block">
          <div className="flex items-end gap-6 border-b border-warm-border pb-3">
            <div className="min-w-0 flex-1">
              <ShopSearchInput value={search} onChange={setSearch} />
            </div>

            <div className="w-[170px]">
              <ShopFilterSelect
                label="Availability"
                value={availability}
                options={availabilityOptions}
                onChange={setAvailability}
              />
            </div>

            <div className="w-[170px]">
              <ShopFilterSelect
                label="Sort"
                value={sort}
                options={sortOptions}
                onChange={setSort}
              />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-soft-brown">
              <span className="font-medium text-deep-brown">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            {(search ||
              availability !== "all" ||
              sort !== "newest") ? (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-semibold tracking-[0.12em] text-muted-gold uppercase transition hover:text-deep-brown"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <MobileFilterDrawer
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        category={category}
        availability={availability}
        categoryOptions={categoryOptions}
        availabilityOptions={availabilityOptions}
        onCategoryChange={setCategory}
        onAvailabilityChange={setAvailability}
        onClear={clearFilters}
        resultCount={filteredProducts.length}
        showCategory={!catalogOnly}
      />

      {isCuratedView ? (
        <div className="space-y-12 sm:space-y-16">
          {featuredProducts.length > 0 ? (
            <section>
              <div className="mb-5 sm:mb-7">
                <p className="text-[9px] font-semibold tracking-[0.22em] text-muted-gold uppercase sm:text-[10px]">
                  Handpicked for you
                </p>

                <div className="mt-1 inline-block">
                  <h2 className="font-serif-brand text-[1.9rem] font-medium leading-none tracking-[-0.03em] text-deep-brown sm:text-[2.6rem]">
                    Featured Picks
                  </h2>
                  <div className="mt-1 h-[2px] w-full rounded-full bg-muted-gold" />
                </div>
              </div>

              <ProductGrid products={featuredProducts} variant="featured" />

              <div className="mt-5 flex justify-center sm:mt-8">
                <Link
                  href="/shop/featured"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#3F2A20] bg-[#3F2A20] px-5 text-[10px] font-semibold tracking-[0.13em] uppercase md:hidden"
                >
                  <span style={{ color: "#FFFDF9" }}>
                    View All Featured
                  </span>

                  <ArrowRight
                    className="h-3.5 w-3.5"
                    color="#FFFDF9"
                    strokeWidth={1.7}
                  />
                </Link>

                <Link
                  href="/shop/featured"
                  className="group hidden h-11 items-center justify-center gap-2 rounded-full border border-warm-border bg-[#FFFDF9] px-7 text-[11px] font-semibold tracking-[0.13em] uppercase transition-all duration-300 hover:border-deep-brown hover:bg-deep-brown md:inline-flex"
                >
                  <span className="text-[#3F2A20] transition-colors duration-300 group-hover:text-[#FFFDF9]">
                    View All Featured
                  </span>

                  <ArrowRight
                    className="h-3.5 w-3.5 text-[#3F2A20] transition-colors duration-300 group-hover:text-[#FFFDF9]"
                    strokeWidth={1.7}
                  />
                </Link>
              </div>
            </section>
          ) : null}

          {categorySections.map((section) => (
            <section key={section.category}>
              <div className="mb-5 sm:mb-7">
                <div className="inline-block">
                  <h2 className="font-serif-brand text-[1.9rem] font-medium leading-none tracking-[-0.03em] text-deep-brown sm:text-[2.5rem]">
                    {section.category}
                  </h2>
                  <div className="mt-1 h-[2px] w-full rounded-full bg-muted-gold" />
                </div>
              </div>

              <ProductGrid products={section.products} variant="curated" />

              <div className="mt-5 flex justify-center sm:mt-8">
                <Link
                  href={`/shop/${toCategorySlug(section.category)}`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#3F2A20] bg-[#3F2A20] px-5 text-[10px] font-semibold tracking-[0.13em] uppercase md:hidden"
                >
                  <span style={{ color: "#FFFDF9" }}>
                    View All {section.category}
                  </span>

                  <ArrowRight
                    className="h-3.5 w-3.5"
                    color="#FFFDF9"
                    strokeWidth={1.7}
                  />
                </Link>

                <Link
                  href={`/shop/${toCategorySlug(section.category)}`}
                  className="group hidden h-11 items-center justify-center gap-2 rounded-full border border-warm-border bg-[#FFFDF9] px-7 text-[11px] font-semibold tracking-[0.13em] uppercase transition-all duration-300 hover:border-deep-brown hover:bg-deep-brown md:inline-flex"
                >
                  <span className="text-[#3F2A20] transition-colors duration-300 group-hover:text-[#FFFDF9]">
                    View All {section.category}
                  </span>

                  <ArrowRight
                    className="h-3.5 w-3.5 text-[#3F2A20] transition-colors duration-300 group-hover:text-[#FFFDF9]"
                    strokeWidth={1.7}
                  />
                </Link>
              </div>
            </section>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className={catalogOnly ? "mt-1" : ""}>
          <ProductGrid
            products={visibleProducts}
            variant={
              isPremiumDepartmentView
                ? "new-in"
                : "catalog"
            }
          />

          {hasMoreProducts ? (
            <div className="mt-10 flex flex-col items-center sm:mt-12">
              <p className="mb-4 text-xs tracking-[0.12em] text-soft-brown uppercase">
                Showing {showingCount} of {filteredProducts.length} pieces
              </p>

              <button
                type="button"
                onClick={loadMoreProducts}
                className="inline-flex h-12 items-center justify-center border border-deep-brown bg-transparent px-9 text-[10px] font-semibold uppercase tracking-[0.18em] text-deep-brown transition hover:bg-deep-brown hover:text-[#FFFDF9]"
              >
                Load More
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-warm-border bg-soft-white px-6 py-16 text-center">
          <h2 className="font-serif-brand text-4xl font-medium text-deep-brown">
            No pieces found
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-soft-brown">
            Try adjusting your filters or message us for help finding the
            perfect piece.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-warm-border bg-soft-white px-8 text-sm font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}