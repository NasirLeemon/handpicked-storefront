"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, X } from "lucide-react";

type AddedToCartPanelProps = {
  productName: string;
  quantity: number;
  price: number;
  onClose: () => void;
};

export function AddedToCartPanel({
  productName,
  quantity,
  price,
  onClose,
}: AddedToCartPanelProps) {
  const [mounted, setMounted] = useState(false);
  const onCloseRef = useRef(onClose);

  const total = price * quantity;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    setMounted(true);

    const timer = window.setTimeout(() => {
      onCloseRef.current();
    }, 10000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-x-0 bottom-0 z-[100] p-2 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[370px]">
      <div className="border border-warm-border bg-[#FFFDF9] shadow-[0_22px_65px_rgba(47,33,24,0.22)]">
        <div className="h-[3px] w-full overflow-hidden bg-[#E6EFE5]">
          <div
            className="h-full bg-[#66A96F]"
            style={{
              animation: "handpicked-cart-countdown 10s linear forwards",
            }}
          />
        </div>

        <div className="p-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#EEF5EC] text-[#4F7652]">
                <CheckCircle2
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-[#4F7652] uppercase">
                  Added to cart
                </p>

                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-deep-brown">
                  {productName}
                </p>

                <p className="mt-1 text-[11px] text-soft-brown">
                  Qty {quantity} · ৳{total.toLocaleString()}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCloseRef.current()}
              className="flex h-7 w-7 shrink-0 items-center justify-center text-taupe transition hover:text-deep-brown"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onCloseRef.current()}
              className="inline-flex h-9 items-center justify-center whitespace-nowrap border border-warm-border bg-white px-3 text-[10px] font-semibold tracking-[0.06em] text-deep-brown uppercase transition hover:border-muted-gold"
            >
              Keep Shopping
            </button>

            <Link
              href="/checkout"
              className="inline-flex h-9 items-center justify-center bg-[#3F2A20] px-3 text-[10px] font-semibold tracking-[0.1em] !text-white uppercase transition hover:bg-[#5B4435]"
            >
              Checkout
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes handpicked-cart-countdown {
            from {
              width: 100%;
            }

            to {
              width: 0%;
            }
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
}
