"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function XCollectorAnimation() {
  const shouldReduceMotion = useReducedMotion();
  // Steps:
  // 0: Agent at Location A, Route drawing towards Customer B
  // 1: Agent travelling along route
  // 2: Agent arrives at Customer B -> Payment Collected popup (LKR 18,500) + Counter updates 142,500 -> 161,000
  // 3: Route indicates next customer C, hold, then loop
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 0) {
      timer = setTimeout(() => setStep(1), 1600);
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
      {/* Top Real-Time Tracking Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold font-space uppercase tracking-wider text-zinc-900">
            Agent #124 • Live
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-medium text-zinc-400">
            {step >= 2 ? "2 visits left" : "3 visits left"}
          </span>
          <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
            GPS Active
          </span>
        </div>
      </div>

      {/* Real-time Collection Dashboard Metric Card */}
      <div className="bg-white rounded-lg border border-zinc-200/90 p-2.5 shadow-2xs mb-2 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block">
            Collected Today
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm font-black font-space text-zinc-950">
              {step >= 2 ? "LKR 161,000.00" : "LKR 142,500.00"}
            </span>
            {step >= 2 && (
              <motion.span
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded"
              >
                +18.5k
              </motion.span>
            )}
          </div>
        </div>

        <div className="text-right">
          <span className="text-[9px] text-zinc-400 font-medium block">Last Sync</span>
          <span className="text-[10px] font-semibold text-zinc-700">Just Now</span>
        </div>
      </div>

      {/* Abstract Map Canvas */}
      <div className="relative flex-1 bg-zinc-100/60 rounded-lg border border-zinc-200/70 overflow-hidden min-h-[160px] p-2 flex items-center justify-center">
        {/* Subtle Map Grid Lines */}
        <svg className="absolute inset-0 w-full h-full text-zinc-200/60 pointer-events-none" fill="none">
          <defs>
            <pattern id="mapGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
        </svg>

        {/* Abstract Territory Streets */}
        <svg viewBox="0 0 280 150" className="w-full h-full relative z-10">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Background Secondary Road Lines */}
          <path d="M 20 40 L 100 40 L 150 90 L 260 90" stroke="#e4e4e7" strokeWidth="2.5" fill="none" />
          <path d="M 90 20 L 90 130" stroke="#e4e4e7" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <path d="M 190 20 L 190 140" stroke="#e4e4e7" strokeWidth="2" strokeDasharray="3 3" fill="none" />

          {/* Animated Active Route from Location A (35, 95) to Customer B (170, 45) */}
          <path
            d="M 35 95 C 75 95, 105 45, 170 45"
            stroke="#93c5fd"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <motion.path
            d="M 35 95 C 75 95, 105 45, 170 45"
            stroke="url(#routeGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: step >= 1 ? 1 : 0.2 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: "easeInOut" }}
          />

          {/* Dotted Next Leg toward Customer C (240, 110) */}
          <path
            d="M 170 45 C 205 45, 220 110, 240 110"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Location A Node: Depot Start */}
          <g transform="translate(35, 95)">
            <circle r="7" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <circle r="3.5" fill="#64748b" />
            <text x="0" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#64748b">
              Start
            </text>
          </g>

          {/* Customer B Node: Destination (Store #42) */}
          <g transform="translate(170, 45)">
            <circle
              r="9"
              fill={step >= 2 ? "#10b981" : "#ffffff"}
              stroke={step >= 2 ? "#059669" : "#3b82f6"}
              strokeWidth="2.5"
              className="transition-colors duration-300"
            />
            {step >= 2 ? (
              <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">
                ✓
              </text>
            ) : (
              <circle r="3.5" fill="#3b82f6" />
            )}
            <text x="0" y="-13" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e293b">
              Customer B
            </text>
          </g>

          {/* Customer C Node */}
          <g transform="translate(240, 110)">
            <circle r="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <circle r="2.5" fill="#94a3b8" />
            <text x="0" y="15" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#94a3b8">
              Store #08
            </text>
          </g>

          {/* Travelling Field Agent Marker */}
          <motion.g
            animate={
              shouldReduceMotion
                ? { x: step >= 2 ? 170 : 35, y: step >= 2 ? 45 : 95 }
                : step === 0
                ? { x: 35, y: 95 }
                : step === 1
                ? { x: [35, 95, 170], y: [95, 60, 45] }
                : { x: 170, y: 45 }
            }
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            {/* Agent Beacon Radar Ring */}
            <circle r="12" fill="#3b82f6" fillOpacity="0.25" className="animate-ping" />
            <circle r="7.5" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
            {/* Inner dot */}
            <circle r="2.5" fill="#f1ff5c" />
          </motion.g>
        </svg>

        {/* Dynamic Collection Popup Toast at Customer B */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 18, stiffness: 260 }}
              className="absolute top-2 right-2 bg-zinc-950/95 backdrop-blur-md text-white rounded-lg p-2.5 shadow-lg border border-zinc-800 z-20 flex items-center gap-2 max-w-[170px]"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold text-xs shrink-0">
                ✓
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-emerald-400 leading-tight">Payment Collected</p>
                <p className="text-xs font-black font-space text-white leading-tight mt-0.5">LKR 18,500.00</p>
                <p className="text-[8px] text-zinc-400 mt-0.5">Ref #COL-8291</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer Note */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-500">
        <span className="flex items-center gap-1 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Offline-to-online sync
        </span>
        <span className="font-semibold text-zinc-700">Audit-ready receipt</span>
      </div>
    </div>
  );
}
