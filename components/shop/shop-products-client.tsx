"use client";

import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MobileFilterDrawer } from "@/components/shop/mobile-filter-drawer";
import { ProductGrid } from "@/components/product/product-grid";
import { ShopFilterSelect } from "@/components/shop/shop-filter-select";
import { ShopSearchInput } from "@/components/shop/shop-search-input";
import type { Product } from "@/types/product";

type ShopProductsClientProps = {
  products: Product[];
};

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

function getInitialCategory(categoryParam: string | null) {
  const validCategory = categoryOptions.some(
    (option) => option.value === categoryParam
  );

  return validCategory && categoryParam ? categoryParam : "all";
}

function getSortLabel(value: string) {
  return (
    sortOptions.find((option) => option.value === value)?.label ?? "Featured"
  );
}

export function ShopProductsClient({ products }: ShopProductsClientProps) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(() =>
    getInitialCategory(searchParams.get("category"))
  );
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.color.toLowerCase().includes(normalizedSearch);

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

    return [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [availability, category, products, search, sort]);

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setAvailability("all");
    setSort("featured");
    setFiltersOpen(false);
    setSortOpen(false);
  }

  function handleSortChange(value: string) {
    setSort(value);
    setSortOpen(false);
  }

  return (
    <div>
      <div className="mb-5 md:hidden">
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

        <p className="mt-5 text-xs font-medium tracking-[0.08em] text-deep-brown uppercase">
          {filteredProducts.length} results
        </p>
      </div>

      <div className="mb-8 hidden rounded-[1.75rem] border border-warm-border bg-soft-white px-5 py-4 md:block">
        <div className="grid items-end gap-4 md:grid-cols-[1.45fr_1fr_1fr_1fr]">
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
      </div>

      <div className="mb-5 hidden items-center justify-between gap-4 border-y border-warm-border py-5 md:flex">
        <p className="text-sm text-soft-brown">
          Showing{" "}
          <span className="font-medium text-deep-brown">
            {filteredProducts.length}
          </span>{" "}
          pieces
        </p>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-semibold tracking-[0.18em] text-muted-gold uppercase transition hover:text-deep-brown"
        >
          Clear Filters
        </button>
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
        <ProductGrid products={filteredProducts} />
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
