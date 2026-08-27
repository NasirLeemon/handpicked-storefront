"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type SearchResult = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string | null;
  availability: string;
};

export function StorefrontSearch() {
  const router = useRouter();

  const containerRef =
    useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    SearchResult[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const normalizedQuery = query.trim();
  const showDropdown =
    focused && normalizedQuery.length >= 2;

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent,
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setFocused(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  useEffect(() => {
    if (normalizedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timeout = window.setTimeout(
      async () => {
        try {
          setLoading(true);

          const response = await fetch(
            `/api/storefront-search?q=${encodeURIComponent(
              normalizedQuery,
            )}`,
            {
              signal: controller.signal,
              cache: "no-store",
            },
          );

          if (!response.ok) {
            throw new Error(
              "Unable to search products.",
            );
          }

          const data = (await response.json()) as {
            results?: SearchResult[];
          };

          setResults(data.results ?? []);
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name === "AbortError"
          ) {
            return;
          }

          console.error(
            "STOREFRONT SEARCH ERROR",
            error,
          );

          setResults([]);
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
      },
      220,
    );

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [normalizedQuery]);

  function openAllResults() {
    if (!normalizedQuery) {
      return;
    }

    setFocused(false);

    router.push(
      `/shop?search=${encodeURIComponent(
        normalizedQuery,
      )}`,
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    openAllResults();
  }

  function clearSearch() {
    setQuery("");
    setResults([]);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      <form
        onSubmit={handleSubmit}
        role="search"
        className={`flex h-10 w-full items-center border bg-[#FAF6F0] transition ${
          focused
            ? "border-[#A9835E] bg-[#FFFDF9] shadow-[0_4px_18px_rgba(47,33,24,0.06)]"
            : "border-transparent"
        }`}
      >
        <span className="flex h-full items-center pl-3.5 text-soft-brown">
          <Search
            className="h-[17px] w-[17px]"
            strokeWidth={1.7}
          />
        </span>

        <input
          type="search"
          value={query}
          onFocus={() => setFocused(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setFocused(true);
          }}
          placeholder="Search products..."
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent px-3 text-[13px] text-deep-brown outline-none placeholder:text-taupe"
          aria-label="Search products"
        />

        {query ? (
          <button
            type="button"
            onClick={clearSearch}
            className="flex h-10 w-10 items-center justify-center text-taupe transition hover:text-deep-brown"
            aria-label="Clear search"
          >
            <X
              className="h-4 w-4"
              strokeWidth={1.7}
            />
          </button>
        ) : null}
      </form>

      {showDropdown ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[10020] overflow-hidden border border-warm-border bg-[#FFFDF9] shadow-[0_20px_50px_rgba(47,33,24,0.14)]">
          {loading ? (
            <div className="px-4 py-5 text-center">
              <p className="text-xs text-soft-brown">
                Searching...
              </p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="divide-y divide-warm-border/70">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() =>
                      setFocused(false)
                    }
                    className="group flex items-center gap-3 px-3 py-3 transition hover:bg-[#F8F2EA]"
                  >
                    <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-white">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-gold">
                        {product.category}
                      </p>

                      <p className="mt-0.5 truncate text-xs font-medium text-deep-brown group-hover:text-muted-gold">
                        {product.name}
                      </p>
                    </div>

                    <p className="shrink-0 text-xs font-semibold text-deep-brown">
                      ৳
                      {Number(
                        product.price,
                      ).toLocaleString("en-US")}
                    </p>
                  </Link>
                ))}
              </div>

              <button
                type="button"
                onClick={openAllResults}
                className="flex h-11 w-full items-center justify-center border-t border-warm-border bg-[#F8F2EA] text-[9px] font-semibold uppercase tracking-[0.18em] text-deep-brown transition hover:bg-[#F0E5D7]"
              >
                View all results for “
                {normalizedQuery}”
              </button>
            </>
          ) : (
            <div className="px-4 py-5 text-center">
              <p className="text-xs font-medium text-deep-brown">
                No products found
              </p>

              <p className="mt-1 text-[10px] text-soft-brown">
                Try another product name or brand.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
