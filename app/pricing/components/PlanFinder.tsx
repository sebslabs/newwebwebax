"use client";

import React, { useState } from "react";
import { XGATEWAY_PLANS } from "../../data/pricingData";
import {
  buildPlanRecommendation,
  calculateSavings,
  formatRs,
  formatVolume,
} from "../lib/calculations";
import { ScrollReveal } from "../../components/motion/ScrollReveal";

export default function PlanFinder() {
  const [volume, setVolume] = useState(15000000); // Default Rs. 15M

  const rec = buildPlanRecommendation(volume);
  const baselinePlanId = rec.planId === "business" ? "economy" : "starter";
  const savings = calculateSavings(volume, rec.planId, baselinePlanId);

  const planData = XGATEWAY_PLANS.find((p) => p.id === rec.planId)!;

  return (
    <section id="calculator" className="w-full py-12 sm:py-16 bg-[#f4faff] border-t border-zinc-200/60 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <ScrollReveal amount={0.2} duration={0.65} yOffset={24}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800 font-space">
              Plan Calculator
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold font-sora text-zinc-950">
            Find the right plan for your payment volume
          </h2>
        </ScrollReveal>

        {/* Volume Slider Block */}
        <ScrollReveal amount={0.2} duration={0.7} yOffset={28} delay={0.1}>
          <div className="mt-8 bg-white rounded-2xl border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6 sm:p-8 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <label htmlFor="volume-slider" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-space">
                Estimated Monthly Turnover
              </label>
              <span className="text-2xl sm:text-3xl font-bold font-sora text-[#22272D]">
                {formatVolume(volume)} / month
              </span>
            </div>

            {/* Slider */}
            <input
              id="volume-slider"
              type="range"
              min={1000000}
              max={50000000}
              step={500000}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#22272D]"
              aria-label="Estimated monthly turnover slider"
              aria-valuemin={1000000}
              aria-valuemax={50000000}
              aria-valuenow={volume}
              aria-valuetext={`${formatVolume(volume)} per month`}
            />
            <div className="flex justify-between text-[11px] font-space text-zinc-400 mt-2">
              <span>Rs. 1M</span>
              <span>Rs. 25M</span>
              <span>Rs. 50M+</span>
            </div>

            {/* Result Card */}
            <div className="mt-8 pt-6 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-space mb-1">
                  Recommended Plan
                </p>
                <h3 className="text-3xl font-bold font-sora text-[#22272D]">
                  {rec.planName}
                </h3>
                <p className="text-xs text-zinc-500 font-manrope mt-1">
                  Local card MDR: {(rec.monthlyRate * 100).toFixed(2)}%
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-space mb-1">
                  Est. Processing Cost
                </p>
                <p className="text-2xl font-bold font-sora text-zinc-900">
                  {formatRs(rec.processingCost)}
                  <span className="text-xs font-normal text-zinc-500"> / mo</span>
                </p>
                <p className="text-[11px] text-zinc-500 font-manrope mt-1">
                  + {formatRs(rec.subscriptionMonthly)} sub = {formatRs(rec.totalMonthlyCost)} total
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-3">
                {savings.monthlySaving > 0 && (
                  <div className="text-left sm:text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 font-space">
                      Potential Savings
                    </p>
                    <p className="text-xl font-bold font-sora text-emerald-600">
                      Save {formatRs(savings.monthlySaving)} / mo
                    </p>
                    <p className="text-[10px] text-zinc-400 font-manrope">
                      compared with {savings.baselinePlanName}
                    </p>
                  </div>
                )}
                <a
                  href={planData.ctaHref}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#22272D] text-white hover:bg-zinc-800 rounded-xl text-xs font-bold font-sora transition text-center shadow-xs"
                >
                  Choose {rec.planName} →
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
