"use client";

import { motion } from "framer-motion";
import { BoutiqueButton } from "@/components/common/boutique-button";
import { HeroCarousel } from "@/components/home/hero-carousel";

export function HomeHero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-deep-brown sm:min-h-[86vh] lg:min-h-[calc(100vh-112px)]">
      <HeroCarousel />

      <div className="absolute inset-0 bg-gradient-to-r from-[#2F2118]/70 via-[#2F2118]/32 to-[#2F2118]/6" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2F2118]/48 via-transparent to-[#2F2118]/8" />

      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-14 sm:min-h-[86vh] sm:px-6 lg:min-h-[calc(100vh-112px)] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-4 text-[10px] font-semibold tracking-[0.32em] text-soft-gold uppercase sm:text-xs"
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
            className="font-serif-brand text-[3.1rem] font-medium leading-[0.9] tracking-[-0.055em] text-[#FFFDF9] sm:text-[5.4rem] lg:text-[6.7rem]"
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
            className="mt-5 max-w-xl text-sm leading-7 text-[#FFFDF9]/84 sm:text-base sm:leading-8"
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
            className="mt-7 flex flex-row flex-wrap gap-3"
          >
            <BoutiqueButton href="/shop">Shop New Arrivals</BoutiqueButton>

            <BoutiqueButton href="/shop?category=Ethnic" variant="secondary">
              Explore Collection
            </BoutiqueButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.62,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 hidden max-w-xl grid-cols-3 gap-3 border-t border-white/18 pt-5 text-[#FFFDF9] md:grid"
          >
            <HeroMeta label="Edit" value="Curated pieces" />
            <HeroMeta label="Style" value="Soft elegance" />
            <HeroMeta label="Delivery" value="Bangladesh" />
          </motion.div>
        </motion.div>
      </div>
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
      <p className="text-[10px] font-semibold tracking-[0.22em] text-soft-gold uppercase">
        {label}
      </p>
      <p className="mt-1.5 text-xs text-[#FFFDF9]/82">{value}</p>
    </div>
  );
}
