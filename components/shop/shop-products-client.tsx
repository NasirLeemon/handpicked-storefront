"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { ShopFilterSelect } from "@/components/shop/shop-filter-select";
import { ShopSearchInput } from "@/components/shop/shop-search-input";
import type { Product } from "@/types/product";

type ShopProductsClientProps = {
  products: Product[];
};

const categoryOptions = [
  { label: "All Categories", value: "all" },
  { label: "Co-ords", value: "Co-ords" },
  { label: "Ethnic", value: "Ethnic" },
  { label: "Tops", value: "Tops" },
  { label: "Accessories", value: "Accessories" },
  { label: "Beauty", value: "Beauty" },
];

const availabilityOptions = [
  { label: "All Availability", value: "all" },
  { label: "Available", value: "available" },
  { label: "Low Stock", value: "low-stock" },
  { label: "Sold Out", value: "sold-out" },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low-high" },
  { label: "Price: High to Low", value: "price-high-low" },
];

function getInitialCategory(categoryParam: string | null) {
  const validCategory = categoryOptions.some(
    (option) => option.value === categoryParam
  );

  return validCategory && categoryParam ? categoryParam : "all";
}

export function ShopProductsClient({ products }: ShopProductsClientProps) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(() =>
    getInitialCategory(searchParams.get("category"))
  );
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("featured");

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
  }

  return (
    <div>
      <div className="mb-8 rounded-[1.75rem] border border-warm-border bg-soft-white p-5">
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
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

      <div className="mb-8 flex items-center justify-between gap-4 border-y border-warm-border py-5">
        <p className="text-sm text-soft-brown">
          Showing{" "}
          <span className="font-medium text-deep-brown">
            {filteredProducts.length}
          </span>{" "}
          handpicked pieces
        </p>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-semibold tracking-[0.18em] text-muted-gold uppercase transition hover:text-deep-brown"
        >
          Clear Filters
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="rounded-[2rem] border border-warm-border bg-soft-white px-6 py-16 text-center">
          <h2 className="font-serif-brand text-4xl font-semibold text-deep-brown">
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
