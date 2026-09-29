"use client";

import React, { useState } from "react";
import { ADVANCED_RATES } from "../../data/pricingData";

export default function MultiCurrencyCard() {
  const [isOpen, setIsOpen] = useState(false);
  const mc = ADVANCED_RATES.multiCurrency;

  return (
    <div id="multicurrency" className="w-full bg-[#22272D] text-white rounded-2xl p-6 sm:p-8 my-6 shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#f1ff5c]/10 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-bold font-space uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-800 text-[#f1ff5c] border border-zinc-700">
              Direct Multi-Currency Settlement
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-sora mt-2">
              USD & GBP Direct Settlement
            </h3>
          </div>
          <span className="text-xs font-semibold font-space bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700 self-start sm:self-auto">
            Eligible: Economy & Business
          </span>
        </div>

        {/* 3 Metric Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 mb-4">
          <div>
            <span className="block text-[10px] font-space uppercase text-zinc-400">Supported Currencies</span>
            <span className="text-xl font-bold font-sora text-[#f1ff5c]">USD / GBP</span>
          </div>
          <div>
            <span className="block text-[10px] font-space uppercase text-zinc-400">Processing Rate</span>
            <span className="text-xl font-bold font-sora text-white">{mc.processingRate}</span>
          </div>
          <div>
            <span className="block text-[10px] font-space uppercase text-zinc-400">Settlement Window</span>
            <span className="text-xl font-bold font-sora text-emerald-400">{mc.settlementPeriod}</span>
          </div>
        </div>

        {/* Expandable Terms */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-bold font-space text-zinc-400 hover:text-white transition cursor-pointer flex items-center gap-1.5"
        >
          {isOpen ? "Hide Processing Terms ↑" : "View Processing Terms & Details ↓"}
        </button>

        {isOpen && (
          <div className="mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-300 space-y-2 font-manrope">
            <p>{mc.description}</p>
            <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-space text-zinc-400">
              <span>• One-time activation: {mc.activationFee}</span>
              <span>• Routes: {mc.routes.join(", ")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
