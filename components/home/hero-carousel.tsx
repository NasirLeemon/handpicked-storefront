"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/components/home/hero-carousel-data";

const SLIDE_INTERVAL = 6000;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasChangedSlide = useRef(false);

  function changeSlide(nextIndex: number) {
    hasChangedSlide.current = true;
    setActiveIndex(nextIndex);
  }

  function showPreviousSlide() {
    changeSlide(
      activeIndex === 0 ? heroSlides.length - 1 : activeIndex - 1
    );
  }

  function showNextSlide() {
    changeSlide(
      activeIndex === heroSlides.length - 1 ? 0 : activeIndex + 1
    );
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      hasChangedSlide.current = true;

      setActiveIndex((currentIndex) =>
        currentIndex === heroSlides.length - 1 ? 0 : currentIndex + 1
      );
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSlide = heroSlides[activeIndex];

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeSlide.alt}
            className="absolute inset-0"
            initial={
              hasChangedSlide.current
                ? { opacity: 0, scale: 1.025 }
                : false
            }
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              },
              scale: {
                duration: 7,
                ease: "linear",
              },
            }}
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.alt}
              fill
              preload={activeIndex === 0}
              placeholder="blur"
              sizes="100vw"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45 }}
          className="absolute bottom-6 right-4 z-20 hidden rounded-full border border-white/25 bg-[#FFFDF9]/15 px-4 py-2 backdrop-blur-md sm:block"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-[#FFFDF9] uppercase">
            {activeSlide.label}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-4 z-20 flex items-center gap-1 sm:left-auto sm:right-52">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.alt}
            type="button"
            onClick={() => changeSlide(index)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/10"
            aria-label={`Show ${slide.alt}`}
            aria-current={activeIndex === index ? "true" : undefined}
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? "w-8 bg-[#FFFDF9]"
                  : "w-3 bg-[#FFFDF9]/45"
              }`}
            />
          </button>
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