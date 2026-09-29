"use client";

import React, { useEffect, useRef, useState } from "react";
import XGatewayLiveDashboard from "./xgateway/XGatewayLiveDashboard";
import XPOSLiveDashboard from "./xpos/XPOSLiveDashboard";
import { useLanguage } from "../context/LanguageContext";

export default function CoreSolutions() {
  const { t } = useLanguage();
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const [card1Progress, setCard1Progress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLargeScreen(window.innerWidth >= 1024);

    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize, { passive: true });

    function handleScroll() {
      if (!card2Ref.current) return;
      const rect = card2Ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // When card2 is entering and sliding over card1
      // progress is 0 when card2 is at bottom of viewport, 1 when at top-28
      const topThreshold = 120; // top-28 approx
      const totalDistance = windowHeight - topThreshold;
      const currentDistance = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
      setCard1Progress(progress);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white text-zinc-900 font-sans overflow-visible border-t border-zinc-200/70">
      {/* Ambient background light gradients */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-[#f1ff5c]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Clean & Simple (Brand Guidelines Page 27 & 30) */}
        <div className="flex flex-col items-start text-left mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800 font-space">
              {t.coreSolutions}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-sora text-zinc-950 leading-tight">
            {t.twoCoreSolutions}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 font-normal font-manrope mt-2.5 max-w-xl leading-relaxed">
            {t.coreSolutionsDesc}
          </p>
        </div>

        {/* ==============================================================
            STACKING CARDS SCROLL CONTAINER
            Card 1 sticks at top-24, and as you scroll, Card 2 slides up over it!
            ============================================================== */}
        <div className="relative flex flex-col">

          {/* CARD 1: SOLUTION 01 · ONLINE (XGATEWAY) */}
          <div
            ref={card1Ref}
            className="relative lg:sticky lg:top-20 z-10 mb-10 sm:mb-16 lg:mb-28 w-full transition-all duration-300 origin-top"
            style={
              mounted && isLargeScreen
                ? {
                    transform: `scale(${1 - card1Progress * 0.05})`,
                    opacity: `${1 - card1Progress * 0.3}`,
                    filter: `blur(${card1Progress * 3}px)`,
                  }
                : undefined
            }
          >

            <div className="w-full rounded-xl bg-gradient-to-br from-[#f8f9ff] via-[#ffffff] to-[#fbfbff] border border-zinc-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-4 sm:p-8 lg:p-12 xl:p-14 relative overflow-hidden">
              {/* Soft purple/lavender glow orb in top-left */}
              <div className="absolute -top-16 -left-16 w-80 h-80 bg-purple-200/35 rounded-full blur-3xl pointer-events-none" />
              {/* Soft blue/lime glow orb in bottom-right */}
              <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#f1ff5c]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center relative z-10">
                
                {/* Left Column: 45% Content Area with Upgraded SaaS Typography */}
                <div className="lg:col-span-5 flex flex-col justify-center text-left">
                  {/* Brand Logo & Category Badge */}
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                    <img
                      src="/products/xgateway.png"
                      alt="XGATEWAY"
                      className="h-6 sm:h-8 w-auto object-contain object-left select-none"
                    />
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-semibold font-space uppercase tracking-wider">
                      Online Checkout
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-3xl lg:text-[34px] font-semibold font-sora text-zinc-950 leading-snug mb-3 sm:mb-4">
                    Realtime Notifications and Summary of Your Store
                  </h3>

                  <p className="text-zinc-600 text-xs sm:text-base leading-relaxed font-normal font-manrope mb-6 sm:mb-8 max-w-[480px]">
                    Get instant real-time webhook updates on every checkout event, track high-intent shopper conversions, and automate multi-currency settlements with zero technical friction.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                    <a
                      href="#xgateway"
                      className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-[#22272D] text-white text-xs sm:text-sm font-semibold font-sora hover:bg-zinc-950 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-center"
                    >
                      <span>Explore XGATEWAY</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </a>

                    <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="font-space">99.98% Gateway Uptime</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: 55% Animated Product Visualization Centerpiece */}
                <div className="lg:col-span-7 w-full overflow-hidden">
                  <XGatewayLiveDashboard />
                </div>

              </div>
            </div>
          </div>

          {/* CARD 2: SOLUTION 02 · IN-STORE (XPOS)
              Scrolls naturally from below and SLIDES DIRECTLY OVER Card 1 with top elevation shadow */}
          <div
            ref={card2Ref}
            className="relative lg:sticky lg:top-24 z-20 w-full mb-0"
          >
            <div className="w-full rounded-xl bg-gradient-to-br from-[#f8faf8] via-[#ffffff] to-[#f7fcf7] border border-zinc-200/90 shadow-[0_-14px_45px_rgba(0,0,0,0.08),0_25px_60px_-15px_rgba(0,0,0,0.14)] p-4 sm:p-8 lg:p-12 xl:p-14 relative overflow-hidden">
              {/* Soft lime/emerald glow orb in top-left */}
              <div className="absolute -top-16 -left-16 w-80 h-80 bg-[#f1ff5c]/35 rounded-full blur-3xl pointer-events-none" />
              {/* Soft emerald/cyan glow orb in bottom-right */}
              <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center relative z-10">
                
                {/* Left Column: 45% Content Area with Upgraded SaaS Typography */}
                <div className="lg:col-span-5 flex flex-col justify-center text-left">
                  {/* Brand Logo & Category Badge */}
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                    <img
                      src="/products/xpos.png"
                      alt="XPOS"
                      className="h-6 sm:h-8 w-auto object-contain object-left select-none"
                    />
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-semibold font-space uppercase tracking-wider">
                      In-Store POS
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-3xl lg:text-[34px] font-semibold font-sora text-zinc-950 leading-snug mb-3 sm:mb-4">
                    Smart POS Terminals & Instant Counter Sync
                  </h3>

                  <p className="text-zinc-600 text-xs sm:text-base leading-relaxed font-normal font-manrope mb-6 sm:mb-8 max-w-[480px]">
                    Supercharge your retail counter with all-in-one Android smart POS terminals, dynamic LANKAQR customer scanning, and instantaneous split receipts synchronized directly to your cloud inventory.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                    <a
                      href="#xpos"
                      className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-[#22272D] text-white text-xs sm:text-sm font-semibold font-sora hover:bg-zinc-950 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-center"
                    >
                      <span>Explore XPOS Terminals</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </a>

                    <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>CEFTS &amp; SLIPS Certified</span>
                    </div>
                  </div>
                </div>
                {/* Right Column: 55% Animated Smart POS Ecosystem Centerpiece */}
                <div className="lg:col-span-7 w-full overflow-hidden">
                  <XPOSLiveDashboard />
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

