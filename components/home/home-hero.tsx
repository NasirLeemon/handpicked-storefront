"use client";

import { motion } from "framer-motion";
import { BoutiqueButton } from "@/components/common/boutique-button";
import { HeroCarousel } from "@/components/home/hero-carousel";

export function HomeHero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-deep-brown sm:min-h-[86vh] lg:min-h-[calc(100vh-112px)]">
      <HeroCarousel />

      <div className="absolute inset-0 bg-gradient-to-r from-[#2F2118]/84 via-[#2F2118]/42 to-[#2F2118]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2F2118]/56 via-transparent to-[#2F2118]/12" />

      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-14 sm:min-h-[86vh] sm:px-6 lg:min-h-[calc(100vh-112px)] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-5 text-xs font-semibold tracking-[0.34em] text-soft-gold uppercase"
          >
            New Season Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif-brand text-[3.6rem] font-medium leading-[0.88] tracking-[-0.055em] text-[#FFFDF9] sm:text-[6.5rem] lg:text-[8rem]"
          >
            Modern
            <span className="block italic text-[#E8DCCB]">grace</span>
            in every piece
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 max-w-xl text-base leading-8 text-[#FFFDF9]/82 sm:text-lg"
          >
            A curated collection of clothing, beauty, and accessories selected
            for soft elegance, refined details, and effortless everyday styling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <BoutiqueButton href="/shop">Shop New Arrivals</BoutiqueButton>

            <BoutiqueButton href="/shop?category=Ethnic" variant="secondary">
              Explore Collection
            </BoutiqueButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-6 left-4 right-4 z-10 mx-auto hidden max-w-7xl items-end justify-between border-t border-white/20 pt-5 text-[#FFFDF9] md:flex"
      >
        <HeroMeta label="Collection" value="Handpicked edit" />
        <HeroMeta label="Products" value="15 curated pieces" />
        <HeroMeta label="Delivery" value="Dhaka + outside Dhaka" />
      </motion.div>
    </section>
  );
}

type HeroMetaProps = {
  label: string;
  value: string;
};

function HeroMeta({ label, value }: HeroMetaProps) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.24em] text-soft-gold uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm text-[#FFFDF9]/82">{value}</p>
    </div>
  );
}
