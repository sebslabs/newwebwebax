"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

interface StatItem {
  prefix?: string;
  target: number;
  suffix: string;
  decimals?: number;
  label: string;
  subtext: string;
  badge: string;
}

const stats: StatItem[] = [
  {
    prefix: "Rs. ",
    target: 145,
    suffix: "B+",
    label: "Total Transaction Volume",
    subtext: "Cumulative processing across all rails",
    badge: "Scale",
  },
  {
    target: 40,
    suffix: "K+",
    label: "Merchants Nationwide",
    subtext: "Retailers, SMEs & enterprise brands",
    badge: "Network",
  },
  {
    target: 750,
    suffix: "K+",
    label: "Transactions Every Month",
    subtext: "High-frequency real-time throughput",
    badge: "Monthly",
  },
  {
    prefix: "Rs. ",
    target: 4.5,
    suffix: "B+",
    decimals: 1,
    label: "Processed Monthly",
    subtext: "Consistent instant settlement volume",
    badge: "Volume",
  },
];

interface BankPartner {
  name: string;
  logo: string;
}

const bankingPartners: BankPartner[] = [
  { name: "Commercial Bank", logo: "/bank-combank.png" },
  { name: "Hatton National Bank", logo: "/bank-hnb.png" },
  { name: "Nations Trust Bank", logo: "/bank-ntb.png" },
  { name: "Pan Asia Bank", logo: "/bank-panasia.png" },
  { name: "People's Bank", logo: "/bank-peoples.png" },
  { name: "Sampath Bank", logo: "/bank-sampath.png" },
];

const SET_BANK_ITEMS = [...bankingPartners, ...bankingPartners];

interface PaymentOption {
  name: string;
  render: () => React.ReactNode;
}

const paymentOptions: PaymentOption[] = [
  {
    name: "Visa",
    render: () => (
      <svg className="h-4 sm:h-5 w-auto" viewBox="0 0 100 32" fill="none">
        <path d="M37.8 30.5L44.3 1.5H54.2L47.7 30.5H37.8Z" fill="#1A1F71"/>
        <path d="M72.8 2.1C70.8 1.3 67.7 0.6 63.8 0.6C53.9 0.6 47 5.5 46.9 12.6C46.8 17.8 51.8 20.7 55.6 22.4C59.5 24.2 60.8 25.4 60.8 27C60.7 29.5 57.6 30.6 54.7 30.6C50.6 30.6 48.4 30 45 28.6L43.7 28L42.3 34.6C44.2 35.4 47.7 36.1 51.3 36.1C61.8 36.1 68.6 31.2 68.7 23.6C68.8 19.4 66.1 16.3 60.3 13.7C56.8 12 54.7 10.9 54.7 9.2C54.7 7.7 56.5 6 60.5 6C63.8 6 66.2 6.7 68.1 7.4L69 7.8L72.8 2.1Z" fill="#1A1F71"/>
        <path d="M94.5 1.5H86.8C84.4 1.5 82.6 2.1 81.6 4.4L69.7 30.5H80.1L82.2 24.8H94.9L96.1 30.5H105.3L97.2 1.5H94.5ZM84.9 17.8C85.7 15.7 89 7.7 89 7.7C89 7.7 89.8 5.6 90.3 4.2L91.1 7.6C91.5 9.3 93.3 17.8 93.3 17.8H84.9Z" fill="#1A1F71"/>
        <path d="M26.5 1.5L16.8 21.3L15.8 16.3C14.1 10.9 9 5 3.6 2.3L12.5 30.5H23.1L38.8 1.5H26.5Z" fill="#1A1F71"/>
        <path d="M5.8 1.5H0.1L0 2C11.5 4.7 19.1 11.2 22.3 19.3L19.2 3.8C18.6 1.9 16.9 1.5 15.2 1.5H5.8Z" fill="#F7B600"/>
      </svg>
    ),
  },
  {
    name: "Mastercard",
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 138 84" fill="none">
          <circle cx="42" cy="42" r="42" fill="#EB001B"/>
          <circle cx="96" cy="42" r="42" fill="#F79E1B"/>
          <path d="M69 11.8a41.9 41.9 0 0 1 15.6 30.2A41.9 41.9 0 0 1 69 72.2a41.9 41.9 0 0 1-15.6-30.2A41.9 41.9 0 0 1 69 11.8z" fill="#FF5F00"/>
        </svg>
        <span className="font-sora font-extrabold text-[11px] text-zinc-900 tracking-tight hidden sm:inline">mastercard</span>
      </div>
    ),
  },
  {
    name: "American Express",
    render: () => (
      <div className="flex items-center gap-1.5">
        <span className="bg-[#006fcf] text-white px-1.5 py-0.5 rounded font-space font-black text-[9px] tracking-wider">AMEX</span>
        <span className="font-sora font-extrabold text-[11px] text-[#006fcf] tracking-tighter">Express</span>
      </div>
    ),
  },
  {
    name: "LANKAQR",
    render: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-md bg-[#f37023] flex items-center justify-center text-white font-black text-[9px] font-space shadow-2xs">QR</span>
        <span className="font-sora font-black text-xs text-zinc-950 tracking-tight">LANKA<span className="text-[#f37023]">QR</span></span>
      </div>
    ),
  },
  {
    name: "UPI",
    render: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-md bg-[#0f7c41] flex items-center justify-center text-white font-black text-[9px] font-space shadow-2xs">UPI</span>
        <span className="font-sora font-black text-xs text-zinc-950 tracking-tight">UPI <span className="text-[#f47920]">Pay</span></span>
      </div>
    ),
  },
  {
    name: "Alipay+",
    render: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-md bg-[#1677ff] flex items-center justify-center text-white font-black text-[10px] shadow-2xs">支</span>
        <span className="font-sora font-black text-xs text-[#1677ff] tracking-tight">Alipay<span className="text-emerald-500 font-extrabold">+</span></span>
      </div>
    ),
  },
  {
    name: "Google Pay",
    render: () => (
      <div className="flex items-center gap-1 font-sora font-extrabold text-xs text-zinc-900">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
        </svg>
        <span>Pay</span>
      </div>
    ),
  },
  {
    name: "UnionPay",
    render: () => (
      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1">
          <span className="w-2.5 h-4 bg-[#c8102e] rounded-xs" />
          <span className="w-2.5 h-4 bg-[#007b85] rounded-xs" />
          <span className="w-2.5 h-4 bg-[#002f6c] rounded-xs" />
        </div>
        <span className="font-sora font-extrabold text-[11px] text-zinc-950 tracking-tight">UnionPay</span>
      </div>
    ),
  },
  {
    name: "Discover",
    render: () => (
      <div className="flex items-center gap-0.5 font-sora font-black text-xs text-zinc-900 tracking-tight">
        <span>DISC</span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff6600]" />
        <span>VER</span>
      </div>
    ),
  },
  {
    name: "Diners Club",
    render: () => (
      <div className="flex items-center gap-1 font-sora font-bold text-[11px] text-[#004a97]">
        <span className="border border-[#004a97] rounded-full w-4 h-4 flex items-center justify-center font-black text-[9px]">D</span>
        <span className="font-extrabold">Diners Club</span>
      </div>
    ),
  },
  {
    name: "KOKO BNPL",
    render: () => (
      <div className="flex items-center gap-1">
        <span className="font-sora font-black text-xs text-black tracking-tight uppercase bg-[#f1ff5c] border border-yellow-300 px-1.5 py-0.5 rounded shadow-2xs">KOKO</span>
        <span className="text-[10px] text-zinc-600 font-space font-bold">BNPL</span>
      </div>
    ),
  },
  {
    name: "JustPay",
    render: () => (
      <div className="flex items-center gap-1">
        <span className="w-4 h-4 rounded-full bg-[#185a9d] text-white flex items-center justify-center text-[9px] font-bold">J</span>
        <span className="font-sora font-black text-xs text-[#185a9d]">Just<span className="text-zinc-900">Pay</span></span>
      </div>
    ),
  },
  {
    name: "eZ Cash",
    render: () => (
      <div className="flex items-center gap-1">
        <span className="w-4 h-4 rounded bg-[#ed1c24] text-white flex items-center justify-center text-[9px] font-bold">eZ</span>
        <span className="font-sora font-extrabold text-xs text-zinc-900">Cash</span>
      </div>
    ),
  },
  {
    name: "FriMi",
    render: () => (
      <div className="flex items-center gap-1">
        <span className="w-4 h-4 rounded-full bg-[#ee2a7b] text-white flex items-center justify-center text-[8px] font-black">F</span>
        <span className="font-sora font-black text-xs text-[#ee2a7b]">FriMi</span>
      </div>
    ),
  },
  {
    name: "mCash",
    render: () => (
      <div className="flex items-center gap-1">
        <span className="w-4 h-4 rounded bg-[#005a9c] text-white flex items-center justify-center text-[8px] font-black">m</span>
        <span className="font-sora font-bold text-xs text-zinc-900">mCash</span>
      </div>
    ),
  },
];

const SET_PAYMENT_ITEMS = [...paymentOptions, ...paymentOptions];

function AnimatedStatNumber({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(target);
      return;
    }

    if (!isInView) return;

    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, target, shouldReduceMotion]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toString();

  return (
    <span ref={ref} className="tabular-nums" suppressHydrationWarning>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function TrustStats() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const statItems: StatItem[] = [
    {
      prefix: "Rs. ",
      target: 145,
      suffix: "B+",
      label: t.statVolumeLabel,
      subtext: t.statVolumeSub,
      badge: t.statVolumeBadge,
    },
    {
      target: 40,
      suffix: "K+",
      label: t.statMerchantsLabel,
      subtext: t.statMerchantsSub,
      badge: t.statMerchantsBadge,
    },
    {
      target: 750,
      suffix: "K+",
      label: t.statMonthlyTxLabel,
      subtext: t.statMonthlyTxSub,
      badge: t.statMonthlyTxBadge,
    },
    {
      prefix: "Rs. ",
      target: 4.5,
      suffix: "B+",
      decimals: 1,
      label: t.statProcessedLabel,
      subtext: t.statProcessedSub,
      badge: t.statProcessedBadge,
    },
  ];

  return (
    <section className="w-full py-12 sm:py-20 lg:py-24 bg-[#22272D] text-white font-sans relative overflow-hidden border-t border-zinc-800">
      {/* Ambient background light gradients */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#f1ff5c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline, Narrative & Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/80 shadow-2xs mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-200 font-space">
                {t.scaleAndReliability}
              </span>
            </div>

            {/* Headline with Brand Outline Accent (Brand Guidelines Page 27 & 30) */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium font-sora text-white leading-[1.16] mb-4 sm:mb-6">
              {t.trustedByThousands}{" "}
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: "1.5px #f1ff5c",
                }}
              >
                {t.sriLanka}
              </span>
            </h2>

            {/* Subtitle (Brand Guidelines Page 28: Manrope Regular) */}
            <p className="text-sm sm:text-lg text-zinc-300 leading-relaxed font-normal font-manrope mb-6 sm:mb-8">
              {t.trustSubtitle}
            </p>

            {/* Trust Checklist Cards */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-zinc-800/70 border border-zinc-700/70 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </div>
                <span className="text-xs font-semibold text-zinc-200 font-space">
                  {t.cbslRegulated}
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-zinc-800/70 border border-zinc-700/70 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </div>
                <span className="text-xs font-semibold text-zinc-200 font-space">
                  {t.pciCertified}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Stats Card Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
            {statItems.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
                className="group relative rounded-xl bg-zinc-850 bg-zinc-800/60 border border-zinc-700/70 p-4 sm:p-7 shadow-xl hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:border-[#f1ff5c]/50 transition-all duration-300 flex flex-col justify-between backdrop-blur-xs"
              >
                {/* Ambient hover light */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#f1ff5c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

                {/* Top Row: Category Tag */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-300 bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded-full font-space">
                    {stat.badge}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-70 group-hover:scale-125 transition-transform" />
                </div>

                {/* Big Metric Value (Sora Semi-Bold per Brand Guideline Page 27, no tightened tracking) */}
                <div className="mb-2 sm:mb-3">
                  <h3 className="text-2xl sm:text-4xl lg:text-[44px] font-semibold font-sora text-white group-hover:text-[#f1ff5c] transition-colors leading-tight">
                    <AnimatedStatNumber
                      target={stat.target}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </h3>
                </div>

                {/* Label & Description (Manrope per Brand Guideline Page 28) */}
                <div>
                  <p className="text-sm font-semibold text-zinc-100 leading-snug font-manrope">
                    {stat.label}
                  </p>
                  <p className="text-xs text-zinc-400 font-normal font-manrope mt-1 leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Trusted Banking Partners Strip with Infinite Marquee Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-zinc-800"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 sm:gap-8 overflow-hidden">
            {/* Section Label */}
            <div className="flex items-center gap-2.5 shrink-0 z-20 lg:w-56">
              <span className="w-2 h-2 rounded-full bg-[#f1ff5c] shadow-[0_0_8px_rgba(241,255,92,0.7)] animate-pulse" />
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-300 font-space whitespace-nowrap">
                {t.trustedBankingPartners}
              </h3>
            </div>

            {/* Infinite Scrolling Track */}
            <div className="relative flex-1 overflow-hidden select-none">
              {/* Vignette Gradients for smooth fade into dark background */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#22272D] via-[#22272D]/90 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#22272D] via-[#22272D]/90 to-transparent z-10" />

              <motion.div
                className="flex items-center will-change-transform py-1.5"
                animate={mounted && shouldReduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 24,
                    ease: "linear",
                  },
                }}
              >
                {/* Set 1 */}
                <div className="flex items-center shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4">
                  {SET_BANK_ITEMS.map((partner, idx) => (
                    <div
                      key={`b1-${partner.name}-${idx}`}
                      className="group/bank h-11 sm:h-13 w-28 sm:w-36 px-3 sm:px-4 bg-white rounded-xl shadow-xs border border-white/20 hover:border-[#f1ff5c] flex items-center justify-center shrink-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                      title={partner.name}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-6 sm:max-h-7.5 w-auto max-w-full object-contain transition-transform duration-200 group-hover/bank:scale-105"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>

                {/* Set 2 (Mirror for seamless infinite loop) */}
                <div
                  aria-hidden="true"
                  className="flex items-center shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4"
                >
                  {SET_BANK_ITEMS.map((partner, idx) => (
                    <div
                      key={`b2-${partner.name}-${idx}`}
                      className="group/bank h-11 sm:h-13 w-28 sm:w-36 px-3 sm:px-4 bg-white rounded-xl shadow-xs border border-white/20 hover:border-[#f1ff5c] flex items-center justify-center shrink-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                      title={partner.name}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-6 sm:max-h-7.5 w-auto max-w-full object-contain transition-transform duration-200 group-hover/bank:scale-105"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Supported Payment Options Strip with Infinite Marquee Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-zinc-800/80"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 sm:gap-8 overflow-hidden">
            {/* Section Label */}
            <div className="flex items-center gap-2.5 shrink-0 z-20 lg:w-56">
              <span className="w-2 h-2 rounded-full bg-[#f1ff5c] shadow-[0_0_8px_rgba(241,255,92,0.7)] animate-pulse" />
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-300 font-space whitespace-nowrap">
                {t.supportedPaymentMethods}
              </h3>
            </div>

            {/* Infinite Scrolling Track */}
            <div className="relative flex-1 overflow-hidden select-none">
              {/* Vignette Gradients for smooth fade into dark background */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#22272D] via-[#22272D]/90 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#22272D] via-[#22272D]/90 to-transparent z-10" />

              <motion.div
                className="flex items-center will-change-transform py-1.5"
                animate={mounted && shouldReduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 32,
                    ease: "linear",
                  },
                }}
              >
                {/* Set 1 */}
                <div className="flex items-center shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4">
                  {SET_PAYMENT_ITEMS.map((item, idx) => (
                    <div
                      key={`p1-${item.name}-${idx}`}
                      className="group/pay h-11 sm:h-13 w-28 sm:w-36 px-3 sm:px-4 bg-white rounded-xl shadow-xs border border-white/20 hover:border-[#f1ff5c] flex items-center justify-center shrink-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                      title={item.name}
                    >
                      <div className="transition-transform duration-200 group-hover/pay:scale-105 flex items-center justify-center">
                        {item.render()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Set 2 (Mirror for seamless infinite loop) */}
                <div
                  aria-hidden="true"
                  className="flex items-center shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4"
                >
                  {SET_PAYMENT_ITEMS.map((item, idx) => (
                    <div
                      key={`p2-${item.name}-${idx}`}
                      className="group/pay h-11 sm:h-13 w-28 sm:w-36 px-3 sm:px-4 bg-white rounded-xl shadow-xs border border-white/20 hover:border-[#f1ff5c] flex items-center justify-center shrink-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                      title={item.name}
                    >
                      <div className="transition-transform duration-200 group-hover/pay:scale-105 flex items-center justify-center">
                        {item.render()}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
