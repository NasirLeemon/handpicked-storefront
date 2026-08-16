export function ShopPageHeader() {
  return (
    <section className="bg-ivory px-4 pb-3 pt-4 text-center sm:px-6 sm:pb-6 sm:pt-8 lg:px-8 lg:pb-7 lg:pt-9">
      <div className="mx-auto max-w-4xl">
        <p className="mb-1 text-[8px] font-semibold tracking-[0.24em] text-muted-gold uppercase sm:mb-1.5 sm:text-[10px] sm:tracking-[0.28em]">
          The Collection
        </p>

        <h1 className="font-serif-brand text-[2rem] font-medium leading-[0.98] tracking-[-0.04em] text-deep-brown sm:text-5xl lg:text-[3.4rem]">
          Shop the Collection
        </h1>

        <p className="mx-auto mt-1.5 max-w-[19rem] text-[0.72rem] leading-5 text-soft-brown sm:mt-2.5 sm:max-w-xl sm:text-[0.95rem] sm:leading-6">
          Explore thoughtfully selected pieces for effortless elegance and
          everyday boutique style.
        </p>
      </div>
    </section>
  );
}