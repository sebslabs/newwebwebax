"use client";

import React, { useState } from "react";
import { XPOS_PLANS, XPOS_CONDITIONS } from "../../data/pricingData";

export default function XPOSPricing() {
  const [showRates, setShowRates] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <section id="xpos" className="w-full py-12 sm:py-16 bg-white border-t border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800 font-space">
                In-Store Hardware
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold font-sora text-zinc-950">
              XPOS Smart Android Terminal Pricing
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-manrope mt-1">
              All-in-one wireless POS hardware with LANKAQR, NFC contactless & card processing.
            </p>
          </div>
          <div className="bg-zinc-100 rounded-xl px-4 py-2 border border-zinc-200 text-xs font-space text-zinc-700 self-start sm:self-auto">
            Hardware Setup: <strong>Rs. 2,500</strong> one-time
          </div>
        </div>

        {/* 3 Plan Cards — Consistent with XGATEWAY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {XPOS_PLANS.map((plan) => {
            const isEconomy = plan.id === "economy";
            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition ${
                  isEconomy
                    ? "bg-[#22272D] text-white shadow-xl scale-[1.01] border border-zinc-700"
                    : "bg-white border border-zinc-200/90 shadow-2xs text-zinc-900"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold font-sora capitalize">{plan.name}</h3>
                    {isEconomy && (
                      <span className="bg-[#f1ff5c] text-zinc-950 text-[10px] font-bold font-space uppercase px-2.5 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-4 p-3 rounded-xl bg-zinc-50/10 border border-zinc-200/20 font-manrope">
                    <div>
                      <span className="block text-[10px] font-space uppercase text-zinc-400">Local Cards</span>
                      <span className="text-2xl font-bold font-sora">{plan.rates.visaMasterLocal}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-space uppercase text-zinc-400">LANKAQR</span>
                      <span className="text-2xl font-bold font-sora text-emerald-400">{plan.rates.lankaQr}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs font-manrope mb-6 text-zinc-400">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> Volume: {plan.volumeCommitment}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> Settlement: {plan.settlement}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> Support: {plan.support}
                    </li>
                  </ul>
                </div>

                <a
                  href="https://dashboard.webxpay.com/register"
                  className={`w-full py-2.5 rounded-xl text-xs font-bold font-sora transition text-center ${
                    isEconomy
                      ? "bg-[#f1ff5c] text-zinc-950 hover:bg-yellow-300"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  Order {plan.name} XPOS →
                </a>
              </div>
            );
          })}
        </div>

        {/* Collapsed Rate Schedule & Terms Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-100">
          <button
            onClick={() => setShowRates(!showRates)}
            className="px-5 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold font-space text-zinc-800 hover:bg-zinc-200 transition cursor-pointer"
          >
            {showRates ? "Hide Full XPOS Rates ↑" : "View Full XPOS Processing Rates ↓"}
          </button>
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="px-5 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold font-space text-zinc-800 hover:bg-zinc-200 transition cursor-pointer"
          >
            {showTerms ? "Hide XPOS Terms ↑" : "Important XPOS Terms +"}
          </button>
        </div>

        {/* Collapsed Detailed Rate Schedule */}
        {showRates && (
          <div className="mt-6 overflow-x-auto no-scrollbar rounded-2xl border border-zinc-200 font-manrope text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-900 text-white font-sora text-[11px] uppercase font-space">
                <tr>
                  <th className="p-3">Payment Channel</th>
                  <th className="p-3">Starter</th>
                  <th className="p-3 bg-zinc-800 text-[#f1ff5c]">Economy</th>
                  <th className="p-3">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr><td className="p-3 font-semibold">Visa / Mastercard (Local)</td><td className="p-3">3.00%</td><td className="p-3 font-bold bg-blue-50/30">2.80%</td><td className="p-3 text-emerald-600 font-bold">2.50%</td></tr>
                <tr><td className="p-3 font-semibold">Visa / Mastercard (Foreign)</td><td className="p-3">3.90%</td><td className="p-3 font-bold bg-blue-50/30">3.70%</td><td className="p-3 text-emerald-600 font-bold">3.50%</td></tr>
                <tr><td className="p-3 font-semibold">Amex (Local & Foreign)</td><td className="p-3">3.90%</td><td className="p-3 font-bold bg-blue-50/30">3.70%</td><td className="p-3 text-emerald-600 font-bold">3.50%</td></tr>
                <tr><td className="p-3 font-semibold">LANKAQR National QR</td><td className="p-3">1.00%</td><td className="p-3 font-bold bg-blue-50/30">1.00%</td><td className="p-3 text-emerald-600 font-bold">1.00%</td></tr>
                <tr><td className="p-3 font-semibold">UnionPay (Local)</td><td className="p-3">3.80%</td><td className="p-3 font-bold bg-blue-50/30">3.20%</td><td className="p-3 text-emerald-600 font-bold">2.90%</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Collapsed Terms */}
        {showTerms && (
          <div className="mt-6 p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 font-manrope space-y-2">
            <h4 className="font-bold font-sora text-zinc-950 mb-2">Important XPOS Terms & Operational Conditions</h4>
            {XPOS_CONDITIONS.map((cond, i) => (
              <p key={i} className="flex items-start gap-2">
                <span className="text-zinc-400 font-bold">•</span>
                <span>{cond}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
