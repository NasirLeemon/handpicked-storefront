import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type CreateProductBody = {
  adminPassword?: string;
  name?: string;
  slug?: string;
  price?: number;
  category?: string;
  description?: string;
  details?: string;
  images?: string[];
  color?: string;
  sizes?: string[];
  availability?: string;
  featured?: boolean;
  isNewArrival?: boolean;
};

function cleanSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidAvailability(value: string) {
  return ["available", "low-stock", "sold-out"].includes(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateProductBody;

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Missing ADMIN_PASSWORD on server." },
        { status: 500 }
      );
    }

    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid admin password." },
        { status: 401 }
      );
    }

    const name = body.name?.trim();
    const slug = cleanSlug(body.slug || body.name || "");
    const price = Number(body.price || 0);
    const category = body.category?.trim();
    const description = body.description?.trim();
    const details = body.details?.trim() || null;
    const color = body.color?.trim();
    const images = Array.isArray(body.images)
      ? body.images.map((image) => image.trim()).filter(Boolean)
      : [];
    const sizes = Array.isArray(body.sizes)
      ? body.sizes.map((size) => size.trim()).filter(Boolean)
      : [];
    const availability = body.availability || "available";

    if (!name || !slug || !category || !description || !color) {
      return NextResponse.json(
        { error: "Missing required product fields." },
        { status: 400 }
      );
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        { error: "Price must be greater than 0." },
        { status: 400 }
      );
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: "At least one image URL is required." },
        { status: 400 }
      );
    }

    if (sizes.length === 0) {
      return NextResponse.json(
        { error: "At least one size is required." },
        { status: 400 }
      );
    }

    if (!isValidAvailability(availability)) {
      return NextResponse.json(
        { error: "Invalid availability value." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .insert({
        name,
        slug,
        price,
        category,
        description,
        details,
        images,
        color,
        sizes,
        availability,
        featured: Boolean(body.featured),
        is_new_arrival: Boolean(body.isNewArrival),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ product: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while creating the product." },
      { status: 500 }
    );
  }
}
