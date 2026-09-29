"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function XSplitAnimation() {
  const shouldReduceMotion = useReducedMotion();
  // Animation Steps:
  // 0: Full product checkout (Deluxe Shirt · LKR 12,000)
  // 1: User chooses "Pay with XSPLIT (3 payments)"
  // 2: Amount divides into 3 installments with timeline; 1st payment gets green checkmark
  // 3: "Purchase confirmed" status banner
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 0) {
      timer = setTimeout(() => setStep(1), 1800);
    } else if (step === 1) {
      timer = setTimeout(() => setStep(2), 1200);
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 1800);
    } else if (step === 3) {
      timer = setTimeout(() => setStep(0), 2800);
    }

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="w-full max-w-lg mx-auto h-full flex flex-col justify-between p-3 select-none font-sans overflow-hidden">
      {/* Top Bar: Checkout Header & Security Badge */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider font-space">
            Instant Checkout
          </span>
        </div>
        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50/90 px-2 py-0.5 rounded-full border border-indigo-100">
          0% Interest
        </span>
      </div>

      {/* Main Dynamic Stage */}
      <div className="flex-1 flex flex-col justify-center my-auto py-1">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            /* STEP 0: Initial Cart Card with Full Price LKR 12,000 */
            <motion.div
              key="checkout-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="bg-white rounded-lg border border-zinc-200 shadow-xs p-3.5 flex flex-col gap-3"
            >
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100/60 border border-indigo-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 truncate">Deluxe Oxford Shirt</h4>
                    <span className="text-[9px] font-bold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">Qty 1</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-medium">Standard Delivery Included</p>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                <span className="text-[11px] text-zinc-500 font-medium">Order Total</span>
                <span className="text-sm font-black font-space text-zinc-950">LKR 12,000.00</span>
              </div>

              {/* Payment Option Selector */}
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                <div className="py-1.5 px-2 rounded-lg bg-zinc-50 border border-zinc-200 text-center">
                  <span className="text-[10px] font-medium text-zinc-500">Pay Full</span>
                  <p className="text-[10px] font-bold text-zinc-800">LKR 12,000</p>
                </div>
                <div className="py-1.5 px-2 rounded-lg bg-indigo-50/80 border border-indigo-200 text-center relative overflow-hidden">
                  <span className="text-[10px] font-bold text-indigo-700">3x XSPLIT</span>
                  <p className="text-[10px] font-extrabold font-space text-indigo-950">LKR 4,000/mo</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full py-2 bg-zinc-950 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs">
                <span>Select & Pay</span>
                <span className="text-[#f1ff5c]">→</span>
              </div>
            </motion.div>
          ) : (
            /* STEP 1, 2, 3: Divided Installments & Horizontal Timeline */
            <motion.div
              key="split-flow"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="flex flex-col gap-2.5"
            >
              {/* Split Header Info */}
              <div className="bg-white rounded-lg border border-zinc-200/90 px-3 py-2 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-1.5 text-zinc-600">
                  <span className="text-xs line-through text-zinc-400">LKR 12k</span>
                  <span className="text-xs text-zinc-400">→</span>
                  <span className="text-xs font-black font-space text-zinc-950">3 × LKR 4,000</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  0% APR
                </span>
              </div>

              {/* Horizontal Timeline Connector Rail */}
              <div className="px-3 py-1 relative">
                <div className="flex items-center justify-between relative z-10">
                  {/* Node 1: Today */}
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
                      step >= 2 ? "bg-emerald-600 text-white ring-2 ring-emerald-100" : "bg-indigo-600 text-white"
                    }`}>
                      {step >= 2 ? "✓" : "1"}
                    </div>
                    <span className="text-[9px] font-bold text-zinc-800">Today</span>
                  </div>

                  {/* Line 1 -> 2 */}
                  <div className="flex-1 h-0.5 mx-2 bg-gradient-to-r from-emerald-500 to-zinc-200" />

                  {/* Node 2: Month 2 */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-zinc-150 border border-zinc-300 text-zinc-600 flex items-center justify-center text-[9px] font-bold">
                      2
                    </div>
                    <span className="text-[9px] font-medium text-zinc-500">Month 2</span>
                  </div>

                  {/* Line 2 -> 3 */}
                  <div className="flex-1 h-0.5 mx-2 bg-zinc-200" />

                  {/* Node 3: Month 3 */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-zinc-150 border border-zinc-300 text-zinc-600 flex items-center justify-center text-[9px] font-bold">
                      3
                    </div>
                    <span className="text-[9px] font-medium text-zinc-500">Month 3</span>
                  </div>
                </div>
              </div>

              {/* 3 Installment Stack Rows (Clean, readable, no overflow) */}
              <div className="space-y-1.5">
                {/* Row 1: Today */}
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`px-3 py-2 rounded-lg border flex items-center justify-between transition-all ${
                    step >= 2
                      ? "bg-emerald-50/90 border-emerald-200 shadow-2xs"
                      : "bg-white border-indigo-200 ring-2 ring-indigo-500/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${step >= 2 ? "bg-emerald-500" : "bg-indigo-600 animate-pulse"}`} />
                    <div>
                      <span className="text-[11px] font-bold text-zinc-900 block leading-tight">1. Today</span>
                      <span className="text-[9px] text-zinc-400">Due at checkout</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black font-space text-zinc-950 block">LKR 4,000.00</span>
                    <span className={`text-[9px] font-bold ${step >= 2 ? "text-emerald-700" : "text-indigo-600"}`}>
                      {step >= 2 ? "Paid Now ✓" : "Processing"}
                    </span>
                  </div>
                </motion.div>

                {/* Row 2: Month 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="px-3 py-2 rounded-lg bg-white border border-zinc-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-300" />
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-800 block leading-tight">2. Month 2</span>
                      <span className="text-[9px] text-zinc-400">In 30 days</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black font-space text-zinc-700 block">LKR 4,000.00</span>
                    <span className="text-[9px] text-zinc-400 font-medium">Auto-debit</span>
                  </div>
                </motion.div>

                {/* Row 3: Month 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-3 py-2 rounded-lg bg-white border border-zinc-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-300" />
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-800 block leading-tight">3. Month 3</span>
                      <span className="text-[9px] text-zinc-400">In 60 days</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black font-space text-zinc-700 block">LKR 4,000.00</span>
                    <span className="text-[9px] text-zinc-400 font-medium">Auto-debit</span>
                  </div>
                </motion.div>
              </div>

              {/* Purchase Confirmed Banner */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-zinc-950 text-white rounded-lg px-3 py-2 flex items-center justify-between shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#f1ff5c] text-zinc-950 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                      <span className="text-[11px] font-bold text-white">Purchase Confirmed</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#f1ff5c]">Order #902</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer Note */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-500">
        <span className="flex items-center gap-1 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Scheduled Auto-Debit
        </span>
        <span className="font-semibold text-zinc-700">Zero Hidden Fees</span>
      </div>
    </div>
  );
}
