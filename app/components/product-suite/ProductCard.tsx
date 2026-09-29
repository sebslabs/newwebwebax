"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PREMIUM_EASE } from "../motion/ScrollReveal";

interface ProductCardProps {
  title: string;
  logoSrc?: string;
  description: string;
  href?: string;
  badge?: string;
  index?: number;
  children: ReactNode;
}

export default function ProductCard({
  title,
  logoSrc,
  description,
  href,
  index = 0,
  children,
}: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: PREMIUM_EASE,
      }}
      className="group relative rounded-2xl bg-white border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.11)] hover:-translate-y-1.5 transition-all duration-350 p-4 sm:p-7 flex flex-col justify-between overflow-hidden min-h-0 sm:min-h-[550px] cursor-default"
      style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
    >
      {/* Subtle ambient aura — brightens on hover */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-zinc-100/50 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {/* Lime accent glow on hover */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[#f1ff5c]/0 group-hover:bg-[#f1ff5c]/12 blur-3xl transition-all duration-500 pointer-events-none" />

      {/* TOP: Product Header */}
      <div className="relative z-10 mb-4 sm:mb-5">
        <div className="flex items-center justify-between mb-2 min-h-[36px]">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={title}
              className="h-6 sm:h-8 max-w-[160px] sm:max-w-[210px] w-auto object-contain object-left select-none"
            />
          ) : (
            <h3 className="text-xl sm:text-2xl font-semibold font-sora text-zinc-950">
              {title}
            </h3>
          )}

          {/* Diagonal arrow */}
          <a
            href={href || `#${title.toLowerCase()}`}
            aria-label={`Learn more about ${title}`}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-50 border border-zinc-200/90 flex items-center justify-center text-zinc-400 group-hover:text-zinc-950 group-hover:bg-[#f1ff5c] group-hover:border-yellow-300/80 transition-all duration-300 shrink-0 cursor-pointer shadow-2xs"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
            </svg>
          </a>
        </div>
        <p className="text-xs sm:text-[15px] text-zinc-500 group-hover:text-zinc-700 leading-relaxed font-normal font-manrope min-h-0 sm:min-h-[42px] max-w-lg transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* CENTER / BOTTOM: Visual Demo */}
      <div className="relative z-10 w-full h-[320px] sm:h-[370px] rounded-xl bg-[#fafafc] border border-zinc-200/60 group-hover:border-zinc-200/90 p-1.5 sm:p-2 shadow-2xs overflow-hidden flex flex-col mt-auto transition-colors duration-300">
        {children}
      </div>
    </motion.div>
  );
}
