export function DeliveryAreaNotice() {
  return (
    <div className="rounded-2xl border border-muted-gold/40 bg-light-sand p-5">
      <p className="text-xs font-semibold tracking-[0.22em] text-muted-gold uppercase">
        Outside Dhaka Notice
      </p>

      <p className="mt-3 text-sm leading-7 text-soft-brown">
        For orders outside Dhaka, advance payment is required before dispatch.
        Our team will contact you with payment confirmation details after
        reviewing your order.
      </p>
    </div>
  );
}
