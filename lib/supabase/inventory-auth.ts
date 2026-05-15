"use client";

import { createClient } from "@supabase/supabase-js";

export function getInventoryAuthClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_INVENTORY_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_INVENTORY_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_INVENTORY_SUPABASE_URL");
  }

  if (!publishableKey) {
    throw new Error("Missing NEXT_PUBLIC_INVENTORY_SUPABASE_PUBLISHABLE_KEY");
  }

  return createClient(supabaseUrl, publishableKey);
}
