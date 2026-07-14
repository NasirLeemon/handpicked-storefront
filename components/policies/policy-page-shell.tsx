import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

type PolicyPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PolicyPageShell({
  eyebrow,
  title,
  description,
  children,
}: PolicyPageShellProps) {
  return (
    <main className="min-h-screen bg-ivory px-4 py-6 text-deep-brown sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-soft-brown uppercase transition hover:text-muted-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Handpicked
        </Link>

        <header className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] p-6 shadow-[0_16px_45px_rgba(47,33,24,0.055)] sm:p-9">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.14),transparent_35%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.7))]" />

          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <p className="mt-5 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
              {eyebrow}
            </p>

            <h1 className="mt-2 font-serif-brand text-4xl font-medium leading-tight tracking-[-0.035em] text-deep-brown sm:text-5xl">
              {title}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-soft-brown sm:text-base">
              {description}
            </p>

            <p className="mt-5 text-xs font-medium tracking-[0.12em] text-muted-gold uppercase">
              Last updated: 14 July 2026
            </p>
          </div>
        </header>

        <div className="mt-6 space-y-5">{children}</div>

        <aside className="mt-6 rounded-[1.5rem] border border-muted-gold/30 bg-light-sand p-5 text-sm leading-7 text-soft-brown sm:p-6">
          Questions about this policy? Contact us through our{" "}
          <Link
            href="/contact"
            className="font-semibold text-deep-brown underline decoration-muted-gold/50 underline-offset-4"
          >
            Contact page
          </Link>
          .
        </aside>
      </div>
    </main>
  );
}