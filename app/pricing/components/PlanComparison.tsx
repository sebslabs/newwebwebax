"use client";

import React, { useState } from "react";
import { XGATEWAY_PLANS } from "../../data/pricingData";
import { ScrollReveal } from "../../components/motion/ScrollReveal";

export default function PlanComparison() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMobilePlan, setActiveMobilePlan] = useState<"starter" | "economy" | "business">("economy");

  const starter = XGATEWAY_PLANS.find((p) => p.id === "starter")!;
  const economy = XGATEWAY_PLANS.find((p) => p.id === "economy")!;
  const business = XGATEWAY_PLANS.find((p) => p.id === "business")!;

  return (
    <section id="comparison" className="w-full py-10 sm:py-14 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal amount={0.15} duration={0.65} yOffset={20}>
          {/* Toggle Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-200/80">
            <div>
              <h3 className="text-lg font-bold font-sora text-zinc-950">
                Compare all plan features
              </h3>
              <p className="text-xs text-zinc-500 font-manrope mt-0.5">
                Side-by-side technical, inclusion, and rate comparison matrix.
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-zinc-300 text-xs font-bold font-space text-zinc-800 hover:bg-zinc-100 transition shadow-2xs cursor-pointer self-start sm:self-auto"
            >
              {isExpanded ? "Collapse Matrix ↑" : "View Full Comparison ↓"}
            </button>
          </div>
        </ScrollReveal>

        {/* Matrix Content */}
        {isExpanded && (
          <ScrollReveal amount={0.1} duration={0.6} yOffset={16} className="mt-8 transition-all">
            <div>
              {/* Desktop / Tablet Sticky Table */}
              <div className="hidden md:block overflow-x-auto no-scrollbar rounded-2xl border border-zinc-200/90 shadow-xs">
                <table className="w-full text-left border-collapse font-manrope">
                  <thead className="sticky top-[96px] z-20 bg-zinc-900 text-white font-sora">
                    <tr>
                      <th scope="col" className="p-4 text-xs font-semibold uppercase tracking-wider font-space w-1/4">
                        Feature / Inclusion
                      </th>
                      <th scope="col" className="p-4 text-sm font-bold w-1/4">
                        Starter
                      </th>
                      <th scope="col" className="p-4 text-sm font-bold w-1/4 bg-[#22272D] text-[#f1ff5c] border-l border-r border-zinc-700">
                        Economy (Recommended)
                      </th>
                      <th scope="col" className="p-4 text-sm font-bold w-1/4">
                        Business
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-xs sm:text-sm">
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">Volume Commitment</td>
                      <td className="p-4 text-zinc-600">{starter.volumeCommitmentLabel}</td>
                      <td className="p-4 text-zinc-900 font-semibold bg-blue-50/30 border-l border-r border-zinc-200">{economy.volumeCommitmentLabel}</td>
                      <td className="p-4 text-zinc-600">{business.volumeCommitmentLabel}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">Annual Subscription</td>
                      <td className="p-4 text-zinc-900 font-medium">Rs. 10,000 / yr</td>
                      <td className="p-4 text-zinc-900 font-bold bg-blue-50/30 border-l border-r border-zinc-200">Rs. 59,880 / yr</td>
                      <td className="p-4 text-zinc-900 font-medium">Rs. 107,880 / yr</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">Local Card Rate (MDR)</td>
                      <td className="p-4 text-zinc-600">{starter.keyRates.localVisaMaster}</td>
                      <td className="p-4 text-zinc-900 font-bold text-indigo-600 bg-blue-50/30 border-l border-r border-zinc-200">{economy.keyRates.localVisaMaster}</td>
                      <td className="p-4 text-emerald-600 font-bold">{business.keyRates.localVisaMaster}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">LANKAQR Rate</td>
                      <td className="p-4 text-zinc-600">{starter.keyRates.lankaQr}</td>
                      <td className="p-4 text-zinc-900 bg-blue-50/30 border-l border-r border-zinc-200">{economy.keyRates.lankaQr}</td>
                      <td className="p-4 text-zinc-600">{business.keyRates.lankaQr}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">LKR Settlement Window</td>
                      <td className="p-4 text-zinc-600">{starter.inclusions.settlementLkr}</td>
                      <td className="p-4 text-zinc-900 bg-blue-50/30 border-l border-r border-zinc-200">{economy.inclusions.settlementLkr}</td>
                      <td className="p-4 text-zinc-600">{business.inclusions.settlementLkr}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">Merchant Portal &amp; Analytics</td>
                      <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
                      <td className="p-4 text-emerald-600 font-bold bg-blue-50/30 border-l border-r border-zinc-200">✓ Included</td>
                      <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">Tokenization &amp; Recurring Vault</td>
                      <td className="p-4 text-zinc-400">✗ Not available</td>
                      <td className="p-4 text-emerald-600 font-bold bg-blue-50/30 border-l border-r border-zinc-200">✓ Included</td>
                      <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">XSUPPLIER B2B Rates</td>
                      <td className="p-4 text-zinc-400">✗ Not available</td>
                      <td className="p-4 text-emerald-600 font-bold bg-blue-50/30 border-l border-r border-zinc-200">✓ Included</td>
                      <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">XCOLLECTOR Field App</td>
                      <td className="p-4 text-zinc-400">✗ Not available</td>
                      <td className="p-4 text-zinc-400 bg-blue-50/30 border-l border-r border-zinc-200">✗ Not available</td>
                      <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-zinc-900 bg-zinc-50/50">Support SLA</td>
                      <td className="p-4 text-zinc-600">{starter.inclusions.support}</td>
                      <td className="p-4 text-zinc-900 bg-blue-50/30 border-l border-r border-zinc-200">{economy.inclusions.support}</td>
                      <td className="p-4 text-zinc-900 font-bold">{business.inclusions.support}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Plan Selector View */}
              <div className="block md:hidden">
                <div className="flex rounded-xl bg-zinc-100 p-1 mb-4">
                  {(["starter", "economy", "business"] as const).map((pId) => (
                    <button
                      key={pId}
                      onClick={() => setActiveMobilePlan(pId)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold font-space capitalize transition ${
                        activeMobilePlan === pId
                          ? "bg-[#22272D] text-white shadow-xs"
                          : "text-zinc-600"
                      }`}
                    >
                      {pId}
                    </button>
                  ))}
                </div>

                {/* Active Plan Mobile Details */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-3 font-manrope text-xs sm:text-sm">
                  {activeMobilePlan === "starter" && (
                    <>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Volume</span><span className="font-semibold">{starter.volumeCommitmentLabel}</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Local Cards</span><span className="font-bold">{starter.keyRates.localVisaMaster}</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">LANKAQR</span><span className="font-bold">{starter.keyRates.lankaQr}</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Tokenization</span><span className="text-zinc-400">Not Available</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Settlement</span><span>{starter.inclusions.settlementLkr}</span></div>
                    </>
                  )}
                  {activeMobilePlan === "economy" && (
                    <>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Volume</span><span className="font-semibold">{economy.volumeCommitmentLabel}</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Local Cards</span><span className="font-bold text-indigo-600">{economy.keyRates.localVisaMaster}</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">LANKAQR</span><span className="font-bold">{economy.keyRates.lankaQr}</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Tokenization</span><span className="text-emerald-600 font-bold">✓ Included</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Settlement</span><span>{economy.inclusions.settlementLkr}</span></div>
                    </>
                  )}
                  {activeMobilePlan === "business" && (
                    <>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Volume</span><span className="font-semibold">{business.volumeCommitmentLabel}</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Local Cards</span><span className="font-bold text-emerald-600">{business.keyRates.localVisaMaster}</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">LANKAQR</span><span className="font-bold">{business.keyRates.lankaQr}</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Tokenization</span><span className="text-emerald-600 font-bold">✓ Included</span></div>
                      <div className="flex justify-between py-2 border-b border-zinc-100"><span className="text-zinc-500">Settlement</span><span>{business.inclusions.settlementLkr}</span></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
