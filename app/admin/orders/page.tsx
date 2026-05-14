import { ClearOrdersButton, OrderActions } from "@/components/admin/order-actions";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { CartItem } from "@/types/cart";

type OrderRow = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  note: string | null;
  items: CartItem[];
  subtotal: number;
  status: string;
  created_at: string;
};

async function getOrders() {
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as OrderRow[];
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-ivory px-4 py-8 text-deep-brown sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
              Admin
            </p>

            <h1 className="mt-2 font-serif-brand text-5xl font-medium tracking-[-0.04em] text-deep-brown">
              Orders
            </h1>

            <p className="mt-3 text-sm leading-6 text-soft-brown">
              Review customer order requests submitted from checkout.
            </p>
          </div>

          {orders.length > 0 ? <ClearOrdersButton /> : null}
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[1.5rem] border border-warm-border bg-soft-white p-6 shadow-sm">
            <p className="text-sm text-soft-brown">No orders yet.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 border-b border-warm-border pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.22em] text-muted-gold uppercase">
                      {order.status}
                    </p>

                    <h2 className="mt-2 font-serif-brand text-3xl font-medium text-deep-brown">
                      {order.customer_name}
                    </h2>

                    <p className="mt-2 text-sm text-soft-brown">
                      Phone: {order.phone}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-soft-brown">
                      Address: {order.address}
                    </p>

                    {order.note ? (
                      <p className="mt-1 text-sm leading-6 text-soft-brown">
                        Note: {order.note}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-soft-brown">
                      {new Date(order.created_at).toLocaleString()}
                    </p>

                    <p className="mt-2 text-xl font-semibold text-deep-brown">
                      ৳ {Number(order.subtotal || 0).toLocaleString()}+
                    </p>

                    <div className="mt-3">
                      <OrderActions orderId={order.id} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.slug}-${item.size}-${index}`}
                      className="rounded-[1rem] border border-warm-border bg-ivory p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-deep-brown">
                            {item.name}
                          </p>

                          <p className="mt-1 text-sm text-soft-brown">
                            Size: {item.size} · Color: {item.color} · Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-deep-brown">
                          ৳{" "}
                          {(
                            Number(item.price || 0) * Number(item.quantity || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
