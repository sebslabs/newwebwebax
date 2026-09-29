"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function XQRAnimation() {
  const shouldReduceMotion = useReducedMotion();
  // Steps:
  // 0: QR Generated + Laser Scan Line active
  // 1: Network conduits activate sequentially (LankaQR -> UPI -> Alipay+)
  // 2: Payment executed -> QR morphs into Success Screen (Payment received LKR 8,500)
  // 3: Hold success state and pulse
  const [step, setStep] = useState(0);
  const [activeNetwork, setActiveNetwork] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 0) {
      setActiveNetwork(0);
      timer = setTimeout(() => setStep(1), 1800);
    } else if (step === 1) {
      // cycle through network indicators
      const n1 = setTimeout(() => setActiveNetwork(1), 400);
      const n2 = setTimeout(() => setActiveNetwork(2), 900);
      const n3 = setTimeout(() => setActiveNetwork(3), 1400);
      timer = setTimeout(() => setStep(2), 2200);

      return () => {
        clearTimeout(n1);
        clearTimeout(n2);
        clearTimeout(n3);
        clearTimeout(timer);
      };
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 1200);
    } else if (step === 3) {
      timer = setTimeout(() => setStep(0), 2400);
    }

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="w-full max-w-lg mx-auto h-full flex flex-col justify-between p-3.5 select-none font-sans overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold font-space uppercase tracking-wider text-zinc-500">
            Universal QR Gateway
          </span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
          Dynamic Routing
        </span>
      </div>

      {/* Main Stage: QR Terminal vs Success Card */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[190px]">
        <AnimatePresence mode="wait">
          {step < 2 ? (
            /* ACTIVE QR SCANNER STAGE */
            <motion.div
              key="qr-stage"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              {/* Payment Terminal Card Container */}
              <div className="relative bg-white rounded-lg border border-zinc-200 shadow-sm p-3.5 flex flex-col items-center">
                {/* Contactless symbol on top */}
                <div className="w-full flex items-center justify-between text-[10px] text-zinc-400 mb-2 font-mono">
                  <span>TERMINAL #01</span>
                  <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 7.5a6 6 0 0 1 0 9m3.5-11a9 9 0 0 1 0 13m3.5-15a12 12 0 0 1 0 17" />
                  </svg>
                </div>

                {/* Central QR Code Block */}
                <div className="relative w-28 h-28 bg-white rounded-md p-2 border border-zinc-150 shadow-inner flex items-center justify-center overflow-hidden">
                  {/* Subtle Vertical Scanning Line */}
                  <motion.div
                    className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_8px_#10b981] z-20 pointer-events-none"
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            top: ["8%", "92%", "8%"],
                          }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Clean SVG QR Matrix */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-900 fill-current">
                    {/* Top-Left Finder */}
                    <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="5" />
                    <rect x="12" y="12" width="14" height="14" rx="2" fill="currentColor" />
                    {/* Top-Right Finder */}
                    <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="5" />
                    <rect x="74" y="12" width="14" height="14" rx="2" fill="currentColor" />
                    {/* Bottom-Left Finder */}
                    <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="5" />
                    <rect x="12" y="74" width="14" height="14" rx="2" fill="currentColor" />
                    {/* Data Cells */}
                    <rect x="40" y="8" width="8" height="8" rx="1.5" />
                    <rect x="52" y="16" width="8" height="8" rx="1.5" />
                    <rect x="40" y="24" width="8" height="8" rx="1.5" />
                    <rect x="8" y="42" width="8" height="8" rx="1.5" />
                    <rect x="22" y="46" width="8" height="8" rx="1.5" />
                    <rect x="38" y="42" width="8" height="8" rx="1.5" />
                    <rect x="48" y="42" width="8" height="8" rx="1.5" />
                    <rect x="58" y="46" width="8" height="8" rx="1.5" />
                    <rect x="74" y="42" width="8" height="8" rx="1.5" />
                    <rect x="86" y="46" width="8" height="8" rx="1.5" />
                    <rect x="42" y="60" width="8" height="8" rx="1.5" />
                    <rect x="56" y="66" width="8" height="8" rx="1.5" />
                    <rect x="44" y="78" width="8" height="8" rx="1.5" />
                    <rect x="70" y="72" width="8" height="8" rx="1.5" />
                    <rect x="84" y="80" width="8" height="8" rx="1.5" />
                    <rect x="72" y="86" width="8" height="8" rx="1.5" />
                  </svg>
                </div>

                {/* Subtext */}
                <span className="text-[10px] text-zinc-500 font-medium mt-2">
                  Scan with any banking or wallet app
                </span>
              </div>
            </motion.div>
          ) : (
            /* PAYMENT CONFIRMED SUCCESS RECEIPT */
            <motion.div
              key="success-stage"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full bg-white rounded-lg border border-emerald-200/90 shadow-md p-4 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Soft emerald background sheen */}
              <div className="absolute inset-0 bg-radial from-emerald-100/40 to-transparent pointer-events-none" />

              {/* Animated Success Check Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.4 }}
                className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-xs"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-space">
                Payment Received
              </span>

              <p className="text-xl font-black font-space text-zinc-950 mt-1 mb-1">
                LKR 8,500.00
              </p>

              <div className="w-full pt-2 mt-1 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-500">
                <span className="font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Instant Settlement
                </span>
                <span className="font-mono text-zinc-400">Ref #QR-8821</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Network Conduits & Badges (LankaQR, UPI, Alipay+) */}
      <div className="mt-2 pt-2 border-t border-zinc-100">
        <div className="flex items-center justify-between gap-1.5">
          {/* LankaQR Badge */}
          <div
            className={`flex-1 flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg border text-[10px] font-bold transition-all ${
              activeNetwork >= 1
                ? "bg-amber-50/90 border-[#F7931E]/60 text-[#d97706] shadow-xs"
                : "bg-zinc-50 border-zinc-200/70 text-zinc-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F7931E]" />
            <span>LankaQR</span>
          </div>

          {/* UPI Badge */}
          <div
            className={`flex-1 flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg border text-[10px] font-bold transition-all ${
              activeNetwork >= 2
                ? "bg-emerald-50/90 border-[#097939]/60 text-[#097939] shadow-xs"
                : "bg-zinc-50 border-zinc-200/70 text-zinc-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#097939]" />
            <span>UPI</span>
          </div>

          {/* Alipay+ Badge */}
          <div
            className={`flex-1 flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg border text-[10px] font-bold transition-all ${
              activeNetwork >= 3
                ? "bg-blue-50/90 border-[#1677FF]/60 text-[#1677FF] shadow-xs"
                : "bg-zinc-50 border-zinc-200/70 text-zinc-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]" />
            <span>Alipay+</span>
          </div>
        </div>

        {/* Dynamic connection caption */}
        <p className="text-[9px] text-zinc-400 text-center mt-1.5 font-medium">
          {step < 2 ? "Multi-rail routing through a single dynamic QR" : "Settled directly to local merchant account"}
        </p>
      </div>
    </div>
  );
}
