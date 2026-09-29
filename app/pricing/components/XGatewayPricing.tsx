"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { XGATEWAY_PLANS } from "../../data/pricingData";
import { formatRs } from "../lib/calculations";
import { ScrollReveal, PREMIUM_EASE } from "../../components/motion/ScrollReveal";

type BillingPeriod = "6-month" | "12-month";

export default function XGatewayPricing() {
  const [activeBilling, setActiveBilling] = useState<BillingPeriod>("12-month");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="xgateway"
      className="w-full py-14 sm:py-16 lg:py-20 bg-white"
      aria-labelledby="xgateway-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <ScrollReveal amount={0.2} duration={0.7} yOffset={28}>
          <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                aria-hidden="true"
              />
              <span className="text-[11px] font-space font-bold uppercase tracking-wider text-emerald-700">
                XGATEWAY
              </span>
            </div>

            {/* Eyebrow */}
            <p className="text-sm font-manrope font-medium text-zinc-500 mb-1">
              Online Payment Gateway
            </p>

            {/* Heading */}
            <h2
              id="xgateway-heading"
              className="font-sora font-semibold text-[#22272D] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              XGATEWAY Plans
            </h2>

            {/* Subtitle */}
            <p className="mt-3 font-manrope text-zinc-500 text-sm sm:text-base max-w-xl">
              Choose the plan that matches your monthly payment volume.
            </p>

            {/* ── Billing Toggle ───────────────────────────────────────── */}
            <div
              className="mt-8 inline-flex items-center bg-zinc-100 p-1 rounded-full border border-zinc-200"
              role="group"
              aria-label="Billing period"
            >
              <button
                type="button"
                onClick={() => setActiveBilling("6-month")}
                aria-pressed={activeBilling === "6-month"}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-space font-semibold transition-all duration-200 cursor-pointer ${
                  activeBilling === "6-month"
                    ? "bg-white text-zinc-950 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                6 Months
              </button>

              <button
                type="button"
                onClick={() => setActiveBilling("12-month")}
                aria-pressed={activeBilling === "12-month"}
                className={`relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-space font-semibold transition-all duration-200 cursor-pointer ${
                  activeBilling === "12-month"
                    ? "bg-[#22272D] text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                12 Months
                {activeBilling === "12-month" && (
                  <span className="bg-[#f1ff5c] text-[#22272D] text-[10px] font-bold font-space uppercase tracking-wider px-2 py-0.5 rounded-full leading-none">
                    BEST VALUE
                  </span>
                )}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Plan Cards Grid with 100ms Stagger ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6 items-start">
          {XGATEWAY_PLANS.map((plan, idx) => {
            const isEconomy = plan.id === "economy";
            const isStarter = plan.id === "starter";

            const resolvedOption =
              plan.billingOptions.find((o) => o.period === activeBilling) ??
              plan.billingOptions[0];

            const showAnnualOnlyNote =
              isStarter && activeBilling === "6-month";

            return (
              <motion.div
                key={plan.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: PREMIUM_EASE,
                }}
                className={`relative flex flex-col rounded-2xl ${
                  isEconomy
                    ? "bg-[#22272D] text-white p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.18)] scale-[1.02]"
                    : "bg-white border border-zinc-200/80 p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
                }`}
              >
                {/* Most Popular badge */}
                {isEconomy && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-[#f1ff5c] text-[#22272D] text-[10px] font-bold font-space uppercase tracking-wider px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* ── Plan Name + Tagline ──────────────────────────────── */}
                <h3
                  className={`text-2xl font-bold font-sora ${
                    isEconomy ? "text-white" : "text-zinc-950"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-xs font-manrope leading-relaxed ${
                    isEconomy ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {plan.tagline}
                </p>

                {/* ── Price Block ──────────────────────────────────────── */}
                <div className="mt-6">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span
                      key={`${plan.id}-${activeBilling}`}
                      className={`text-4xl sm:text-5xl font-bold font-sora animate-price-in ${
                        isEconomy ? "text-white" : "text-zinc-950"
                      }`}
                    >
                      {formatRs(resolvedOption.priceLkr)}
                    </span>
                    <span
                      className={`text-xs font-space ${
                        isEconomy ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      / {resolvedOption.months} months
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-manrope font-medium ${
                        isEconomy ? "text-zinc-300" : "text-zinc-600"
                      }`}
                    >
                      Equivalent: {formatRs(resolvedOption.perMonthEquivalent)} / month
                    </span>
                    {showAnnualOnlyNote && (
                      <span className="text-[10px] font-space font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        Annual only
                      </span>
                    )}
                  </div>
                </div>

                {/* ── Key Rates Grid (2 Columns) ──────────────────────── */}
                <div
                  className={`mt-6 p-4 rounded-xl grid grid-cols-2 gap-3 border ${
                    isEconomy
                      ? "bg-zinc-800/80 border-zinc-700/80"
                      : "bg-zinc-50 border-zinc-200/80"
                  }`}
                >
                  <div>
                    <span className="block text-[10px] font-space uppercase tracking-wider text-zinc-400">
                      Local Cards
                    </span>
                    <span
                      className={`text-xl font-bold font-sora ${
                        isEconomy ? "text-[#f1ff5c]" : "text-zinc-950"
                      }`}
                    >
                      {plan.keyRates.localVisaMaster}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-space uppercase tracking-wider text-zinc-400">
                      LANKAQR
                    </span>
                    <span className="text-xl font-bold font-sora text-emerald-500">
                      {plan.keyRates.lankaQr}
                    </span>
                  </div>
                </div>

                {/* ── Volume Commitment + Settlement ──────────────────── */}
                <div
                  className={`mt-4 space-y-2 text-xs font-manrope pb-6 border-b ${
                    isEconomy ? "border-zinc-800 text-zinc-300" : "border-zinc-100 text-zinc-600"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-space text-[11px] uppercase">
                      Volume
                    </span>
                    <span className="font-semibold text-[#22272D] dark:text-white">
                      {plan.volumeCommitmentLabel}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-space text-[11px] uppercase">
                      Settlement
                    </span>
                    <span className="font-semibold text-emerald-500">
                      {plan.inclusions.settlementLkr}
                    </span>
                  </div>
                </div>

                {/* ── Key Inclusions List ─────────────────────────────── */}
                <ul className="mt-6 space-y-2.5 text-xs font-manrope mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className={isEconomy ? "text-zinc-200" : "text-zinc-700"}>
                      Merchant Portal &amp; Real-time Analytics
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className={isEconomy ? "text-zinc-200" : "text-zinc-700"}>
                      REST APIs &amp; eCommerce Plugins
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className={isEconomy ? "text-zinc-200" : "text-zinc-700"}>
                      XSPLIT Bank Instalments
                    </span>
                  </li>

                  {plan.inclusions.tokenization ? (
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className={isEconomy ? "text-zinc-200 font-semibold" : "text-zinc-900 font-semibold"}>
                        Tokenization &amp; Recurring Billing
                      </span>
                    </li>
                  ) : (
                    <li className="flex items-center gap-2 text-zinc-400">
                      <span>✗</span>
                      <span className="line-through opacity-60">
                        Tokenization &amp; Recurring Billing
                      </span>
                    </li>
                  )}

                  {plan.includedProducts.includes("XSUPPLIER") && (
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className={isEconomy ? "text-zinc-200 font-semibold" : "text-zinc-900 font-semibold"}>
                        XSUPPLIER B2B Rates
                      </span>
                    </li>
                  )}

                  {plan.includedProducts.includes("XCOLLECTOR") && (
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className={isEconomy ? "text-zinc-200 font-semibold" : "text-zinc-900 font-semibold"}>
                        XCOLLECTOR Agent App Access
                      </span>
                    </li>
                  )}
                </ul>

                {/* ── CTA Button ──────────────────────────────────────── */}
                <div className="mt-auto pt-2">
                  <a
                    href={plan.ctaHref}
                    className={`block w-full text-center px-5 py-3 rounded-xl text-xs sm:text-sm font-bold font-sora transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                      isEconomy
                        ? "bg-[#f1ff5c] text-[#22272D] hover:bg-yellow-300"
                        : "bg-zinc-900 text-white hover:bg-zinc-800"
                    }`}
                  >
                    {plan.ctaText} →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
