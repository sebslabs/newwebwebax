"use client";

import React, { useState } from "react";
import { OFFICIAL_FOOTNOTES } from "../../data/pricingData";

export default function PricingNotes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleNote = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="disclosures" className="w-full py-12 sm:py-16 bg-white border-t border-zinc-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold font-space uppercase tracking-wider text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
            Legal & Financial Disclosures
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-sora text-zinc-950 mt-2">
            Official Pricing Notes & Terms
          </h2>
        </div>

        <div className="space-y-3 font-manrope">
          {OFFICIAL_FOOTNOTES.map((note, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={note.code}
                className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 overflow-hidden transition"
              >
                <button
                  onClick={() => toggleNote(index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-100/50 transition"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-space bg-zinc-200 text-zinc-800">
                      [{note.code}]
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-sora text-zinc-900">
                      {note.title}
                    </span>
                  </div>
                  <span className="text-zinc-400 font-bold text-sm">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-zinc-600 border-t border-zinc-200/60 pt-3 leading-relaxed">
                    {note.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
