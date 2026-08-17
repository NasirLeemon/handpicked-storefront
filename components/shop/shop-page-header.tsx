export function ShopPageHeader() {
  return (
    <section className="bg-ivory px-4 pb-2 pt-3 text-center sm:px-6 sm:pb-6 sm:pt-8 lg:px-8 lg:pb-7 lg:pt-9">
      <div className="mx-auto max-w-4xl">
        <p className="hidden mb-1 text-[8px] font-semibold tracking-[0.24em] text-muted-gold uppercase sm:block sm:mb-1.5 sm:text-[10px] sm:tracking-[0.28em]">
          The Collection
        </p>

        <h1 className="font-serif-brand text-[1.75rem] font-medium leading-none tracking-[-0.04em] text-deep-brown sm:text-5xl lg:text-[3.4rem]">
          Shop the Collection
        </h1>

        <p className="mx-auto mt-1 max-w-[20rem] text-[0.68rem] leading-4 text-soft-brown sm:mt-2.5 sm:max-w-xl sm:text-[0.95rem] sm:leading-6">
          Discover thoughtfully selected pieces for everyday style.
        </p>
      </div>
    </section>
  );
}