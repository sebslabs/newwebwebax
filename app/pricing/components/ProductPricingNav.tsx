"use client";

import React, { useState, useEffect } from "react";

const NAV_SECTIONS = [
  { id: "xgateway", label: "XGATEWAY" },
  { id: "calculator", label: "Plan Finder" },
  { id: "comparison", label: "Comparison" },
  { id: "rates", label: "All Rates" },
  { id: "xpos", label: "XPOS" },
  { id: "xsplit", label: "XSPLIT" },
  { id: "faq", label: "FAQ" },
];

export default function ProductPricingNav() {
  const [activeSection, setActiveSection] = useState("xgateway");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-[52px] sm:top-[58px] z-30 w-full bg-[#f4faff]/90 backdrop-blur-md border-b border-zinc-200/60 py-2 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold font-space whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#22272D] text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
