"use client";

import React from "react";
import { useLanguage, LANGUAGES } from "../context/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "pill" | "dropdown" | "mobile" | "footer";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "pill",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  // 1. MOBILE DRAWER VARIANT: 3 clean buttons with short label + native name
  if (variant === "mobile") {
    return (
      <div className={`w-full flex items-center p-0.5 bg-zinc-100 rounded-xl border border-zinc-200/80 ${className}`}>
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-1 ${
                isActive
                  ? "bg-white text-zinc-950 shadow-2xs border border-zinc-200/90 font-bold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
              title={`${lang.label} (${lang.nativeLabel})`}
            >
              <span className="font-bold">{lang.shortLabel}</span>
              <span className="text-[10px] text-zinc-400 font-normal">({lang.nativeLabel})</span>
            </button>
          );
        })}
      </div>
    );
  }

  // 2. FOOTER VARIANT: Clean, subtle dark switcher with EN | සිං | தமி
  if (variant === "footer") {
    return (
      <div className={`inline-flex items-center gap-0.5 bg-zinc-900/90 border border-zinc-800 rounded-full p-0.5 text-[10px] ${className}`}>
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold leading-tight transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#22272D] text-[#f1ff5c] border border-zinc-700 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
              title={`${lang.label} (${lang.nativeLabel})`}
            >
              {lang.shortLabel}
            </button>
          );
        })}
      </div>
    );
  }

  // 3. COMPACT PILL NAVBAR VARIANT (Default): No icon, native short two-letter forms: EN | සිං | தமி
  return (
    <div
      className={`inline-flex items-center h-6 sm:h-6.5 bg-zinc-100/90 hover:bg-zinc-100 border border-zinc-200/80 rounded-full p-0.5 text-[10px] sm:text-[10.5px] select-none shadow-2xs transition-colors gap-0.5 ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={`px-2 h-5 sm:h-5.5 rounded-full text-[10px] sm:text-[10.5px] font-bold leading-none transition-all duration-150 cursor-pointer flex items-center justify-center ${
              isActive
                ? "bg-white text-zinc-950 font-bold shadow-2xs border border-zinc-200/90"
                : "text-zinc-500 hover:text-zinc-800 font-medium"
            }`}
            title={`${lang.label} (${lang.nativeLabel})`}
          >
            {lang.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
