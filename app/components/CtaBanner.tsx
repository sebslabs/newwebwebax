"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white text-zinc-900 font-sans relative overflow-hidden border-t border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Lime Yellow Homepage Banner Card (Brand Guidelines Page 24 & 27) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] sm:rounded-[32px] bg-gradient-to-r from-[#ebfa4c] via-[#f1ff5c] to-[#d4f932] text-zinc-950 overflow-hidden shadow-[0_25px_60px_-15px_rgba(235,250,76,0.32)] border border-yellow-300/50 min-h-0 sm:min-h-[460px] lg:min-h-[480px] flex items-center"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-radial from-white/35 to-transparent rounded-full pointer-events-none blur-3xl" />

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between">
            
            {/* Left Column: Content (Headline, Subtitle, Buttons) */}
            <div className="w-full lg:w-[46%] flex flex-col items-start text-left p-6 sm:p-12 lg:pl-16 lg:py-16 z-10">
              
              {/* Official Brand Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-sora text-[#22272D] leading-[1.16] mb-3 sm:mb-5 tracking-tight">
                {t.ctaTitle || "Start multiplying your business value today."}
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-zinc-900/85 leading-relaxed font-normal font-manrope mb-6 sm:mb-8 max-w-lg">
                {t.ctaSubtitle || "Join over 40,000 businesses across Sri Lanka using WEBXPAY to accept digital payments anywhere, anytime."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <a
                  href="https://dashboard.webxpay.com/register"
                  className="w-full sm:w-auto text-center px-8 py-3.5 rounded-full bg-[#22272D] hover:bg-zinc-950 text-white text-xs sm:text-sm font-semibold font-sora transition-all duration-200 shadow-md hover:scale-102 cursor-pointer"
                >
                  {t.getStartedNow || "Get Started Now"}
                </a>
                <a
                  href="#solutions"
                  className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#22272D] text-xs sm:text-sm font-semibold font-sora border border-black/10 transition-all duration-200 shadow-xs cursor-pointer"
                >
                  {t.exploreAllSolutions || "Explore all solutions"}
                </a>
              </div>

            </div>

            {/* Right Column: Tablet Preview Anchored Flush to Bottom-Right */}
            <div className="w-full lg:w-[54%] lg:absolute lg:right-0 lg:bottom-0 flex justify-end items-end pointer-events-none select-none mt-4 sm:mt-6 lg:mt-0">
              <div className="relative flex items-end justify-end">
                <img
                  src="/cta-dashboard.png"
                  alt="WEBXPAY Dashboard App"
                  className="h-[220px] sm:h-[360px] lg:h-[400px] w-auto max-w-[90vw] lg:max-w-none object-contain object-bottom-right drop-shadow-[0_28px_45px_rgba(0,0,0,0.35)] translate-x-0 sm:translate-x-5 sm:translate-y-4 lg:translate-x-6 lg:translate-y-4"
                />
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
