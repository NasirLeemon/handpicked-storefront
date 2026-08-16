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

function getCategoryOptions(products: Product[]) {
  const categories = Array.from(
    new Set(
      products
        .map((product) => product.category.trim())
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

export function ShopProductsClient({
  products,
}: ShopProductsClientProps) {
  const searchParams = useSearchParams();

  const categoryOptions = useMemo(
    () => getCategoryOptions(products),
    [products]
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(() =>
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

  return (
    <div>
      <div className="mb-4 md:hidden">
        <ShopSearchInput value={search} onChange={setSearch} />

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-warm-border bg-[#FFFDF9] px-3 text-[11px] font-medium text-deep-brown"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.7} />
            Category
          </button>

          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex h-8 shrink-0 items-center rounded-full border border-warm-border bg-[#FFFDF9] px-3 text-[11px] font-medium text-deep-brown"
          >
            Availability
          </button>

          <div className="relative col-span-2">
            <button
              type="button"
              onClick={() => setSortOpen((current) => !current)}
              className="inline-flex h-8 w-full items-center justify-between rounded-full border border-warm-border bg-[#FFFDF9] px-3 text-[11px] font-medium text-deep-brown"
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

        <div className="mt-2 flex items-center justify-between px-0.5">
          <p className="text-[10px] text-soft-brown">
            <span className="font-medium text-deep-brown">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          {(search || category !== "all" || availability !== "all" || sort !== "newest") ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[9px] font-semibold tracking-[0.12em] text-muted-gold uppercase"
            >
              Clear
            </button>
          ) : null}
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