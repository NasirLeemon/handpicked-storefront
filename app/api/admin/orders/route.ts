import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

type DeleteOrderBody = {
  adminPassword?: string;
  orderId?: string;
  clearAll?: boolean;
};

type UpdateOrderBody = {
  adminPassword?: string;
  orderId?: string;
  status?: string;
};

const allowedStatuses = ["new", "contacted", "confirmed", "delivered", "cancelled"];

function isAllowedStatus(status: string) {
  return allowedStatuses.includes(status);
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as UpdateOrderBody;

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

    if (!body.orderId || !body.status) {
      return NextResponse.json(
        { error: "Missing order ID or status." },
        { status: 400 }
      );
    }

    if (!isAllowedStatus(body.status)) {
      return NextResponse.json(
        { error: "Invalid order status." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status: body.status })
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
      error instanceof Error ? error.message : "Failed to update order.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

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
