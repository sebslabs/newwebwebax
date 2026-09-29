"use client";

import React, { useState } from "react";
import { PRICING_FAQS } from "../../data/pricingData";
import { ScrollReveal } from "../../components/motion/ScrollReveal";

const FAQ_CATEGORIES = [
  { id: "all", label: "All FAQs" },
  { id: "general", label: "General" },
  { id: "settlement", label: "Settlement" },
  { id: "technical", label: "Technical & API" },
  { id: "pos", label: "XPOS" },
  { id: "split", label: "XSPLIT" },
];

export default function PricingFAQ() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const filteredFaqs = PRICING_FAQS.filter(
    (faq) => selectedCat === "all" || faq.category === selectedCat
  );

  return (
    <section id="faq" className="w-full py-12 sm:py-16 bg-[#f4faff] border-t border-zinc-200/60 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal amount={0.2} duration={0.65} yOffset={24}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800 font-space">
                Help &amp; Clarifications
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold font-sora text-zinc-950">
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        {/* Category Pills */}
        <ScrollReveal amount={0.2} duration={0.6} yOffset={16} delay={0.05}>
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCat(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-space whitespace-nowrap transition cursor-pointer ${
                  selectedCat === cat.id
                    ? "bg-[#22272D] text-white shadow-xs"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Single Open Accordion Container */}
        <ScrollReveal amount={0.15} duration={0.7} yOffset={20} delay={0.1}>
          <div className="space-y-3 font-manrope">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/50 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold font-sora text-zinc-900">
                      {faq.question}
                    </span>
                    <span className="text-zinc-400 font-bold text-lg shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 border-t border-zinc-100 pt-3 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
