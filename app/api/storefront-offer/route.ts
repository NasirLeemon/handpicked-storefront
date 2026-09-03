import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type OfferRow = {
  id: string;
  name: string;
  discount_percent: number | string;
  starts_at: string | null;
  ends_at: string | null;
  applies_to_all_products: boolean;
};

function isLive(offer: OfferRow, now: number) {
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

export async function GET() {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_INVENTORY_SUPABASE_URL;

    const serviceRoleKey =
      process.env.INVENTORY_SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Inventory connection is unavailable.");
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    const { data, error } = await supabase
      .from("offers")
      .select(`
        id,
        name,
        discount_percent,
        starts_at,
        ends_at,
        applies_to_all_products
      `)
      .eq("is_active", true);

    if (error) {
      throw error;
    }

    const now = Date.now();

    const liveOffers = (
      (data ?? []) as OfferRow[]
    )
      .filter((offer) => isLive(offer, now))
      .map((offer) => ({
        ...offer,
        numericDiscount: Number(
          offer.discount_percent || 0,
        ),
      }))
      .filter(
        (offer) =>
          Number.isFinite(offer.numericDiscount) &&
          offer.numericDiscount > 0,
      )
      .sort(
        (a, b) =>
          b.numericDiscount - a.numericDiscount,
      );

    // Prefer a site-wide offer for the homepage banner.
    // If none exists, show the highest active selected-products offer.
    const winningOffer =
      liveOffers.find(
        (offer) => offer.applies_to_all_products,
      ) ??
      liveOffers[0] ??
      null;

    return NextResponse.json(
      {
        offer: winningOffer
          ? {
              id: winningOffer.id,
              name: winningOffer.name,
              discountPercent:
                winningOffer.numericDiscount,
              endsAt: winningOffer.ends_at,
              appliesToAllProducts:
                winningOffer.applies_to_all_products,
            }
          : null,
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error(
      "STOREFRONT OFFER ANNOUNCEMENT ERROR",
      error,
    );

    return NextResponse.json(
      { offer: null },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      },
    );
  }
}
