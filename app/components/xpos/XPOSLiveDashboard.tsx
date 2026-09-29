"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";

export default function XPOSLiveDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-40px", once: false });
  const shouldReduceMotion = useReducedMotion();

  // Animation Stages:
  // 0: 'sale' (New Sale initialized, amount 0 -> 12,500, basket preview)
  // 1: 'paymentMethod' (Choose Payment: Card, LankaQR, XSPLIT)
  // 2: 'dynamicQR' (Terminal shows QR + Customer Phone slides in to scan & confirm)
  // 3: 'approved' (Payment Approved in 0.8s + CEFTS Settlement card appears)
  // 4: 'cloudSync' (Cloud Sync pulse, Inventory -3 items, Daily Revenue 482,500 -> 495,000)
  // 5: 'receipt' (Digital Receipt: Email / SMS / Print)
  const [step, setStep] = useState<number>(0);

  // Payment mode: 'lankaqr' or 'xsplit' (cycles alternately or via user click)
  const [selectedMethod, setSelectedMethod] = useState<"card" | "lankaqr" | "xsplit">("lankaqr");
  const [cycleCount, setCycleCount] = useState<number>(0);

  // Dynamic values that count up
  const [saleAmount, setSaleAmount] = useState<number>(0);
  const [dailyRevenue, setDailyRevenue] = useState<number>(482500);
  const [txCount, setTxCount] = useState<number>(12);
  const [phoneConfirmed, setPhoneConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (!isInView) return;

    let timer: NodeJS.Timeout;

    if (step === 0) {
      // Step 0: New Sale
      setPhoneConfirmed(false);
      setDailyRevenue(482500);
      setTxCount(12);

      const targetAmount = selectedMethod === "xsplit" ? 30000 : 12500;
      const a1 = setTimeout(() => setSaleAmount(Math.round(targetAmount * 0.5)), 250);
      const a2 = setTimeout(() => setSaleAmount(targetAmount), 600);

      timer = setTimeout(() => setStep(1), 1800);
      return () => {
        clearTimeout(a1);
        clearTimeout(a2);
        clearTimeout(timer);
      };
    } else if (step === 1) {
      // Step 1: Payment Method Selection
      timer = setTimeout(() => setStep(2), 1900);
    } else if (step === 2) {
      // Step 2: Dynamic QR Scan on Phone (or XSPLIT breakdown)
      const confirmTimer = setTimeout(() => setPhoneConfirmed(true), 1100);
      timer = setTimeout(() => setStep(3), 2200);
      return () => {
        clearTimeout(confirmTimer);
        clearTimeout(timer);
      };
    } else if (step === 3) {
      // Step 3: Payment Approved & CEFTS Settlement
      timer = setTimeout(() => setStep(4), 2200);
    } else if (step === 4) {
      // Step 4: Cloud Counter Sync (Inventory -3 items, Revenue 482.5k -> 495k)
      const r1 = setTimeout(() => {
        setDailyRevenue(selectedMethod === "xsplit" ? 512500 : 495000);
        setTxCount(13);
      }, 400);

      timer = setTimeout(() => setStep(5), 2300);
      return () => {
        clearTimeout(r1);
        clearTimeout(timer);
      };
    } else if (step === 5) {
      // Step 5: Digital Receipt
      timer = setTimeout(() => {
        // Toggle method for next loop to showcase XSPLIT vs LankaQR
        setCycleCount((prev) => {
          const next = prev + 1;
          setSelectedMethod(next % 2 === 1 ? "xsplit" : "lankaqr");
          return next;
        });
        setStep(0);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [step, isInView, selectedMethod]);

  const currentTotal = selectedMethod === "xsplit" ? 30000 : 12500;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl bg-white/80 backdrop-blur-md border border-zinc-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-3 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden h-[500px] sm:h-[540px] select-none font-sans"
    >
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:16px_16px] opacity-75 pointer-events-none" />

      {/* Ambient Micro Glow Orbs */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#f1ff5c]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-100/35 rounded-full blur-3xl pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          1. TOP STATUS BAR: Fixed height 36px
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between pb-2.5 h-[36px] border-b border-zinc-200/70 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-bold font-space uppercase tracking-wider text-zinc-500 truncate">
            Colombo Store
          </span>
          <span className="text-zinc-300 hidden sm:inline">•</span>
          <span className="text-[11px] font-medium text-zinc-600 hidden sm:inline">
            Register 02
          </span>
        </div>

        {/* Live System Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-zinc-200/90 rounded-full px-2.5 sm:px-3 py-0.5 shadow-2xs shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-extrabold font-space text-zinc-950 tracking-wider">
            LIVE POS
          </span>
          <span className="text-zinc-300 text-[10px]">|</span>
          <span className="text-[10px] font-mono font-medium text-zinc-600">
            {txCount} sales
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN STAGE: Centered Smart POS Terminal & Satellites (Fixed height 396px)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3.5 h-[396px] shrink-0 my-1 items-center">
        
        {/* CENTERPIECE: Modern Android Smart POS Terminal (Col 7 - Fixed 396px height) */}
        <div className="lg:col-span-7 flex justify-center h-full w-full">
          <div className="relative w-full max-w-[290px] sm:max-w-[330px] h-full rounded-xl bg-zinc-900 border border-zinc-700/70 shadow-[0_18px_45px_rgba(0,0,0,0.18)] p-2 sm:p-2.5 text-white flex flex-col justify-between">
            
            {/* Terminal Top Hardware Bezel (Fixed 24px) */}
            <div className="flex items-center justify-between px-2 pt-0.5 pb-1.5 h-[24px] border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-bold tracking-widest text-zinc-400 font-space uppercase">
                  XPOS Smart-V3
                </span>
              </div>

              {/* NFC Contactless Wave Indicator */}
              <div className="flex items-center gap-1 text-zinc-400" title="Contactless NFC Ready">
                <svg className="w-3 h-3 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 7.5a6 6 0 0 1 0 9m3.5-11a9 9 0 0 1 0 13m3.5-15a12 12 0 0 1 0 17" />
                </svg>
                <span className="text-[8px] font-mono text-zinc-400">NFC</span>
              </div>
            </div>

            {/* Terminal Glass Screen Display (Fixed 335px height) */}
            <div className="relative rounded-lg bg-zinc-950 border border-zinc-800 p-3 h-[335px] shrink-0 flex flex-col justify-between overflow-hidden shadow-inner">
              
              {/* Screen Header (Fixed 20px) */}
              <div className="flex items-center justify-between pb-1 h-[20px] border-b border-zinc-900 shrink-0">
                <span className="text-[10px] font-black font-space tracking-wider text-emerald-400 uppercase">
                  XPOS Terminal
                </span>
                <span className="text-[9px] font-mono text-zinc-500">Reg #02</span>
              </div>

              {/* DYNAMIC SCREEN CONTENT (Strictly Fixed 275px height - NO LAYOUT SHIFT) */}
              <div className="h-[275px] shrink-0 flex flex-col justify-between relative overflow-hidden">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 0: NEW SALE CREATED */}
                  {step === 0 && (
                    <motion.div
                      key="step-sale"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col justify-between py-1"
                    >
                      <div>
                        <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wider block">
                          New Counter Sale
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-xs font-semibold text-zinc-400 font-space">LKR</span>
                          <span className="text-2xl font-black font-space text-white tracking-tight">
                            {saleAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Basket Item Preview List */}
                      <div className="bg-zinc-900/90 rounded-xl p-2 border border-zinc-800 space-y-1 text-[9px]">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span>Coffee Machine</span>
                          <span className="font-mono text-zinc-300">8,500</span>
                        </div>
                        <div className="flex items-center justify-between text-zinc-400">
                          <span>Coffee Beans (1kg)</span>
                          <span className="font-mono text-zinc-300">2,500</span>
                        </div>
                        <div className="flex items-center justify-between text-zinc-400">
                          <span>Barista Accessory</span>
                          <span className="font-mono text-zinc-300">1,500</span>
                        </div>
                        <div className="pt-1 border-t border-zinc-800 flex items-center justify-between text-[10px] font-bold text-white font-space">
                          <span>3 Items Total</span>
                          <span className="text-[#f1ff5c]">LKR 12,500</span>
                        </div>
                      </div>

                      <div className="py-1 px-2 rounded-lg bg-zinc-900 border border-zinc-800 text-center text-[10px] text-zinc-400 font-medium">
                        Ready for payment...
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 1: PAYMENT METHOD SELECTION */}
                  {step === 1 && (
                    <motion.div
                      key="step-methods"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col justify-between py-1"
                    >
                      <div className="text-center">
                        <span className="text-[9px] font-medium text-zinc-400">Total to Charge</span>
                        <p className="text-base font-black font-space text-white">
                          LKR {currentTotal.toLocaleString()}
                        </p>
                      </div>

                      {/* 3 Compact Payment Options */}
                      <div className="space-y-1.5">
                        {/* CARD */}
                        <div
                          className={`w-full p-2 rounded-xl border text-left flex items-center justify-between transition-colors ${
                            selectedMethod === "card"
                              ? "bg-zinc-800 border-zinc-600 text-white"
                              : "bg-zinc-900/80 border-zinc-800 text-zinc-400 opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs">◉</span>
                            <div>
                              <span className="text-[10px] font-bold block leading-tight">CARD TAP</span>
                              <span className="text-[8px] text-zinc-400">Contactless payment</span>
                            </div>
                          </div>
                          <span className="text-[10px]">→</span>
                        </div>

                        {/* LANKAQR */}
                        <div
                          className={`w-full p-2 rounded-xl border text-left flex items-center justify-between transition-colors ${
                            selectedMethod === "lankaqr"
                              ? "bg-emerald-950/80 border-emerald-500/80 text-white shadow-xs"
                              : "bg-zinc-900/80 border-zinc-800 text-zinc-400 opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-emerald-400">▦</span>
                            <div>
                              <span className="text-[10px] font-bold text-white block leading-tight">LANKAQR</span>
                              <span className="text-[8px] text-emerald-400">Scan & pay instantly</span>
                            </div>
                          </div>
                          <span className="text-[8px] font-bold text-emerald-400 bg-emerald-900/60 px-1.5 py-0.5 rounded">
                            Selected
                          </span>
                        </div>

                        {/* XSPLIT */}
                        <div
                          className={`w-full p-2 rounded-xl border text-left flex items-center justify-between transition-colors ${
                            selectedMethod === "xsplit"
                              ? "bg-indigo-950/80 border-indigo-500/80 text-white shadow-xs"
                              : "bg-zinc-900/80 border-zinc-800 text-zinc-400 opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-indigo-400">◫</span>
                            <div>
                              <span className="text-[10px] font-bold text-white block leading-tight">XSPLIT</span>
                              <span className="text-[8px] text-indigo-300">Pay in 3 installments</span>
                            </div>
                          </div>
                          <span className="text-[10px]">→</span>
                        </div>
                      </div>

                      <span className="text-[8px] text-zinc-500 text-center block">
                        Customer selecting payment rail
                      </span>
                    </motion.div>
                  )}

                  {/* STEP 2: DYNAMIC QR DISPLAY (OR XSPLIT BREAKDOWN) */}
                  {step === 2 && (
                    <motion.div
                      key="step-qr"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col items-center justify-between text-center py-1"
                    >
                      {selectedMethod === "xsplit" ? (
                        /* XSPLIT Dynamic In-Store Split Breakdown */
                        <div className="w-full space-y-2 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider block">
                              XSPLIT Counter Plan
                            </span>
                            <p className="text-lg font-black font-space text-white">LKR 30,000</p>
                          </div>
                          
                          <div className="space-y-1.5 text-left">
                            <div className="p-1.5 rounded-lg bg-emerald-950/70 border border-emerald-700/80 flex items-center justify-between text-[9px]">
                              <span className="text-emerald-300 font-bold">1. Today at Counter</span>
                              <span className="font-bold text-white">LKR 10,000 ✓</span>
                            </div>
                            <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-[9px] text-zinc-400">
                              <span>2. Month 2 (Auto)</span>
                              <span className="text-zinc-200">LKR 10,000</span>
                            </div>
                            <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-[9px] text-zinc-400">
                              <span>3. Month 3 (Auto)</span>
                              <span className="text-zinc-200">LKR 10,000</span>
                            </div>
                          </div>

                          <span className="text-[9px] text-emerald-400 font-semibold">
                            Split terms confirmed
                          </span>
                        </div>
                      ) : (
                        /* LankaQR Dynamic QR Terminal */
                        <>
                          <div className="flex items-center justify-between w-full">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                              Dynamic LankaQR
                            </span>
                            <span className="text-[10px] font-black font-space text-white">
                              LKR 12,500
                            </span>
                          </div>

                          {/* QR Box with Laser Scan Beam */}
                          <div className="relative w-28 h-28 bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden my-1 shadow-md">
                            {/* Animated Laser Scan Line */}
                            <motion.div
                              className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_8px_#10b981] z-20 pointer-events-none"
                              animate={shouldReduceMotion ? {} : { top: ["8%", "90%", "8%"] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Clean SVG QR Pattern */}
                            <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-950 fill-current">
                              <rect x="5" y="5" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
                              <rect x="12" y="12" width="14" height="14" rx="2" fill="currentColor" />
                              <rect x="67" y="5" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
                              <rect x="74" y="12" width="14" height="14" rx="2" fill="currentColor" />
                              <rect x="5" y="67" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
                              <rect x="12" y="74" width="14" height="14" rx="2" fill="currentColor" />
                              <rect x="42" y="10" width="8" height="8" rx="1" fill="currentColor" />
                              <rect x="42" y="30" width="8" height="14" rx="1" fill="currentColor" />
                              <rect x="58" y="44" width="14" height="8" rx="1" fill="currentColor" />
                              <rect x="42" y="65" width="16" height="8" rx="1" fill="currentColor" />
                              <rect x="70" y="68" width="14" height="14" rx="1" fill="currentColor" />
                            </svg>
                          </div>

                          <span className="text-[9px] text-zinc-400 font-medium">
                            Scanning in progress...
                          </span>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 3 & 4: PAYMENT APPROVED */}
                  {(step === 3 || step === 4) && (
                    <motion.div
                      key="step-approved"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col items-center justify-center text-center py-2"
                    >
                      {/* Animated Success Check Badge */}
                      <div className="w-12 h-12 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center text-2xl font-black mb-2 shadow-lg">
                        ✓
                      </div>

                      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 font-space block">
                        Payment Approved
                      </span>

                      <p className="text-xl sm:text-2xl font-black font-space text-white mt-0.5">
                        LKR {currentTotal.toLocaleString()}
                      </p>

                      <div className="w-full pt-2 mt-3 border-t border-zinc-900 flex items-center justify-between text-[9px] text-zinc-400">
                        <span>Approved in <strong className="text-emerald-400">0.8s</strong></span>
                        <span className="text-zinc-500 font-mono">Auth #84920</span>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: DIGITAL RECEIPT */}
                  {step === 5 && (
                    <motion.div
                      key="step-receipt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col justify-between py-1"
                    >
                      <div className="text-center">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                          ✓ Sale Complete
                        </span>
                        <p className="text-lg font-black font-space text-white">
                          LKR {currentTotal.toLocaleString()}
                        </p>
                        <span className="text-[9px] font-mono text-zinc-500">
                          Receipt #XPOS-2841
                        </span>
                      </div>

                      {/* Receipt Output Options */}
                      <div className="bg-zinc-900/90 rounded-xl p-2 border border-zinc-800 space-y-1.5">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block text-center">
                          Digital Receipt
                        </span>
                        <div className="grid grid-cols-3 gap-1 text-[9px] font-bold text-center">
                          <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700">
                            Email
                          </div>
                          <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-700/80">
                            SMS ✓
                          </div>
                          <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700">
                            Print
                          </div>
                        </div>
                      </div>

                      <span className="text-[9px] text-zinc-500 text-center block">
                        Ready for next customer
                      </span>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Terminal Bottom Navigation Indicator (Fixed 6px) */}
              <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto shrink-0" />
            </div>

          </div>
        </div>

        {/* SATELLITE CARDS: Fixed 396px height stack (Col 5) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full">
          
          {/* SATELLITE 1: CUSTOMER PHONE (Fixed 116px height, NO scale) */}
          <div
            className={`h-[116px] shrink-0 rounded-xl p-3 border transition-colors duration-300 flex flex-col justify-between ${
              step === 2
                ? "bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-500/20 opacity-100"
                : "bg-white/95 border-zinc-200/80 shadow-2xs opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-zinc-950 text-white flex items-center justify-center text-[10px]">
                  📱
                </div>
                <div>
                  <span className="text-xs font-bold text-zinc-950 font-space block leading-tight">
                    Customer Device
                  </span>
                  <span className="text-[9px] text-zinc-400">LankaQR Banking App</span>
                </div>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${
                phoneConfirmed
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : "bg-zinc-100 text-zinc-600 border-zinc-200"
              }`}>
                {phoneConfirmed ? "Confirmed ✓" : "Scanning..."}
              </span>
            </div>

            <div className="bg-zinc-50/90 rounded-xl px-2.5 py-1.5 border border-zinc-150 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-medium text-zinc-400 block">Payment Request</span>
                <span className="text-xs font-black font-space text-zinc-950">
                  LKR {currentTotal.toLocaleString()}
                </span>
              </div>
              <div className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition-colors ${
                phoneConfirmed
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-950 text-white"
              }`}>
                {phoneConfirmed ? "Approved ✓" : "Tap to Pay"}
              </div>
            </div>
          </div>

          {/* SATELLITE 2: CEFTS INSTANT SETTLEMENT (Fixed 96px height, NO scale) */}
          <div
            className={`h-[96px] shrink-0 rounded-xl p-3 border transition-colors duration-300 flex flex-col justify-between ${
              step >= 3
                ? "bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-500/20 opacity-100"
                : "bg-white/95 border-zinc-200/80 shadow-2xs opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                  ⚡
                </span>
                <span className="text-xs font-bold text-zinc-950 font-space">
                  Settlement Confirmed
                </span>
              </div>
              <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                CEFTS Instant
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-t border-zinc-100">
              <span className="text-[10px] text-zinc-500 font-medium">Interbank Settlement</span>
              <span className="text-sm font-black font-space text-zinc-950">
                LKR {currentTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* SATELLITE 3: CLOUD COUNTER SYNC (Fixed 116px height, NO scale) */}
          <div
            className={`h-[116px] shrink-0 rounded-xl p-3 border transition-colors duration-300 flex flex-col justify-between ${
              step >= 4
                ? "bg-white border-zinc-300 shadow-sm ring-1 ring-emerald-500/20 opacity-100"
                : "bg-white/95 border-zinc-200/80 shadow-2xs opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">☁</span>
                <span className="text-xs font-bold text-zinc-950 font-space">
                  Cloud Counter Sync
                </span>
              </div>
              <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                Synchronized
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-zinc-50/90 rounded-xl px-2 py-1 border border-zinc-150">
                <span className="text-[9px] text-zinc-400 block font-medium">Inventory</span>
                <span className="font-bold text-red-600 font-mono">−3 items</span>
              </div>
              <div className="bg-zinc-50/90 rounded-xl px-2 py-1 border border-zinc-150">
                <span className="text-[9px] text-zinc-400 block font-medium">Counter Sales</span>
                <span className="font-bold text-emerald-700 font-mono">+LKR {currentTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM BAR: Fixed height 44px
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 h-[44px] shrink-0 rounded-xl bg-zinc-50/90 border border-zinc-200/80 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-space">
            Store Daily Reconciliation
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xs text-zinc-500 font-medium hidden sm:inline">Total In-Store Volume:</span>
          <span className="text-sm font-black font-space text-zinc-950">
            LKR {dailyRevenue.toLocaleString()}.00
          </span>
          <span className={`text-[8px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200 transition-opacity duration-200 ${
            step >= 4 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
            +LKR {currentTotal.toLocaleString()} Synced
          </span>
        </div>
      </div>

    </div>
  );
}
