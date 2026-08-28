import { ArrowUpRight, MessageCircle } from "lucide-react";

export function MessengerCtaSection() {
  return (
    <section className="bg-[#342319] text-[#FFFDF9]">
      <div className="grid w-full md:grid-cols-[1.15fr_0.85fr]">
        <div className="px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="flex items-center gap-3">
            <MessageCircle
              className="h-5 w-5 text-[#D8BE99]"
              strokeWidth={1.5}
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D8BE99]">
              Personal Support
            </p>
          </div>

          <h2 className="mt-5 max-w-3xl font-serif-brand text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Need help
            <span className="block italic text-[#D8BE99]">
              choosing?
            </span>
          </h2>
        </div>

        <div className="flex flex-col justify-center border-t border-white/15 px-6 py-10 sm:px-8 md:border-l md:border-t-0 lg:px-12">
          <p className="max-w-lg text-sm leading-7 text-white/65">
            Ask us about products, sizing, availability, delivery, or anything
            else before you order.
          </p>

          <a
            href="https://m.me/843144242224804"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex h-12 w-fit items-center justify-center gap-3 bg-[#FFFDF9] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] !text-[#342319] transition hover:bg-[#EADCC9]"
          >
            Message us
            <ArrowUpRight
              className="h-4 w-4"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
