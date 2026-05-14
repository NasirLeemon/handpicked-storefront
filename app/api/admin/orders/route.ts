import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

type DeleteOrderBody = {
  adminPassword?: string;
  orderId?: string;
  clearAll?: boolean;
};

export async function DELETE(request: NextRequest) {
  try {
    const body = (await request.json()) as DeleteOrderBody;

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

    const supabaseAdmin = getSupabaseAdmin();

    if (body.clearAll) {
      const { error } = await supabaseAdmin
        .from("orders")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");

      if (error) {
        return NextResponse.json(
          { error: `Supabase error: ${error.message}` },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true });
    }

    if (!body.orderId) {
      return NextResponse.json(
        { error: "Missing order ID." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .delete()
      .eq("id", body.orderId);

    if (error) {
      return NextResponse.json(
        { error: `Supabase error: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete order.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
