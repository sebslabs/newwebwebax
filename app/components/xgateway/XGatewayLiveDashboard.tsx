"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";

export default function XGatewayLiveDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-40px", once: false });
  const shouldReduceMotion = useReducedMotion();

  // Animation Stages (Continuous 9.5s story loop):
  // 0: STEP 01 - NEW VISITOR (Avatar ripple + Visitor Landed on Checkout)
  // 1: STEP 02 - HIGH INTENT DETECTED (Probability 20% -> 42% -> 68% + Fill Bar)
  // 2: STEP 03 - CUSTOMER IDENTIFIED (John Doe + 3 Staggered Checkmarks)
  // 3: STEP 04 - CHECKOUT CREATED (Amount 0 -> 24,500 + Simulated Cursor Click "Pay Now")
  // 4: STEP 05 - PAYMENT SUCCESS & WEBHOOK (Settled + Animated data pulse to Webhook 200 OK)
  // 5: STEP 06 - LIVE SUMMARY STORE UPDATE (Revenue 482.5k -> 507k, Conversions 18 -> 19)
  const [step, setStep] = useState<number>(0);

  // Dynamic values that count up
  const [conversionProb, setConversionProb] = useState<number>(20);
  const [checkoutAmount, setCheckoutAmount] = useState<number>(0);
  const [todayRevenue, setTodayRevenue] = useState<number>(482500);
  const [todayConversions, setTodayConversions] = useState<number>(18);
  const [eventsPerMin, setEventsPerMin] = useState<number>(12);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (!isInView) return;

    let timer: NodeJS.Timeout;

    if (step === 0) {
      // Step 0: New Visitor arrives
      setConversionProb(20);
      setCheckoutAmount(0);
      setTodayRevenue(482500);
      setTodayConversions(18);
      setEventsPerMin(12);
      setIsProcessing(false);

      timer = setTimeout(() => setStep(1), 1600);
    } else if (step === 1) {
      // Step 1: High Intent Detected & Probability increases 20 -> 42 -> 68
      const p1 = setTimeout(() => setConversionProb(42), 350);
      const p2 = setTimeout(() => setConversionProb(68), 850);
      setEventsPerMin(14);

      timer = setTimeout(() => setStep(2), 2000);
      return () => {
        clearTimeout(p1);
        clearTimeout(p2);
        clearTimeout(timer);
      };
    } else if (step === 2) {
      // Step 2: Customer Identified (staggered checklist John Doe)
      timer = setTimeout(() => setStep(3), 2000);
    } else if (step === 3) {
      // Step 3: Checkout Created (Amount counts up 0 -> 24500, cursor clicks pay)
      const a1 = setTimeout(() => setCheckoutAmount(12000), 200);
      const a2 = setTimeout(() => setCheckoutAmount(24500), 500);
      const clickTimer = setTimeout(() => setIsProcessing(true), 1300);

      timer = setTimeout(() => setStep(4), 2200);
      return () => {
        clearTimeout(a1);
        clearTimeout(a2);
        clearTimeout(clickTimer);
        clearTimeout(timer);
      };
    } else if (step === 4) {
      // Step 4: Payment Successful & Webhook Delivered (200 OK 32ms)
      timer = setTimeout(() => setStep(5), 2100);
    } else if (step === 5) {
      // Step 5: Summary Update
      const r1 = setTimeout(() => {
        setTodayRevenue(507000);
        setTodayConversions(19);
      }, 400);

      // Hold, then loop smoothly
      timer = setTimeout(() => setStep(0), 3000);
      return () => {
        clearTimeout(r1);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, [step, isInView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl bg-white/80 backdrop-blur-md border border-zinc-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-3 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden h-[500px] sm:h-[540px] select-none font-sans"
    >
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:16px_16px] opacity-75 pointer-events-none" />

      {/* Ambient Micro Glow Orbs */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#f1ff5c]/25 rounded-full blur-3xl pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          1. TOP CONTROL BAR: Fixed height 36px
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between pb-2.5 h-[36px] border-b border-zinc-200/70 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-[11px] font-bold font-space uppercase tracking-wider text-zinc-500">
            Checkout Activity
          </span>
          <span className="text-zinc-300 hidden sm:inline">•</span>
          <span className="text-[11px] font-medium text-zinc-600 hidden sm:inline">
            {step === 0 && "Visitor Landed"}
            {step === 1 && "High Intent Scored"}
            {step === 2 && "Customer Identified"}
            {step === 3 && "Checkout Initialized"}
            {step === 4 && "Settlement & Webhook"}
            {step === 5 && "Ledger Synchronized"}
          </span>
        </div>

        {/* Live System Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-zinc-200/90 rounded-full px-2.5 sm:px-3 py-0.5 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-extrabold font-space text-zinc-950 tracking-wider">
            LIVE
          </span>
          <span className="text-zinc-300 text-[10px]">|</span>
          <span className="text-[10px] font-mono font-medium text-zinc-600">
            {eventsPerMin} e/m
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STAGE 1 & 2: VISITOR & HIGH INTENT CARDS (Fixed height 100px)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-3.5 h-[98px] sm:h-[108px] shrink-0 my-1 sm:my-2">
        
        {/* CARD 1: NEW VISITOR */}
        <div
          className={`h-full rounded-xl p-2 sm:p-3 border transition-colors duration-300 flex flex-col justify-between ${
            step === 0
              ? "bg-white border-indigo-300 shadow-sm ring-1 ring-indigo-500/20 opacity-100"
              : "bg-white/95 border-zinc-200/80 shadow-2xs opacity-60"
          }`}
        >
          {/* Avatar with Live Ripple Aura */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face"
                  alt="New Visitor"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-2 ring-white shadow-2xs"
                />
                {step === 0 && (
                  <span className="absolute -inset-1 rounded-full border border-indigo-400 animate-ping opacity-60 pointer-events-none" />
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
              </div>

              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs font-bold text-zinc-950 font-space block leading-tight truncate">
                  New Visitor
                </span>
                <span className="text-[8px] sm:text-[9px] text-zinc-400 font-medium truncate block">#9021</span>
              </div>
            </div>

            <span className="text-[8px] sm:text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
              Active
            </span>
          </div>

          {/* Activity Detail */}
          <div className="bg-zinc-50/90 rounded-lg sm:rounded-xl px-1.5 sm:px-2.5 py-1 sm:py-1.5 border border-zinc-150 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-zinc-700 truncate">
              <span className="truncate">Visitor on checkout</span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 font-semibold shrink-0">20v</span>
          </div>
        </div>

        {/* CARD 2: BEHAVIOR & HIGH INTENT */}
        <div
          className={`h-full rounded-xl p-2 sm:p-3 border transition-colors duration-300 flex flex-col justify-between ${
            step === 1
              ? "bg-white border-amber-300 shadow-sm ring-1 ring-amber-500/20 opacity-100"
              : "bg-white/95 border-zinc-200/80 shadow-2xs opacity-60"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 min-w-0">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-amber-100 text-amber-700 flex items-center justify-center text-[9px] sm:text-[10px] font-bold shrink-0">
                ⚡
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-zinc-950 font-space truncate">
                High Intent
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-200/70 shrink-0">
              3 cart
            </span>
          </div>

          {/* Conversion Probability Bar & Metric */}
          <div className="bg-zinc-50/90 rounded-lg sm:rounded-xl px-1.5 sm:px-2.5 py-1 sm:py-1.5 border border-zinc-150">
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] mb-0.5">
              <span className="text-zinc-500 font-medium truncate">Conv. Prob.</span>
              <span className="font-extrabold font-space text-zinc-950 shrink-0">
                {conversionProb}%
              </span>
            </div>

            {/* Smooth Horizontal Probability Bar */}
            <div className="w-full h-1 sm:h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 rounded-full"
                animate={{ width: `${conversionProb}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. STAGE 3 & 4: CUSTOMER IDENTIFIED & CHECKOUT / SETTLEMENT (Fixed height 220px)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3.5 h-[220px] shrink-0 my-2 items-stretch">
        
        {/* CARD 3: IDENTIFIED CUSTOMER (Fixed 220px height, NO scale) */}
        <div
          className={`hidden sm:flex sm:col-span-5 h-full rounded-xl p-3.5 border transition-colors duration-300 flex-col justify-between ${
            step === 2
              ? "bg-white border-blue-300 shadow-sm ring-1 ring-blue-500/20 opacity-100"
              : "bg-white/95 border-zinc-200/80 shadow-2xs opacity-60"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                alt="John Doe"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-2xs"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-900 font-space block leading-tight truncate">
                  John Doe
                </span>
                <span className="text-[9px] text-zinc-400 font-medium">Customer Identified</span>
              </div>
            </div>

            {/* Sequential Checklist Reveals with Stagger */}
            <div className="space-y-1.5 pt-1">
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: step >= 2 ? 1 : 0.3, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-1.5 text-[10px] text-zinc-600"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[8px] shrink-0">
                  ✓
                </span>
                <span>Newsletter signup</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: step >= 2 ? 1 : 0.3, x: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="flex items-center gap-1.5 text-[10px] text-zinc-600"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[8px] shrink-0">
                  ✓
                </span>
                <span>Returning customer</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: step >= 2 ? 1 : 0.3, x: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                className="flex items-center gap-1.5 text-[10px] text-zinc-600"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[8px] shrink-0">
                  ✓
                </span>
                <span>3 products in cart</span>
              </motion.div>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-150 flex items-center justify-between text-[9px] text-zinc-400">
            <span>Identity Trust</span>
            <span className="text-emerald-700 font-bold font-mono">99.4% Verified</span>
          </div>
        </div>

        {/* CARD 4: CHECKOUT CREATED → PAYMENT SUCCESS (Fixed 220px height, NO scale) */}
        <div
          className={`col-span-12 sm:col-span-7 h-full rounded-xl p-3.5 border transition-colors duration-300 relative overflow-hidden flex flex-col justify-between ${
            step === 4
              ? "bg-gradient-to-br from-white via-emerald-50/40 to-white border-emerald-300 shadow-sm ring-1 ring-emerald-500/20 opacity-100"
              : step === 3
              ? "bg-white border-indigo-300 shadow-sm ring-1 ring-indigo-500/20 opacity-100"
              : "bg-white/95 border-zinc-200/80 shadow-2xs opacity-60"
          }`}
        >
          {/* Top Row: Order Header (Fixed 30px) */}
          <div className="flex items-center justify-between h-[30px] shrink-0">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 font-space block">
                {step >= 4 ? "Transaction Settled" : "Checkout Created"}
              </span>
              <span className="text-[11px] font-bold text-zinc-800 font-mono">
                John Doe • Order #XG-8421
              </span>
            </div>

            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
              step >= 4
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : isProcessing
                ? "bg-amber-50 text-amber-800 border-amber-200 animate-pulse"
                : "bg-indigo-50 text-indigo-700 border-indigo-100"
            }`}>
              {step >= 4 ? "Settled ✓" : isProcessing ? "Processing..." : "Pending Payment"}
            </span>
          </div>

          {/* Amount Display (Fixed 48px) */}
          <div className="bg-zinc-50/90 rounded-xl px-2.5 py-1.5 border border-zinc-150 h-[48px] shrink-0 flex items-baseline justify-between">
            <div>
              <span className="text-[9px] text-zinc-400 font-medium block">Currency: LKR</span>
              <span className="text-[10px] text-zinc-600 font-semibold">Total Amount</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-zinc-400 font-space">LKR</span>
              <span className="text-lg sm:text-xl font-black font-space text-zinc-950 tracking-tight">
                {checkoutAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* ACTION / SETTLED SLOT (Strictly Fixed 74px height - PREVENTS ANY LAYOUT SHIFT) */}
          <div className="h-[74px] shrink-0 flex flex-col justify-center relative overflow-hidden">
            {step <= 3 ? (
              <div className="relative">
                {/* Pay Now Button */}
                <div className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-xs transition-colors ${
                  isProcessing ? "bg-indigo-900 text-white" : "bg-zinc-950 text-white"
                }`}>
                  <span>{isProcessing ? "Processing Payment..." : "Pay with XGATEWAY"}</span>
                  <span className="text-[#f1ff5c]">{isProcessing ? "⏳" : "→"}</span>
                </div>

                {/* Simulated Moving Cursor (Appears only during Checkout step) */}
                {step === 3 && !shouldReduceMotion && (
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 25 }}
                    animate={{
                      opacity: [0, 1, 1, 0.9, 0],
                      x: [ -20, 60, 90, 90, 110 ],
                      y: [ 25, 5, -8, -8, -12 ],
                      scale: [ 1, 1, 0.88, 1, 1 ]
                    }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="absolute pointer-events-none z-30"
                  >
                    <svg className="w-5 h-5 text-zinc-900 drop-shadow-md fill-current" viewBox="0 0 24 24">
                      <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.679z" />
                    </svg>
                  </motion.div>
                )}
              </div>
            ) : (
              /* STEP 4 & 5: Settled State + Real-time Webhook Notification with Data Pulse (Exactly 74px) */
              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                    <span>PAYMENT SUCCESSFUL</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-700">Status: Settled</span>
                </div>

                {/* Webhook Delivered Card with Traveling Data Pulse Line */}
                <div className="relative flex items-center justify-between bg-zinc-950 text-white rounded-lg px-2.5 py-1 shadow-xs overflow-hidden">
                  {/* Visual Data Pulse travelling across top border */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f1ff5c] to-emerald-400"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f1ff5c] animate-ping" />
                    <span className="text-[9px] font-bold text-zinc-200">Webhook Delivered</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px]">
                    <span className="text-emerald-400 font-bold">200 OK</span>
                    <span className="text-zinc-400">32ms</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. STAGE 5 & 6: TODAY'S REAL-TIME STORE SUMMARY (Fixed height 96px)
      ───────────────────────────────────────────────────────────── */}
      <div
        className={`relative z-10 rounded-xl p-3 border transition-colors duration-300 h-[96px] shrink-0 flex flex-col justify-between ${
          step === 5
            ? "bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-500/20 opacity-100"
            : "bg-white/85 border-zinc-200/80 shadow-2xs opacity-75"
        }`}
      >
        <div className="flex items-center justify-between h-[18px]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black font-space tracking-wider uppercase text-zinc-400">
              TODAY'S STORE SUMMARY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>

          <span className={`text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 transition-opacity duration-200 ${
            step === 5 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
            <span>↑</span>
            <span>+LKR 24,500 Added</span>
          </span>
        </div>

        {/* 3 Metric Mini Cards */}
        <div className="grid grid-cols-3 gap-2">
          
          {/* Revenue */}
          <div className="bg-zinc-50/90 rounded-xl px-2 py-1 border border-zinc-150">
            <span className="text-[9px] font-medium text-zinc-400 block">Revenue</span>
            <p className="text-xs sm:text-sm font-black font-space text-zinc-950">
              LKR {todayRevenue.toLocaleString()}
            </p>
          </div>

          {/* Conversions */}
          <div className="bg-zinc-50/90 rounded-xl px-2 py-1 border border-zinc-150">
            <span className="text-[9px] font-medium text-zinc-400 block">Conversions</span>
            <div className="flex items-baseline gap-1">
              <p className="text-xs sm:text-sm font-black font-space text-zinc-950">
                {todayConversions}
              </p>
              {step === 5 && (
                <span className="text-[9px] font-bold text-emerald-600">+1</span>
              )}
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-zinc-50/90 rounded-xl px-2 py-1 border border-zinc-150">
            <span className="text-[9px] font-medium text-zinc-400 block">Settled</span>
            <p className="text-xs sm:text-sm font-black font-space text-emerald-700">
              97.8%
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
