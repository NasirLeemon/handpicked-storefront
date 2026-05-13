import { ContactCard } from "@/components/contact/contact-card";

export function ContactPageContent() {
  return (
    <div className="min-h-screen bg-ivory px-4 py-8 text-deep-brown sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="text-center">
          <p className="text-[10px] font-semibold tracking-[0.26em] text-muted-gold uppercase sm:text-xs">
            Contact
          </p>

          <h1 className="mt-2 font-serif-brand text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-deep-brown sm:text-6xl">
            We’re Here to Help
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-soft-brown sm:text-base sm:leading-7">
            Message us for size, color, availability, delivery, or payment
            support before placing your order.
          </p>
        </section>

        <div className="mt-8">
          <ContactCard />
        </div>
      </div>
    </div>
  );
}
