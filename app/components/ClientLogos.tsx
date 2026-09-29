"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, PREMIUM_EASE } from "./motion/ScrollReveal";

interface ClientBrand {
  name: string;
  src?: string;
  svg?: React.ReactNode;
  heightClass: string;
}

const BRAND_LOGOS: ClientBrand[] = [
  {
    name: "Amazon",
    src: "/logos/amazon.svg",
    heightClass: "h-5 sm:h-6",
  },
  {
    name: "Google",
    src: "/logos/google.svg",
    heightClass: "h-5 sm:h-6",
  },
  {
    name: "Shopify",
    src: "/logos/shopify.svg",
    heightClass: "h-5 sm:h-6",
  },
  {
    name: "NVIDIA",
    src: "/logos/nvidia.svg",
    heightClass: "h-4.5 sm:h-5.5",
  },
  {
    name: "Ford",
    src: "/logos/ford.svg",
    heightClass: "h-5.5 sm:h-7",
  },
  {
    name: "Coinbase",
    src: "/logos/coinbase.svg",
    heightClass: "h-4 sm:h-5",
  },
  {
    name: "Mindbody",
    src: "/logos/mindbody.svg",
    heightClass: "h-4 sm:h-5",
  },
  {
    name: "WooCommerce",
    svg: (
      <svg viewBox="0 0 160 36" className="h-5 sm:h-6 w-auto" fill="currentColor">
        <text x="0" y="27" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize="22" letterSpacing="-0.5">WOOCOMMERCE</text>
      </svg>
    ),
    heightClass: "h-5 sm:h-6",
  },
  {
    name: "Magento",
    svg: (
      <svg viewBox="0 0 130 36" className="h-5 sm:h-6 w-auto" fill="currentColor">
        <text x="0" y="27" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="24" letterSpacing="0.5">magento</text>
      </svg>
    ),
    heightClass: "h-5 sm:h-6",
  },
  {
    name: "OpenCart",
    svg: (
      <svg viewBox="0 0 130 36" className="h-5 sm:h-6 w-auto" fill="currentColor">
        <text x="0" y="27" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="23" letterSpacing="0.3">opencart</text>
      </svg>
    ),
    heightClass: "h-5 sm:h-6",
  },
];

const SET_A = [...BRAND_LOGOS, ...BRAND_LOGOS];
const SET_B = [...BRAND_LOGOS, ...BRAND_LOGOS];

export default function ClientLogos() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full py-5 sm:py-7 bg-[#f4faff] border-b border-zinc-200/50 overflow-hidden flex flex-col justify-center">
      {/* Scroll Reveal Label */}
      <ScrollReveal amount={0.2} duration={0.6} yOffset={20}>
        <p className="text-center text-[10px] sm:text-[11px] font-semibold text-zinc-400 font-space uppercase tracking-[0.14em] mb-4 sm:mb-5 px-4">
          Trusted by 40,000+ businesses &amp; global platforms
        </p>
      </ScrollReveal>

      {/* Side vignette fades */}
      <div className="pointer-events-none absolute left-0 top-10 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#f4faff] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-10 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#f4faff] to-transparent z-10" />

      {/* Infinite Scrolling Marquee Track */}
      <ScrollReveal amount={0.15} duration={0.75} yOffset={24}>
        <div className="w-full flex overflow-hidden select-none">
          <motion.div
            className="flex items-center will-change-transform"
            animate={
              mounted && shouldReduceMotion
                ? { x: "0%" }
                : { x: ["0%", "-50%"] }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 34,
                ease: "linear",
              },
            }}
          >
            {/* Set A */}
            <div className="flex items-center shrink-0 gap-8 sm:gap-16 md:gap-20 pr-8 sm:pr-16 md:pr-20">
              {SET_A.map((brand, idx) => (
                <div
                  key={`a-${brand.name}-${idx}`}
                  className="flex items-center justify-center h-8 sm:h-10 transition-all duration-300 ease-out grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 cursor-default"
                  title={brand.name}
                >
                  {brand.src ? (
                    <img
                      src={brand.src}
                      alt={brand.name}
                      className={`${brand.heightClass} w-auto object-contain max-w-none select-none`}
                      loading="eager"
                    />
                  ) : (
                    brand.svg
                  )}
                </div>
              ))}
            </div>

            {/* Set B (Mirror for infinite loop) */}
            <div
              aria-hidden="true"
              className="flex items-center shrink-0 gap-8 sm:gap-16 md:gap-20 pr-8 sm:pr-16 md:pr-20"
            >
              {SET_B.map((brand, idx) => (
                <div
                  key={`b-${brand.name}-${idx}`}
                  className="flex items-center justify-center h-8 sm:h-10 transition-all duration-300 ease-out grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 cursor-default"
                  title={brand.name}
                >
                  {brand.src ? (
                    <img
                      src={brand.src}
                      alt={brand.name}
                      className={`${brand.heightClass} w-auto object-contain max-w-none select-none`}
                      loading="eager"
                    />
                  ) : (
                    brand.svg
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
