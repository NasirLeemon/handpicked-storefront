import { NextResponse } from "next/server";

import { getInventoryProductsForStorefront } from "@/lib/supabase/inventory-products";

export const dynamic = "force-dynamic";

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get("q")?.trim() ?? "";
  const query = normalize(rawQuery);

  if (query.length < 2) {
    return NextResponse.json(
      { results: [] },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const products =
    await getInventoryProductsForStorefront();

  const results = products
    .map((product) => {
      const name = normalize(product.name);
      const category = normalize(product.category);
      const description = normalize(
        product.description ?? "",
      );

      let score = 0;

      if (name === query) {
        score = 100;
      } else if (name.startsWith(query)) {
        score = 90;
      } else if (name.includes(query)) {
        score = 75;
      } else if (category.includes(query)) {
        score = 35;
      } else if (description.includes(query)) {
        score = 15;
      }

      return {
        product,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.product.name.localeCompare(
        b.product.name,
      );
    })
    .slice(0, 6)
    .map(({ product }) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.images[0] ?? null,
      availability: product.availability,
    }));

  return NextResponse.json(
    { results },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
