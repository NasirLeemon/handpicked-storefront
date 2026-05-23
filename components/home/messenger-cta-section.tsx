import { MessageCircle } from "lucide-react";

export function MessengerCtaSection() {
  return (
    <section className="bg-soft-white px-4 py-9 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.065)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

          <div className="relative px-5 py-5 text-center sm:px-8">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
              <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
            </div>

            <p className="mt-5 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
              Personal Support
            </p>

            <h2 className="mt-2 font-serif-brand text-4xl font-medium tracking-[-0.045em] text-deep-brown sm:text-5xl">
              Need help choosing?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-soft-brown">
              Message us for size guidance, product availability, delivery
              questions, or styling help.
            </p>

            <a
              href="https://m.me/843144242224804"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-11 items-center justify-center gap-3 rounded-full bg-[#3F2A20] px-7 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-[0_14px_30px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435]"
            >
              Message on Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
