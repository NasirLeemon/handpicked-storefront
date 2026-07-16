"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MobileFilterDrawer } from "@/components/shop/mobile-filter-drawer";
import { ProductGrid } from "@/components/product/product-grid";
import { ShopFilterSelect } from "@/components/shop/shop-filter-select";
import { ShopSearchInput } from "@/components/shop/shop-search-input";
import type { Product } from "@/types/product";

type ShopProductsClientProps = {
  products: Product[];
};

const PRODUCTS_PER_PAGE = 18;

const categoryOptions = [
  { label: "All", value: "all" },
  { label: "Co-ords", value: "Co-ords" },
  { label: "Ethnic", value: "Ethnic" },
  { label: "Tops", value: "Tops" },
  { label: "Accessories", value: "Accessories" },
  { label: "Beauty", value: "Beauty" },
];

const availabilityOptions = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Low Stock", value: "low-stock" },
  { label: "Sold Out", value: "sold-out" },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Low to High", value: "price-low-high" },
  { label: "High to Low", value: "price-high-low" },
];

const preferredCategoryOrder = [
  "Ethnic",
  "Co-ords",
  "Tops",
  "Accessories",
  "Beauty",
];

function getInitialCategory(categoryParam: string | null) {
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
    sortOptions.find((option) => option.value === value)?.label ?? "Featured"
  );
}

function interleaveProductsByCategory(products: Product[]) {
  const buckets = new Map<string, Product[]>();

  products.forEach((product) => {
    const productCategory = product.category.trim() || "Other";
    const existingProducts = buckets.get(productCategory) ?? [];

    buckets.set(productCategory, [...existingProducts, product]);
  });

  const orderedCategories = [
    ...preferredCategoryOrder.filter((category) => buckets.has(category)),
    ...Array.from(buckets.keys()).filter(
      (category) => !preferredCategoryOrder.includes(category)
    ),
  ];

  const result: Product[] = [];
  let hasProductsRemaining = true;

  while (hasProductsRemaining) {
    hasProductsRemaining = false;

    orderedCategories.forEach((category) => {
      const categoryProducts = buckets.get(category);

      if (categoryProducts && categoryProducts.length > 0) {
        const nextProduct = categoryProducts.shift();

        if (nextProduct) {
          result.push(nextProduct);
          hasProductsRemaining = true;
        }
      }
    });
  }

  return result;
}

function sortFeaturedProducts(products: Product[]) {
  const featuredProducts = products.filter((product) => product.featured);
  const regularProducts = products.filter((product) => !product.featured);

  return [
    ...interleaveProductsByCategory(featuredProducts),
    ...interleaveProductsByCategory(regularProducts),
  ];
}

export function ShopProductsClient({
  products,
}: ShopProductsClientProps) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(() =>
    getInitialCategory(searchParams.get("category"))
  );
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.color.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesAvailability =
        availability === "all" || product.availability === availability;

      return matchesSearch && matchesCategory && matchesAvailability;
    });

    if (sort === "price-low-high") {
      return [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high-low") {
      return [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      return [...result].sort(
        (a, b) => Number(b.isNewArrival) - Number(a.isNewArrival)
      );
    }

    return sortFeaturedProducts(result);
  }, [availability, category, products, search, sort]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMoreProducts = visibleCount < filteredProducts.length;

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [availability, category, search, sort]);

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setAvailability("all");
    setSort("featured");
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

  return (
    <div>
      <div className="mb-5 rounded-[1.4rem] border border-warm-border bg-[#FFFDF9] p-4 shadow-[0_10px_35px_rgba(47,33,24,0.04)] md:hidden">
        <ShopSearchInput value={search} onChange={setSearch} />

        <div className="relative mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-deep-brown"
          >
            Filters

            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-warm-border bg-soft-white">
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.7} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSortOpen((current) => !current)}
            className="inline-flex items-center gap-2 text-sm text-deep-brown"
          >
            <span className="font-semibold">Sort:</span>

            <span className="border-b border-muted-gold pb-0.5 text-soft-brown">
              {getSortLabel(sort)}⌄
            </span>
          </button>

          {sortOpen ? (
            <div className="absolute right-0 top-12 z-30 w-52 overflow-hidden rounded-2xl border border-warm-border bg-soft-white shadow-[0_18px_50px_rgba(47,33,24,0.16)]">
              {sortOptions.map((option) => {
                const isSelected = sort === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSortChange(option.value)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
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

        <div className="mt-4 flex items-center justify-between border-t border-warm-border pt-4">
          <p className="text-xs text-soft-brown">
            Showing{" "}
            <span className="font-semibold text-deep-brown">
              {showingCount}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-deep-brown">
              {filteredProducts.length}
            </span>
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="text-[10px] font-semibold tracking-[0.16em] text-muted-gold uppercase"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mb-6 hidden rounded-[1.5rem] border border-warm-border bg-[#FFFDF9] p-5 shadow-[0_12px_40px_rgba(47,33,24,0.045)] md:block lg:p-6">
        <div className="grid items-end gap-5 md:grid-cols-[1.45fr_1fr_1fr_1fr] lg:gap-6">
          <ShopSearchInput value={search} onChange={setSearch} />

          <ShopFilterSelect
            label="Category"
            value={category}
            options={categoryOptions}
            onChange={setCategory}
          />

          <ShopFilterSelect
            label="Availability"
            value={availability}
            options={availabilityOptions}
            onChange={setAvailability}
          />

          <ShopFilterSelect
            label="Sort"
            value={sort}
            options={sortOptions}
            onChange={setSort}
          />
        </div>

        <div className="mt-1 flex items-center justify-between border-warm-border pt-4">
          <p className="text-sm text-soft-brown">
            Showing{" "}
            <span className="font-medium text-deep-brown">{showingCount}</span>{" "}
            of{" "}
            <span className="font-medium text-deep-brown">
              {filteredProducts.length}
            </span>{" "}
            pieces
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="text-[11px] font-semibold tracking-[0.17em] text-muted-gold uppercase transition hover:text-deep-brown"
          >
            Clear Filters
          </button>
        </div>
      </div>

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
      />

      {filteredProducts.length > 0 ? (
        <>
          <ProductGrid products={visibleProducts} />

          {hasMoreProducts ? (
            <div className="mt-10 flex flex-col items-center sm:mt-12">
              <p className="mb-4 text-xs tracking-[0.12em] text-soft-brown uppercase">
                Showing {showingCount} of {filteredProducts.length} pieces
              </p>

              <button
                type="button"
                onClick={loadMoreProducts}
                className="inline-flex h-12 items-center justify-center rounded-full border border-warm-border bg-soft-white px-9 text-xs font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
              >
                Load More
              </button>
            </div>
          ) : null}
        </>
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