"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);

  // Track scroll position to enhance floating navbar styling
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        solutionsRef.current &&
        !solutionsRef.current.contains(event.target as Node)
      ) {
        setIsSolutionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown and mobile menu on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsSolutionsOpen(false);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 flex justify-center pt-2 sm:pt-4 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto w-full max-w-7xl font-space transition-all duration-300 ${
          isScrolled ? "scale-[0.99]" : "scale-100"
        }`}
      >
        <div
          className={`backdrop-blur-xl rounded-full px-3.5 sm:px-7 py-2 sm:py-3 border flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 shadow-[0_16px_40px_rgba(0,0,0,0.1)] border-zinc-300/90"
              : "bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-zinc-200/80"
          }`}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <Image
              src="/logo.webp"
              alt="WEBXPAY Logo"
              width={160}
              height={26}
              priority
              className="h-5 sm:h-6.5 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-[14.5px] font-medium text-zinc-700">
            {/* Interactive Solutions Link with Modern Dropdown */}
            <div className="relative" ref={solutionsRef}>
              <button
                type="button"
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer select-none py-1 focus:outline-none ${
                  isSolutionsOpen ? "text-zinc-950 font-semibold" : "text-zinc-700 hover:text-zinc-950"
                }`}
                aria-expanded={isSolutionsOpen}
              >
                <span>{t.solutions}</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-zinc-500 ${
                    isSolutionsOpen ? "rotate-180 text-zinc-950" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Desktop Solutions Mega-Menu */}
              {isSolutionsOpen && (
                <div className="absolute top-full left-0 mt-3.5 w-[540px] sm:w-[580px] max-w-[calc(100vw-32px)] bg-white/98 backdrop-blur-2xl rounded-2xl border border-zinc-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)] p-5 sm:p-6 z-50 animate-in fade-in zoom-in-95 duration-200 text-left">
                  {/* Two-Column Brand Architecture Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* COLUMN 1: CORE SOLUTIONS */}
                    <div>
                      <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-zinc-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase font-space">
                          {t.coreSolutions}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {/* XGATEWAY */}
                        <a
                          href="/#xgateway"
                          onClick={() => setIsSolutionsOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200/70 transition-all duration-200 group cursor-pointer"
                        >
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 group-hover:bg-[#f1ff5c] group-hover:text-zinc-950 group-hover:border-yellow-300 transition-all duration-200 shrink-0 mt-0.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <rect x="2" y="5" width="20" height="14" rx="2" />
                              <path d="M2 10h20" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold font-sora text-zinc-950 group-hover:text-black">
                                XGATEWAY
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-space uppercase tracking-wider bg-indigo-50 text-indigo-700">
                                Online
                              </span>
                            </div>
                            <p className="text-[12px] text-zinc-500 font-manrope leading-snug mt-0.5">
                              Digital checkout, webhooks & multi-currency IPG
                            </p>
                          </div>
                        </a>

                        {/* XPOS */}
                        <a
                          href="/#xpos"
                          onClick={() => setIsSolutionsOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200/70 transition-all duration-200 group cursor-pointer"
                        >
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600 group-hover:bg-[#f1ff5c] group-hover:text-zinc-950 group-hover:border-yellow-300 transition-all duration-200 shrink-0 mt-0.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <rect x="5" y="2" width="14" height="20" rx="2" />
                              <path d="M12 18h.01" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold font-sora text-zinc-950 group-hover:text-black">
                                XPOS
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-space uppercase tracking-wider bg-emerald-50 text-emerald-700">
                                In-Store
                              </span>
                            </div>
                            <p className="text-[12px] text-zinc-500 font-manrope leading-snug mt-0.5">
                              Android smart POS terminals & instant counter sync
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* COLUMN 2: PRODUCT SUITE */}
                    <div>
                      <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-zinc-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase font-space">
                          {t.productSuite}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {/* XSPLIT */}
                        <a
                          href="/#xsplit"
                          onClick={() => setIsSolutionsOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-colors group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-[#f1ff5c] group-hover:text-zinc-950 transition-colors shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold font-sora text-zinc-900 block group-hover:text-black">
                              XSPLIT
                            </span>
                            <span className="text-[11px] text-zinc-400 font-manrope truncate block">
                              BNPL & split instalments
                            </span>
                          </div>
                        </a>

                        {/* XQR */}
                        <a
                          href="/#xqr"
                          onClick={() => setIsSolutionsOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-colors group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-[#f1ff5c] group-hover:text-zinc-950 transition-colors shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <rect x="3" y="3" width="7" height="7" rx="1" />
                              <rect x="14" y="3" width="7" height="7" rx="1" />
                              <rect x="3" y="14" width="7" height="7" rx="1" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 14h3v3h-3zm4 4h3v3h-3z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold font-sora text-zinc-900 block group-hover:text-black">
                              XQR
                            </span>
                            <span className="text-[11px] text-zinc-400 font-manrope truncate block">
                              Dynamic LankaQR, UPI & Alipay+
                            </span>
                          </div>
                        </a>

                        {/* XCOLLECTOR */}
                        <a
                          href="/#xcollector"
                          onClick={() => setIsSolutionsOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-colors group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-[#f1ff5c] group-hover:text-zinc-950 transition-colors shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold font-sora text-zinc-900 block group-hover:text-black">
                              XCOLLECTOR
                            </span>
                            <span className="text-[11px] text-zinc-400 font-manrope truncate block">
                              Field agent doorstep collections
                            </span>
                          </div>
                        </a>

                        {/* XSUPPLIER */}
                        <a
                          href="/#xsupplier"
                          onClick={() => setIsSolutionsOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-colors group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-[#f1ff5c] group-hover:text-zinc-950 transition-colors shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold font-sora text-zinc-900 block group-hover:text-black">
                              XSUPPLIER
                            </span>
                            <span className="text-[11px] text-zinc-400 font-manrope truncate block">
                              B2B buyer credit & instant payouts
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Brand Promise Bar */}
                  <div className="mt-4 pt-3.5 border-t border-zinc-100 flex items-center justify-between text-xs font-manrope text-zinc-500">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#f1ff5c] border border-amber-300" />
                      <span className="font-medium text-zinc-700">{t.brandPromise}</span>
                    </div>
                    <a
                      href="/#solutions"
                      onClick={() => setIsSolutionsOpen(false)}
                      className="font-semibold text-zinc-950 hover:underline flex items-center gap-1 group font-sora"
                    >
                      <span>{t.exploreAllSolutions}</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <Link href="/pricing" className="hover:text-zinc-950 transition cursor-pointer">
              {t.pricing}
            </Link>
            <a href="/#developer" className="hover:text-zinc-950 transition cursor-pointer">
              {t.developer}
            </a>
            <a href="/#media" className="hover:text-zinc-950 transition cursor-pointer">
              {t.media}
            </a>
            <a href="/#about-us" className="hover:text-zinc-950 transition cursor-pointer">
              {t.aboutUs}
            </a>
            <a href="/#careers" className="hover:text-zinc-950 transition cursor-pointer">
              {t.careers}
            </a>
          </div>

          {/* Desktop Language Switcher & Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher variant="pill" />
            <a
              href="https://dashboard.webxpay.com/login"
              className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 px-2.5 py-1.5 transition-colors cursor-pointer"
            >
              {t.login}
            </a>
            <a
              href="https://dashboard.webxpay.com/register"
              className="bg-[#22272D] text-white rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-zinc-950 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              {t.signup}
            </a>
          </div>

          {/* Mobile Header Controls: Language + Hamburger Toggle Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <LanguageSwitcher variant="pill" className="scale-90 origin-right" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-zinc-200 transition-colors focus:outline-none cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 sm:p-5 bg-white/98 backdrop-blur-2xl rounded-2xl border border-zinc-200/90 shadow-[0_20px_45px_rgba(0,0,0,0.12)] text-left animate-in fade-in slide-in-from-top-2 duration-200 font-manrope space-y-3.5 max-h-[calc(100dvh-80px)] overflow-y-auto w-full">
            {/* Solutions Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                className="flex items-center justify-between w-full py-2 text-sm font-bold text-zinc-900 font-sora"
              >
                <span>{t.solutions}</span>
                <svg
                  className={`w-4 h-4 text-zinc-500 transition-transform ${isMobileSolutionsOpen ? "rotate-180 text-zinc-950" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMobileSolutionsOpen && (
                <div className="pt-2 pl-2 space-y-2 border-l-2 border-zinc-100 ml-1">
                  <a
                    href="/#xgateway"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-zinc-800 py-1 hover:text-black font-sora"
                  >
                    XGATEWAY <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-space ml-1">{t.online}</span>
                  </a>
                  <a
                    href="/#xpos"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-zinc-800 py-1 hover:text-black font-sora"
                  >
                    XPOS <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-space ml-1">{t.inStore}</span>
                  </a>
                  <a
                    href="/#xsplit"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xs text-zinc-600 py-1 hover:text-black"
                  >
                    XSPLIT (BNPL &amp; Instalments)
                  </a>
                  <a
                    href="/#xqr"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xs text-zinc-600 py-1 hover:text-black"
                  >
                    XQR (Dynamic LankaQR, UPI)
                  </a>
                  <a
                    href="/#xcollector"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xs text-zinc-600 py-1 hover:text-black"
                  >
                    XCOLLECTOR (Doorstep Agent)
                  </a>
                  <a
                    href="/#xsupplier"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xs text-zinc-600 py-1 hover:text-black"
                  >
                    XSUPPLIER (B2B Credit &amp; Split)
                  </a>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2 text-sm font-medium text-zinc-700">
              <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-zinc-950">
                {t.pricing}
              </Link>
              <a href="/#developer" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-zinc-950">{t.developer}</a>
              <a href="/#media" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-zinc-950">{t.media}</a>
              <a href="/#about-us" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-zinc-950">{t.aboutUs}</a>
              <a href="/#careers" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-zinc-950">{t.careers}</a>
            </div>

            {/* Mobile Language Switcher */}
            <div className="pt-3 border-t border-zinc-100">
              <p className="text-[11px] font-semibold text-zinc-400 font-space uppercase tracking-wider mb-2">
                Language / භාෂාව / மொழி
              </p>
              <LanguageSwitcher variant="mobile" />
            </div>

            {/* Mobile Auth CTAs */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://dashboard.webxpay.com/login"
                className="w-full text-center py-2.5 rounded-full bg-zinc-100 text-zinc-900 text-sm font-semibold hover:bg-zinc-200 transition"
              >
                {t.login}
              </a>
              <a
                href="https://dashboard.webxpay.com/register"
                className="w-full text-center py-2.5 rounded-full bg-[#22272D] text-white text-sm font-semibold hover:bg-zinc-950 transition shadow-sm"
              >
                {t.signup}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
