"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function XSupplierAnimation() {
  const shouldReduceMotion = useReducedMotion();
  // Steps:
  // 0: Buyer credit line initialized and approved (LKR 1,200,000)
  // 1: Transaction initiated, dots flowing down bifurcated pipeline
  // 2: Distribution settled: Supplier gets LKR 1,176,000 (T+0 Instant) + Fee LKR 24,000
  // 3: Hold settled state, then reset
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 0) {
      timer = setTimeout(() => setStep(1), 1800);
    } else if (step === 1) {
      timer = setTimeout(() => setStep(2), 2200);
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 2000);
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
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-[10px] font-bold font-space uppercase tracking-wider text-zinc-500">
            Supply Chain Financing Flow
          </span>
        </div>
        <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
          T+0 Direct Settlement
        </span>
      </div>

      {/* Main Flow Stage */}
      <div className="flex-1 flex flex-col justify-between">
        
        {/* 1. TOP NODE: Buyer Credit Facility Card */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-zinc-200/90 p-2.5 shadow-2xs relative z-10"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              Buyer Credit Facility
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
              60 Days Deferred
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <p className="text-sm sm:text-[15px] font-black font-space text-zinc-950">
              LKR 1,200,000.00
            </p>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Credit Approved ✓
            </span>
          </div>
        </motion.div>

        {/* 2. SPLIT PIPELINE: SVG Flow Conduits with Animated Particles */}
        <div className="relative h-14 w-full flex items-center justify-center my-0.5 overflow-hidden">
          <svg viewBox="0 0 240 60" className="w-full h-full">
            <defs>
              <linearGradient id="supplierFlow" x1="50%" y1="0%" x2="25%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="feeFlow" x1="50%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            {/* Left Channel: To Supplier (98% Flow) */}
            <path
              d="M 120 0 L 120 18 C 120 35, 65 30, 65 60"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2.5"
            />
            {step >= 1 && (
              <motion.path
                d="M 120 0 L 120 18 C 120 35, 65 30, 65 60"
                fill="none"
                stroke="url(#supplierFlow)"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
              />
            )}

            {/* Right Channel: To Platform / Financing Fee (2% Flow) */}
            <path
              d="M 120 0 L 120 18 C 120 35, 180 30, 180 60"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            {step >= 1 && (
              <motion.path
                d="M 120 0 L 120 18 C 120 35, 180 30, 180 60"
                fill="none"
                stroke="url(#feeFlow)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
              />
            )}

            {/* Travelling Value Dots */}
            {step >= 1 && !shouldReduceMotion && (
              <>
                {/* Main value particle traveling to Supplier */}
                <motion.circle
                  r="3.5"
                  fill="#10b981"
                  animate={{
                    cx: [120, 120, 65],
                    cy: [0, 20, 60],
                    opacity: [0, 1, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: step === 1 ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
                {/* Secondary particle traveling to Fee */}
                <motion.circle
                  r="2.5"
                  fill="#64748b"
                  animate={{
                    cx: [120, 120, 180],
                    cy: [0, 20, 60],
                    opacity: [0, 1, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: step === 1 ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              </>
            )}

            {/* Center Split Anchor Badge */}
            <circle cx="120" cy="20" r="7" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="120" y="23" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#64748b">
              %
            </text>
          </svg>
        </div>

        {/* 3. DESTINATION CARDS: Supplier Payout + Fee Breakdown */}
        <div className="space-y-1.5">
          {/* Supplier Payout Card (Primary Receiver) */}
          <div
            className={`rounded-lg p-2.5 border transition-all ${
              step >= 2
                ? "bg-emerald-50/90 border-emerald-200 shadow-xs"
                : "bg-white border-zinc-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  S
                </span>
                <div>
                  <span className="text-[10px] font-bold text-zinc-900 block leading-tight">
                    Supplier Payout
                  </span>
                  <span className="text-[8px] text-zinc-400 font-medium">98.0% Net Proceeds</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs sm:text-[13px] font-black font-space text-zinc-950 block">
                  LKR 1,176,000.00
                </span>
                <span className="inline-flex items-center gap-1 text-[8px] font-bold text-emerald-800">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  {step >= 2 ? "Instant Transfer ✓ (T+0)" : "Pending Disbursement"}
                </span>
              </div>
            </div>
          </div>

          {/* Financing Fee Card (Platform/Bank) */}
          <div className="bg-white rounded-lg p-2 border border-zinc-200/80 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-zinc-100 text-zinc-600 flex items-center justify-center text-[10px] font-bold">
                F
              </span>
              <div>
                <span className="text-[10px] font-semibold text-zinc-800 block leading-tight">
                  Financing & Platform Fee
                </span>
                <span className="text-[8px] text-zinc-400">2.0% Fixed APR Tier</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold font-space text-zinc-700 block">
                LKR 24,000.00
              </span>
              <span className="text-[8px] text-zinc-400">Auto-deducted</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer Note */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Zero balance sheet debt
        </span>
        <span className="font-semibold text-zinc-700">Bank-Backed Line</span>
      </div>
    </div>
  );
}
