import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-warm-border bg-soft-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <h2 className="font-serif-brand text-3xl font-semibold text-deep-brown">
            Handpicked
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-soft-brown">
            Curated boutique clothing for graceful everyday style, thoughtfully
            selected with elegance, comfort, and charm.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.22em] text-deep-brown uppercase">
            Shop
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-soft-brown">
            <Link href="/shop" className="transition hover:text-deep-brown">
              New Arrivals
            </Link>
            <Link href="/shop" className="transition hover:text-deep-brown">
              Dresses
            </Link>
            <Link href="/shop" className="transition hover:text-deep-brown">
              Tops
            </Link>
            <Link href="/shop" className="transition hover:text-deep-brown">
              Co-ords
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.22em] text-deep-brown uppercase">
            Support
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-soft-brown">
            <Link href="/contact" className="transition hover:text-deep-brown">
              Contact
            </Link>
            <Link href="/contact" className="transition hover:text-deep-brown">
              Messenger
            </Link>
            <Link href="/checkout" className="transition hover:text-deep-brown">
              Order Request
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.22em] text-deep-brown uppercase">
            Delivery Note
          </h3>
          <p className="mt-5 text-sm leading-7 text-soft-brown">
            For orders outside Dhaka, advance payment is required before
            dispatch. Our team will confirm details after your order request.
          </p>
        </div>
      </div>

      <div className="border-t border-warm-border px-4 py-5 text-center text-xs tracking-[0.16em] text-taupe uppercase">
        © Handpicked. All rights reserved.
      </div>
    </footer>
  );
}