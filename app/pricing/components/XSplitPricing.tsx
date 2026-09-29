"use client";

import React, { useState } from "react";
import { XSPLIT_BANKS, XSPLIT_RULES } from "../../data/pricingData";
import { calculateXSplitPayout, formatRs } from "../lib/calculations";

export default function XSplitPricing() {
  const [selectedBankId, setSelectedBankId] = useState("commercial-bank");
  const [txValue, setTxValue] = useState(50000); // Default Rs. 50,000
  const [selectedTenor, setSelectedTenor] = useState(12);
  const [showFullComparison, setShowFullComparison] = useState(false);

  const selectedBank = XSPLIT_BANKS.find((b) => b.bankId === selectedBankId) || XSPLIT_BANKS[0];
  const tenorKey = `${selectedTenor}m`;
  const mdrStr = selectedBank.rates[tenorKey] || "9.00%";

  const payout = calculateXSplitPayout(txValue, mdrStr, selectedTenor);

  return (
    <section id="xsplit" className="w-full py-12 sm:py-16 bg-[#f4faff] border-t border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800 font-space">
              Instalment Engine
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold font-sora text-zinc-950">
            XSPLIT Bank Instalment Rates & Calculator
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-manrope mt-1">
            Convert credit card checkouts into 3 to 60-month customer instalments across Sri Lanka's leading commercial banks.
          </p>
        </div>

        {/* Bank Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
          {XSPLIT_BANKS.map((b) => (
            <button
              key={b.bankId}
              onClick={() => {
                setSelectedBankId(b.bankId);
                if (!b.availableTenors.includes(selectedTenor)) {
                  setSelectedTenor(b.availableTenors[0]);
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-space whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                selectedBankId === b.bankId
                  ? "bg-[#22272D] text-white shadow-xs"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-400"
              }`}
            >
              <span>{b.bankShort}</span>
              <span className="text-[10px] text-zinc-400">({b.minimumTx} min)</span>
            </button>
          ))}
        </div>

        {/* Interactive Calculator Block */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Controls */}
            <div className="space-y-6">
              <div>
                <label htmlFor="xsplit-value-slider" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-space block mb-1">
                  Transaction Value
                </label>
                <div className="text-2xl font-bold font-sora text-zinc-900 mb-2">
                  {formatRs(txValue)}
                </div>
                <input
                  id="xsplit-value-slider"
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={txValue}
                  onChange={(e) => setTxValue(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#22272D]"
                  aria-label="Transaction Value Slider"
                />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-space block mb-2">
                  Selected Tenor ({selectedBank.bankShort})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedBank.availableTenors.map((tenor) => (
                    <button
                      key={tenor}
                      onClick={() => setSelectedTenor(tenor)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-space transition ${
                        selectedTenor === tenor
                          ? "bg-[#22272D] text-white"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                      }`}
                    >
                      {tenor} Months
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Payout Box (Strongest visual emphasis on MERCHANT RECEIVES) */}
            <div className="bg-[#22272D] text-white rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex justify-between text-xs font-manrope text-zinc-300 pb-3 border-b border-zinc-700">
                <span>Selected Bank MDR ({mdrStr})</span>
                <span>{formatRs(txValue * payout.bankMdr)}</span>
              </div>
              <div className="flex justify-between text-xs font-manrope text-zinc-300 pb-3 border-b border-zinc-700">
                <span>Customer Monthly Instalment</span>
                <span className="font-bold text-white">~ {formatRs(payout.customerMonthlyInstalment)} / mo</span>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold font-space uppercase tracking-wider text-[#f1ff5c]">
                  Merchant Receives Upfront
                </span>
                <div className="text-3xl sm:text-4xl font-bold font-sora text-white mt-1">
                  {formatRs(payout.merchantReceives)}
                </div>
                <span className="text-[11px] font-manrope text-emerald-400 block mt-1">
                  ✓ Full T+1 Settlement credited upfront
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed Full Comparison Grid */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowFullComparison(!showFullComparison)}
            className="px-6 py-2.5 rounded-full bg-white border border-zinc-300 text-xs font-bold font-space text-zinc-800 hover:bg-zinc-100 transition shadow-2xs cursor-pointer"
          >
            {showFullComparison ? "Hide Bank Comparison Grid ↑" : "Compare All Bank Instalment Rates ↓"}
          </button>
        </div>

        {showFullComparison && (
          <div className="mt-8 overflow-x-auto no-scrollbar rounded-2xl border border-zinc-200 bg-white font-manrope text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-900 text-white font-sora text-[11px] font-space uppercase">
                <tr>
                  <th className="p-3">Partner Bank</th>
                  <th className="p-3">Min Value</th>
                  <th className="p-3">3m</th>
                  <th className="p-3">6m</th>
                  <th className="p-3">12m</th>
                  <th className="p-3">18m</th>
                  <th className="p-3">24m</th>
                  <th className="p-3">36m+</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-mono">
                {XSPLIT_BANKS.map((bank) => (
                  <tr key={bank.bankId} className="hover:bg-zinc-50/50">
                    <td className="p-3 font-semibold font-manrope text-zinc-900">{bank.bankName}</td>
                    <td className="p-3 text-zinc-500">{bank.minimumTx}</td>
                    <td className="p-3">{bank.rates["3m"] || "—"}</td>
                    <td className="p-3 font-bold text-zinc-900">{bank.rates["6m"] || "—"}</td>
                    <td className="p-3 font-bold text-indigo-600">{bank.rates["12m"] || "—"}</td>
                    <td className="p-3">{bank.rates["18m"] || "—"}</td>
                    <td className="p-3">{bank.rates["24m"] || "—"}</td>
                    <td className="p-3 text-zinc-600">{bank.rates["36m"] || bank.rates["48m"] || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="p-4 text-[11px] text-zinc-400 bg-zinc-50 border-t border-zinc-100 font-manrope">
              {XSPLIT_RULES.legalDisclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
