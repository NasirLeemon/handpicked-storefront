"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { heroSlides } from "@/components/home/hero-carousel-data";

const slideInterval = 6000;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function showPreviousSlide() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? heroSlides.length - 1 : currentIndex - 1
    );
  }

  function showNextSlide() {
    setActiveIndex((currentIndex) =>
      currentIndex === heroSlides.length - 1 ? 0 : currentIndex + 1
    );
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      showNextSlide();
    }, slideInterval);

    return () => window.clearInterval(interval);
  }, []);

  const activeSlide = heroSlides[activeIndex];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.image}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{
            opacity: {
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
            scale: {
              duration: 7,
              ease: "linear",
            },
          }}
          className="absolute inset-0"
        >
          <Image
            src={activeSlide.image}
            alt={activeSlide.alt}
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-6 right-4 z-20 hidden rounded-full border border-white/25 bg-[#FFFDF9]/15 px-4 py-2 backdrop-blur-md sm:block"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-[#FFFDF9] uppercase">
            {activeSlide.label}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-4 z-20 flex gap-2 sm:left-auto sm:right-52">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              activeIndex === index
                ? "w-8 bg-[#FFFDF9]"
                : "w-3 bg-[#FFFDF9]/45 hover:bg-[#FFFDF9]/80"
            }`}
            aria-label={`Show ${slide.alt}`}
          />
        ))}
      </div>

      <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        <button
          type="button"
          onClick={showPreviousSlide}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#FFFDF9]/15 text-[#FFFDF9] backdrop-blur-md transition hover:bg-[#FFFDF9]/25"
          aria-label="Previous hero image"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.6} />
        </button>

        <button
          type="button"
          onClick={showNextSlide}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#FFFDF9]/15 text-[#FFFDF9] backdrop-blur-md transition hover:bg-[#FFFDF9]/25"
          aria-label="Next hero image"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>
    </>
  );
}
