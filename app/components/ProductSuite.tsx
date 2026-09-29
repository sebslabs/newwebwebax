"use client";

import React from "react";
import ProductCard from "./product-suite/ProductCard";
import XSplitAnimation from "./product-suite/XSplitAnimation";
import XQRAnimation from "./product-suite/XQRAnimation";
import XCollectorAnimation from "./product-suite/XCollectorAnimation";
import XSupplierAnimation from "./product-suite/XSupplierAnimation";
import { useLanguage } from "../context/LanguageContext";
import { ScrollReveal } from "./motion/ScrollReveal";

export default function ProductSuite() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#f4faff] text-zinc-900 font-sans relative overflow-hidden border-t border-zinc-200/70">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#f1ff5c]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Controlled Sequence */}
        <ScrollReveal amount={0.2} duration={0.7} yOffset={28}>
          <div className="flex flex-col items-start text-left mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-xs mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800 font-space">
                {t.productSuite}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-sora text-zinc-950 leading-tight">
              {t.productSuiteHeading}
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-normal font-manrope mt-2.5 max-w-xl leading-relaxed">
              {t.productSuiteSub}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Cards Responsive Grid with 80ms Staggered Card Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* CARD 1: XSPLIT */}
          <ProductCard
            index={0}
            title="XSPLIT"
            logoSrc="/products/xsplit.png"
            href="#xsplit"
            description="Offer instalments plans so customers can afford bigger purchases, both online and in-store."
          >
            <XSplitAnimation />
          </ProductCard>

          {/* CARD 2: XQR */}
          <ProductCard
            index={1}
            title="XQR"
            logoSrc="/products/xqr.png"
            href="#xqr"
            description="Seamless QR payments, bridging LankaQR, UPI, and Alipay+ for local + international convenience."
          >
            <XQRAnimation />
          </ProductCard>

          {/* CARD 3: XCOLLECTOR */}
          <ProductCard
            index={2}
            title="XCOLLECTOR"
            logoSrc="/products/xcollector.png"
            href="#xcollector"
            description="Empower field agents with door-to-door payment acceptance and real-time tracking."
          >
            <XCollectorAnimation />
          </ProductCard>

          {/* CARD 4: XSUPPLIER */}
          <ProductCard
            index={3}
            title="XSUPPLIER"
            logoSrc="/products/xsupplier.png"
            href="#xsupplier"
            description="Extend 50–80 day credit lines to buyers, ensure instant payouts for suppliers—optimizing your supply chain."
          >
            <XSupplierAnimation />
          </ProductCard>

        </div>

      </div>
    </section>
  );
}
