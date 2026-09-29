"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PricingCTA() {
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSettled(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white text-zinc-900 font-sans relative overflow-hidden border-t border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contained Dark FinTech CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] sm:rounded-[32px] bg-[#171B1F] text-white overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-zinc-800 p-6 sm:p-10 lg:p-14"
        >
          {/* Subtle Lime Radial Glow */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[420px] h-[420px] bg-radial from-[#f1ff5c]/12 via-[#f1ff5c]/4 to-transparent rounded-full pointer-events-none blur-3xl" />

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* LEFT COLUMN: Eyebrow, Heading, Copy & Buttons */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              {/* Eyebrow */}
              <span className="text-[11px] font-bold font-space uppercase tracking-[0.16em] text-[#f1ff5c] mb-3 block">
                START ACCEPTING PAYMENTS
              </span>

              {/* Heading */}
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold font-sora text-white leading-[1.18] mb-4">
                Ready to accept{" "}
                <span className="text-[#f1ff5c]">payments at scale?</span>
              </h2>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-zinc-300 font-manrope leading-relaxed mb-8 max-w-md font-normal">
                Join 3,000+ businesses using WEBXPAY for online, in-store and instalment payments.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <a
                  href="https://dashboard.webxpay.com/register"
                  className="w-full sm:w-auto text-center px-7 py-3.5 rounded-full bg-[#f1ff5c] hover:bg-yellow-300 text-zinc-950 text-xs sm:text-sm font-bold font-sora transition-all duration-200 shadow-md hover:scale-[1.02] cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>Open Merchant Account</span>
                  <span className="text-base leading-none">→</span>
                </a>
                <a
                  href="tel:+94117430200"
                  className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white text-xs sm:text-sm font-semibold font-sora border border-zinc-700 transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
                >
                  Talk to Sales
                </a>
              </div>

            </div>

            {/* RIGHT COLUMN: Native UI Payment-Flow Visual */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-md bg-zinc-900/90 rounded-2xl border border-zinc-800 p-5 sm:p-6 shadow-2xl backdrop-blur-md relative font-manrope">
                
                {/* Transaction Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                  <div>
                    <span className="text-[11px] font-space text-zinc-400 uppercase tracking-wider block">
                      Payment Received
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-sora text-white">
                      LKR 125,000.00
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] font-space text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>LankaQR / Card</span>
                  </div>
                </div>

                {/* 3-Step Flow Diagram */}
                <div className="relative py-2 space-y-3">
                  {/* Step 1: Customer */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-zinc-700/60 text-zinc-300 flex items-center justify-center font-bold">
                        💳
                      </div>
                      <div>
                        <span className="font-semibold text-white block">Customer Payment</span>
                        <span className="text-[10px] text-zinc-400">Checkout Completed</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-space text-emerald-400 font-semibold">Success</span>
                  </div>

                  {/* Connecting Line 1 */}
                  <div className="flex justify-center -my-1">
                    <div className="w-0.5 h-3 bg-gradient-to-b from-zinc-700 to-[#f1ff5c]" />
                  </div>

                  {/* Step 2: WEBXPAY Processing */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#22272D] border border-[#f1ff5c]/30 text-xs shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#f1ff5c] text-zinc-950 flex items-center justify-center font-bold text-xs font-space">
                        ⚡
                      </div>
                      <div>
                        <span className="font-semibold text-white block">WEBXPAY Gateway</span>
                        <span className="text-[10px] text-zinc-400">PCI-DSS Token Vault</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSettled ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
                      <span className="text-[10px] font-space text-zinc-300">
                        {isSettled ? "Verified" : "Processing"}
                      </span>
                    </div>
                  </div>

                  {/* Connecting Line 2 */}
                  <div className="flex justify-center -my-1">
                    <div className="w-0.5 h-3 bg-gradient-to-b from-[#f1ff5c] to-emerald-400" />
                  </div>

                  {/* Step 3: Bank Account */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        🏛️
                      </div>
                      <div>
                        <span className="font-semibold text-white block">Bank Account</span>
                        <span className="text-[10px] text-zinc-400">Commercial Bank Sri Lanka</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-space font-bold text-emerald-400">
                      <span>{isSettled ? "✓ Settled (T+1)" : "Processing"}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* COMPACT TRUST BAR INSIDE CTA CARD */}
          <div className="mt-10 pt-6 border-t border-zinc-800/90 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-space text-zinc-300">
            <div className="flex items-center gap-2 justify-start md:justify-center md:border-r border-zinc-800/80 pr-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>T+1 Settlement</span>
            </div>
            <div className="flex items-center gap-2 justify-start md:justify-center md:border-r border-zinc-800/80 pr-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>PCI-DSS Level 1</span>
            </div>
            <div className="flex items-center gap-2 justify-start md:justify-center md:border-r border-zinc-800/80 pr-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Developer APIs</span>
            </div>
            <div className="flex items-center gap-2 justify-start md:justify-center">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Transparent Pricing</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
