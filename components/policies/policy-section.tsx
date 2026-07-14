import type { ReactNode } from "react";

type PolicySectionProps = {
  title: string;
  children: ReactNode;
};

export function PolicySection({
  title,
  children,
}: PolicySectionProps) {
  return (
    <section className="rounded-[1.5rem] border border-warm-border bg-[#FFFDF9] p-5 shadow-[0_12px_36px_rgba(47,33,24,0.045)] sm:p-7">
      <h2 className="font-serif-brand text-2xl font-medium text-deep-brown sm:text-3xl">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-sm leading-7 text-soft-brown sm:text-[0.95rem]">
        {children}
      </div>
    </section>
  );
}