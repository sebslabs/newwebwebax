"use client";

import React, { useState } from "react";
import { TRANSACTION_RATES } from "../../data/pricingData";
import { ScrollReveal } from "../../components/motion/ScrollReveal";

const CATEGORIES = [
  { id: "all", label: "All Rates" },
  { id: "cards", label: "Cards" },
  { id: "qr", label: "QR & Instant" },
  { id: "international", label: "International" },
  { id: "wallets", label: "Wallets" },
  { id: "banking", label: "Direct Banking" },
];

export default function TransactionRates() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredRates = TRANSACTION_RATES.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeRates = filteredRates.filter((r) => r.status !== "inactive");
  const displayedRates = showAll ? filteredRates : activeRates.slice(0, 8);

  return (
    <section id="rates" className="w-full py-12 sm:py-16 bg-[#f4faff] border-t border-zinc-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal amount={0.2} duration={0.65} yOffset={24}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs mb-3">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800 font-space">
                  Rate Explorer
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-semibold font-sora text-zinc-950">
                Transaction Processing Rates
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 font-manrope mt-1">
                Complete rate schedule for all payment methods across every WEBXPAY plan.
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Search payment method..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-full px-4 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-400 font-manrope shadow-2xs"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal amount={0.2} duration={0.65} yOffset={16} delay={0.05}>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-space whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#22272D] text-white shadow-xs"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Desktop Table Container Reveal */}
        <ScrollReveal amount={0.1} duration={0.7} yOffset={20} delay={0.1}>
          <div className="hidden md:block overflow-x-auto no-scrollbar rounded-2xl border border-zinc-200/90 bg-white shadow-xs">
            <table className="w-full text-left border-collapse font-manrope">
              <thead className="bg-zinc-900 text-white font-sora">
                <tr>
                  <th scope="col" className="p-4 text-xs font-semibold uppercase tracking-wider font-space">
                    Payment Method
                  </th>
                  <th scope="col" className="p-4 text-xs font-semibold uppercase tracking-wider font-space text-center">
                    Starter
                  </th>
                  <th scope="col" className="p-4 text-xs font-semibold uppercase tracking-wider font-space text-center bg-[#22272D] text-[#f1ff5c]">
                    Economy
                  </th>
                  <th scope="col" className="p-4 text-xs font-semibold uppercase tracking-wider font-space text-center">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
                {displayedRates.map((rate) => {
                  const isInactive = rate.status === "inactive";
                  return (
                    <tr
                      key={rate.id}
                      className={isInactive ? "bg-zinc-50/80 opacity-60" : "hover:bg-zinc-50/50"}
                    >
                      <td className="p-4 font-semibold text-zinc-900 flex items-center gap-2">
                        {rate.name}
                        {rate.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-space bg-zinc-100 text-zinc-700">
                            {rate.badge}
                          </span>
                        )}
                        {isInactive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-space bg-amber-100 text-amber-800">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center text-zinc-600 font-mono">
                        {rate.starter}
                      </td>
                      <td className="p-4 text-center font-bold text-zinc-900 bg-blue-50/30 font-mono">
                        {rate.economy}
                      </td>
                      <td className="p-4 text-center font-bold text-emerald-600 font-mono">
                        {rate.business}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="block md:hidden space-y-3">
            {displayedRates.map((rate) => (
              <div
                key={rate.id}
                className={`p-4 rounded-xl bg-white border border-zinc-200/80 shadow-2xs ${
                  rate.status === "inactive" ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-sora text-zinc-900">
                    {rate.name}
                  </span>
                  {rate.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-space bg-zinc-100 text-zinc-700">
                      {rate.badge}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-2 border-t border-zinc-100">
                  <div>
                    <span className="block text-[9px] font-space text-zinc-400 uppercase">Starter</span>
                    <span className="text-zinc-600">{rate.starter}</span>
                  </div>
                  <div className="bg-blue-50/50 rounded-lg py-1">
                    <span className="block text-[9px] font-space text-zinc-500 uppercase font-bold">Economy</span>
                    <span className="font-bold text-zinc-950">{rate.economy}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-space text-emerald-600 uppercase font-bold">Business</span>
                    <span className="font-bold text-emerald-600">{rate.business}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Expand / Show All Button */}
        {filteredRates.length > 8 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-full bg-white border border-zinc-300 text-xs font-bold font-space text-zinc-800 hover:bg-zinc-100 transition shadow-2xs cursor-pointer"
            >
              {showAll ? "Show Fewer Rates ↑" : `Show All ${filteredRates.length} Rates ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
