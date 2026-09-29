"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface ServiceItem {
  id: string;
  label: string;
  shortLabel: string;
  tooltip: string;
  accent: string;
  hoverBorder: string;
  icon: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    id: "crypto",
    label: "Crypto",
    shortLabel: "Crypto",
    tooltip: "Crypto to LKR Remittance",
    accent: "text-[#f1ff5c]",
    hoverBorder: "hover:border-[#f1ff5c] hover:shadow-[0_12px_32px_rgba(241,255,92,0.35)]",
    icon: (
      <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
        <div className="absolute -left-0.5 top-0.5 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-xs">
          <span className="text-[9px] sm:text-[10px] font-black text-[#f1ff5c] leading-none">₮</span>
        </div>
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <div className="absolute -right-0.5 bottom-0.5 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#f1ff5c] border border-amber-300 flex items-center justify-center shadow-xs">
          <span className="text-[7px] sm:text-[8px] font-black text-zinc-950 leading-none">Rs</span>
        </div>
      </div>
    ),
  },
  {
    id: "bank",
    label: "Transfer",
    shortLabel: "Bank",
    tooltip: "Direct Bank Transfer",
    accent: "text-zinc-800",
    hoverBorder: "hover:border-zinc-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]",
    icon: (
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white text-zinc-800 transition-colors flex items-center justify-center">
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z" />
        </svg>
      </div>
    ),
  },
  {
    id: "bill",
    label: "Bill Pay",
    shortLabel: "Bills",
    tooltip: "Bill & Utility Payments",
    accent: "text-amber-500",
    hoverBorder: "hover:border-amber-300/60 hover:shadow-[0_12px_32px_rgba(251,191,36,0.2)]",
    icon: (
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-zinc-100 group-hover:bg-amber-400 group-hover:text-zinc-950 text-zinc-800 transition-colors flex items-center justify-center">
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    ),
  },
  {
    id: "govpay",
    label: "GovPay",
    shortLabel: "Gov",
    tooltip: "GovPay Government Services",
    accent: "text-blue-700",
    hoverBorder: "hover:border-blue-200/70 hover:shadow-[0_12px_32px_rgba(29,70,150,0.12)]",
    icon: (
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-br from-amber-50 to-blue-50 border border-amber-200/60 flex items-center justify-center">
        <div className="flex items-center tracking-tighter">
          <span className="text-[11px] sm:text-[12px] font-black text-[#F7931E] leading-none">G</span>
          <span className="text-[11px] sm:text-[12px] font-black text-[#1D4696] leading-none">P</span>
        </div>
      </div>
    ),
  },
];

const MODAL_CONTENT: Record<string, { title: string; body: string; cta: string }> = {
  crypto: {
    title: "Crypto to LKR Remittance",
    body: "Convert USDT and USDC instantly into Sri Lankan Rupees (LKR) with direct settlement to local bank accounts at real-time market rates.",
    cta: "Explore Rates",
  },
  bank: {
    title: "Direct Bank Transfer",
    body: "Seamlessly accept interbank payments across all Sri Lankan commercial banks via CEFTS and SLIPS with zero reconciliation hassle.",
    cta: "View Supported Banks",
  },
  bill: {
    title: "Bill Pay Integration",
    body: "Allow your customers to pay electricity, water, telecom, and insurance bills directly from your portal with instant confirmation receipts.",
    cta: "Learn More",
  },
  govpay: {
    title: "GovPay Digital Services",
    body: "Pay government fees, municipal charges, revenue taxes, and public utilities securely through Sri Lanka's national GovPay initiative.",
    cta: "GovPay Portal",
  },
};

const staggerVariants: Variants = {
  hidden: { opacity: 0, x: 16, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.25, ease: "easeOut" },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 12,
    scale: 0.9,
    transition: { delay: i * 0.03, duration: 0.18, ease: "easeIn" },
  }),
};

export default function FloatingActions() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* ── Fixed right-side dock ── */}
      <aside
        aria-label="Quick Access Services"
        className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 flex flex-col items-center gap-2 sm:gap-3 select-none"
      >
        {/* ═══ DESKTOP: always-visible 4 action buttons ═══ */}
        <div className="hidden sm:flex flex-col items-center gap-3">
          {SERVICES.map((svc) => (
            <div key={svc.id} className="relative group">
              <button
                type="button"
                onClick={() => setActiveInfo(activeInfo === svc.id ? null : svc.id)}
                className={`relative w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.07)] ${svc.hoverBorder} hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-0.5 p-1.5 font-space`}
                aria-label={svc.tooltip}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#f1ff5c]/0 to-[#f1ff5c]/12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {svc.icon}
                <span className="text-[9px] font-bold text-zinc-900 tracking-tight leading-none">{svc.label}</span>
              </button>
              {/* Tooltip */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-zinc-950/95 backdrop-blur-md text-white text-[11px] font-medium rounded-xl shadow-xl whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 font-space flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f1ff5c]" />
                {svc.tooltip}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-zinc-950" />
              </div>
            </div>
          ))}
        </div>

        {/* ═══ MOBILE: collapsed launcher → staggered expand ═══ */}
        <div className="flex sm:hidden flex-col items-center gap-2">
          <AnimatePresence mode="popLayout">
            {isExpanded &&
              SERVICES.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  className="relative group"
                  custom={SERVICES.length - 1 - i}
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveInfo(activeInfo === svc.id ? null : svc.id);
                      setIsExpanded(false);
                    }}
                    className={`relative w-11 h-11 rounded-xl bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-[0_6px_18px_rgba(0,0,0,0.1)] ${svc.hoverBorder} active:scale-95 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-0.5 p-1`}
                    aria-label={svc.tooltip}
                  >
                    {svc.icon}
                    <span className="text-[7.5px] font-bold text-zinc-900 tracking-tight leading-none">{svc.shortLabel}</span>
                  </button>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Mobile launcher toggle */}
          <motion.button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.1)] flex items-center justify-center text-zinc-800 active:scale-95 transition-all duration-200"
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label={isExpanded ? "Close quick services" : "Open quick services"}
            aria-expanded={isExpanded}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>
        </div>

        {/* ═══ Live Support Chat Button ═══ */}
        <div className="relative group">
          <button
            type="button"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-[20px] bg-zinc-950 text-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.38)] hover:scale-[1.06] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center border border-zinc-800"
            aria-label="Open support chat"
          >
            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-zinc-950" />
            </span>
            {isChatOpen ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </button>
          {!isChatOpen && (
            <div className="hidden sm:flex absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-zinc-950/95 backdrop-blur-md text-white text-[11px] font-medium rounded-xl shadow-xl whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 font-space items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Support Chat
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-zinc-950" />
            </div>
          )}
        </div>
      </aside>

      {/* ── Service info modal ── */}
      <AnimatePresence>
        {activeInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setActiveInfo(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xl p-5 sm:p-7 max-w-sm w-full font-manrope relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveInfo(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 transition-colors p-1 rounded-lg hover:bg-zinc-100"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {activeInfo && MODAL_CONTENT[activeInfo] && (
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center mb-4 border border-zinc-800">
                    <span className="text-[#f1ff5c] text-lg font-black font-space">
                      {SERVICES.find((s) => s.id === activeInfo)?.shortLabel?.[0]}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 font-sora mb-2">
                    {MODAL_CONTENT[activeInfo].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-5">
                    {MODAL_CONTENT[activeInfo].body}
                  </p>
                  <button
                    onClick={() => setActiveInfo(null)}
                    className="w-full py-2.5 bg-zinc-950 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition font-sora"
                  >
                    {MODAL_CONTENT[activeInfo].cta}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Live chat drawer ── */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 sm:right-6 bottom-[76px] sm:bottom-24 z-50 w-[calc(100vw-32px)] sm:w-[348px] max-w-[348px] bg-white rounded-2xl border border-zinc-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] p-4 sm:p-5 font-manrope text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold text-xs font-space">
                  W
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950 leading-tight font-sora">WEBXPAY Support</h4>
                  <p className="text-[11px] text-emerald-600 font-medium">Online · ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 transition-colors p-1 rounded-lg hover:bg-zinc-100"
                aria-label="Close chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Chat body */}
            <div className="space-y-3 mb-4 max-h-52 overflow-y-auto pr-0.5 no-scrollbar">
              <div className="bg-zinc-100 rounded-2xl rounded-tl-sm p-3 text-xs text-zinc-800 leading-relaxed">
                Hello! 👋 Welcome to WEBXPAY. How can we assist your business today?
              </div>
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Quick Inquiries</p>
                {[
                  "💳 How to integrate XGATEWAY?",
                  "⚡ Activate Crypto to LKR Remittance",
                  "🏛️ GovPay merchant onboarding",
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="w-full text-left px-3 py-2 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/60 rounded-xl text-xs font-medium text-zinc-800 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            {/* Input */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-100">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-full px-3.5 py-2 text-xs text-zinc-800 focus:outline-none focus:border-zinc-400"
              />
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center hover:bg-zinc-800 transition shrink-0"
                aria-label="Send message"
              >
                <svg className="w-3.5 h-3.5 rotate-45 -mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
