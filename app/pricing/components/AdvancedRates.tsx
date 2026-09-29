"use client";

import React, { useState } from "react";
import { ADVANCED_RATES } from "../../data/pricingData";

export default function AdvancedRates() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8 my-6 shadow-2xs">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold font-space uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">
            Specialized Features
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-sora text-zinc-950 mt-2">
            Tokenization & Recurring Billing Rates
          </h3>
          <p className="text-xs text-zinc-500 font-manrope mt-0.5">
            PCI-DSS compliant card vaulting for subscriptions, 1-click checkouts & B2B supplier financing.
          </p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-bold font-space hover:bg-zinc-800 transition cursor-pointer shrink-0"
        >
          {isOpen ? "Collapse Rates ↑" : "View Specialized Rates ↓"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 pt-6 border-t border-zinc-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADVANCED_RATES.tokenization.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/60 font-manrope">
                <h4 className="text-xs font-bold font-sora text-zinc-900 mb-1">{item.title}</h4>
                <p className="text-[11px] text-zinc-500 mb-3">{item.description}</p>
                <div className="flex justify-between text-xs font-mono pt-2 border-t border-zinc-200/60">
                  <span className="text-zinc-500">Economy: <strong className="text-zinc-900">{item.economy}</strong></span>
                  <span className="text-zinc-500">Business: <strong className="text-emerald-600">{item.business}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* B2B Supplier Card */}
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 font-manrope flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold font-sora text-indigo-950">{ADVANCED_RATES.b2bSupplier.title}</h4>
              <p className="text-[11px] text-indigo-700 mt-0.5">{ADVANCED_RATES.b2bSupplier.description}</p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-2xl font-bold font-sora text-indigo-900">{ADVANCED_RATES.b2bSupplier.rate}</span>
              <span className="block text-[10px] font-space text-indigo-600">Economy & Business</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
