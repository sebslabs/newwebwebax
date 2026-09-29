"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface FooterProps {
  brand?: "payable" | "webxpay";
}

export default function Footer({ brand = "webxpay" }: FooterProps) {
  const { t } = useLanguage();
  const [activeBrand] = useState<"payable" | "webxpay">(brand);

  const isPayable = activeBrand === "payable";

  const products = isPayable
    ? [
        { label: "Payable PRO", href: "#" },
        { label: "Payable MINI", href: "#" },
        { label: "Payable TAP", href: "#" },
        { label: "Payable Connect", href: "#" },
        { label: "Payable IPG", href: "#" },
        { label: "Payable SoundBox", href: "#" },
        { label: "Payable mPOS", href: "#" },
        { label: "SettleIn", href: "#" },
        { label: "Payable LinkPay", href: "#" },
        { label: "Memberly", href: "#" },
        { label: "Payable Bill", href: "#" },
      ]
    : [
        { label: "XGATEWAY", href: "#" },
        { label: "XPOS", href: "#" },
        { label: "XSPLIT", href: "#" },
        { label: "XSUPPLIER", href: "#" },
        { label: "XCOLLECTOR", href: "#" },
        { label: "XQR", href: "#" },
        { label: "XPAYOUT", href: "#" },
        { label: "XRECURRING", href: "#" },
        { label: "Tap to Pay", href: "#" },
        { label: "Virtual Terminal", href: "#" },
        { label: "Checkout SDK", href: "#" },
      ];

  const company = [
    { label: "About", href: "#" },
    { label: "Leadership", href: "#" },
    { label: "Careers", href: "#" },
    { label: "For Partners", href: "#" },
  ];

  const resources = [
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Dev docs", href: "#" },
  ];

  const address = isPayable
    ? [
        "4th Floor, Huejay Court",
        "No.32, Sir Mohamed Macan Marker Mawatha",
        "Colombo 03,",
        "Sri Lanka.",
      ]
    : [
        "46/45, 5th floor, Green Lanka Towers",
        "Nawam Mawatha",
        "Colombo 02,",
        "Sri Lanka.",
      ];

  return (
    <footer className="w-full bg-[#0a0a0c] text-white font-sans relative overflow-hidden select-none border-t border-zinc-900/60">
      {/* Subtle top edge neon hairline highlight using #f1ff5c */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#f1ff5c]/25 to-transparent pointer-events-none" />

      {/* Top Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">
          
          {/* Column 1: Head Office & Social Icons */}
          <div className="lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-8">
            <div>
              <h3 className="text-white text-[15px] font-semibold tracking-normal mb-6">
                Head office
              </h3>
              <address className="not-italic text-zinc-400 text-[13.5px] sm:text-[14px] leading-[1.8] mb-8 font-normal">
                {address.map((line, idx) => (
                  <p key={idx} className="transition-colors hover:text-zinc-200">
                    {line}
                  </p>
                ))}
              </address>
            </div>

            {/* Social Media Rounded Buttons with #f1ff5c hover glow */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/webxpay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-[34px] h-[34px] rounded-lg bg-[#18181b] border border-zinc-800/80 flex items-center justify-center text-zinc-300 hover:text-[#f1ff5c] hover:bg-zinc-800/90 hover:border-[#f1ff5c]/40 hover:shadow-[0_0_12px_rgba(241,255,92,0.25)] transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.822 0-2.55.279-2.55 2.503v1.477h4.032l-.534 3.667h-3.498v7.98h-4.665z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/webxpay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-[34px] h-[34px] rounded-lg bg-[#18181b] border border-zinc-800/80 flex items-center justify-center text-zinc-300 hover:text-[#f1ff5c] hover:bg-zinc-800/90 hover:border-[#f1ff5c]/40 hover:shadow-[0_0_12px_rgba(241,255,92,0.25)] transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/webxpay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-[34px] h-[34px] rounded-lg bg-[#18181b] border border-zinc-800/80 flex items-center justify-center text-zinc-300 hover:text-[#f1ff5c] hover:bg-zinc-800/90 hover:border-[#f1ff5c]/40 hover:shadow-[0_0_12px_rgba(241,255,92,0.25)] transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="https://x.com/webxpay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-[34px] h-[34px] rounded-lg bg-[#18181b] border border-zinc-800/80 flex items-center justify-center text-zinc-300 hover:text-[#f1ff5c] hover:bg-zinc-800/90 hover:border-[#f1ff5c]/40 hover:shadow-[0_0_12px_rgba(241,255,92,0.25)] transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@webxpay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-[34px] h-[34px] rounded-lg bg-[#18181b] border border-zinc-800/80 flex items-center justify-center text-zinc-300 hover:text-[#f1ff5c] hover:bg-zinc-800/90 hover:border-[#f1ff5c]/40 hover:shadow-[0_0_12px_rgba(241,255,92,0.25)] transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/94117445555"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-[34px] h-[34px] rounded-lg bg-[#18181b] border border-zinc-800/80 flex items-center justify-center text-zinc-300 hover:text-[#f1ff5c] hover:bg-zinc-800/90 hover:border-[#f1ff5c]/40 hover:shadow-[0_0_12px_rgba(241,255,92,0.25)] transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.031 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.529 5.309L2 22l4.828-1.528a9.98 9.98 0 0 0 5.203 1.458h.005c5.505 0 9.988-4.478 9.989-9.984-.001-2.666-1.037-5.171-2.923-7.057C17.218 3.003 14.708 2 12.031 2zm5.795 14.195c-.244.686-1.424 1.311-1.957 1.393-.496.077-1.12.11-3.238-.769-2.584-1.074-4.225-3.69-4.354-3.86-.128-.172-1.042-1.388-1.042-2.647 0-1.259.658-1.877.893-2.134.234-.257.512-.321.683-.321.171 0 .342.002.49.01.16.008.375-.061.587.447.218.524.747 1.821.813 1.954.066.134.11.29.022.463-.087.172-.132.279-.263.432-.131.154-.276.343-.394.461-.131.13-.268.272-.115.534.153.262.68 1.118 1.458 1.811.999.89 1.84 1.165 2.102 1.295.263.13.417.108.571-.068.154-.176.662-.772.838-1.037.176-.264.351-.22.592-.132.241.088 1.535.723 1.798.855.263.132.438.198.504.308.066.11.066.638-.178 1.324z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@webxpay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-[34px] h-[34px] rounded-lg bg-[#18181b] border border-zinc-800/80 flex items-center justify-center text-zinc-300 hover:text-[#f1ff5c] hover:bg-zinc-800/90 hover:border-[#f1ff5c]/40 hover:shadow-[0_0_12px_rgba(241,255,92,0.25)] transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.99-4.49V8.78a8.28 8.28 0 0 0 4.78 1.52V6.85a4.84 4.84 0 0 1-1-.16z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-sm font-semibold font-sora tracking-normal mb-6">
              {t.products}
            </h3>
            <ul className="space-y-2.5">
              {products.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white text-[13.5px] sm:text-[14px] transition-colors duration-150 inline-block font-normal font-manrope hover:translate-x-0.5 transform duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-sm font-semibold font-sora tracking-normal mb-6">
              {t.company}
            </h3>
            <ul className="space-y-2.5">
              {company.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white text-[13.5px] sm:text-[14px] transition-colors duration-150 inline-block font-normal font-manrope hover:translate-x-0.5 transform duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-sm font-semibold font-sora tracking-normal mb-6">
              {t.resources}
            </h3>
            <ul className="space-y-2.5">
              {resources.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white text-[13.5px] sm:text-[14px] transition-colors duration-150 inline-block font-normal hover:translate-x-0.5 transform duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Massive Outlined Watermark Text - Full Word Displayed without edge cropping */}
      <div className="w-full relative px-6 sm:px-10 lg:px-16 overflow-hidden flex items-center justify-center pt-6 sm:pt-10 pb-2 select-none pointer-events-none">
        {/* Soft, low-intensity #f1ff5c ambient tint pool - elegant and non-glaring */}
        <div
          className="absolute pointer-events-none w-full h-44 -bottom-6 left-1/2 -translate-x-1/2 blur-[85px] opacity-15"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 85%, rgba(241, 255, 92, 0.45) 0%, rgba(241, 255, 92, 0.12) 45%, transparent 75%)",
          }}
        />

        <svg
          viewBox="0 0 1200 180"
          className="w-full max-w-[1260px] h-auto select-none relative z-10"
          aria-hidden="true"
        >
          <defs>
            {/* Subtle, refined #f1ff5c gradient stroke */}
            <linearGradient id="brandHighlightStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f1ff5c" stopOpacity="0.15" />
              <stop offset="25%" stopColor="#f1ff5c" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#f1ff5c" stopOpacity="0.48" />
              <stop offset="75%" stopColor="#f1ff5c" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#f1ff5c" stopOpacity="0.15" />
            </linearGradient>

            {/* Boolean subtraction mask: cuts out all internal overlapping font lines, leaving strictly ONE single outer line */}
            <mask id="watermarkSingleLineMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="180">
              <rect width="1200" height="180" fill="black" />
              {/* 1. White stroked + filled text: creates the expanded outline boundary */}
              <text
                x="600"
                y="135"
                textAnchor="middle"
                textLength="1080"
                lengthAdjust="spacingAndGlyphs"
                fill="white"
                stroke="white"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="font-space font-bold select-none"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: "152px",
                  letterSpacing: "0.03em",
                }}
              >
                {isPayable ? "PAYABLE" : "WEBXPAY"}
              </text>
              {/* 2. Solid black fill cuts out internal meat and all internal overlapping wireframe lines */}
              <text
                x="600"
                y="135"
                textAnchor="middle"
                textLength="1080"
                lengthAdjust="spacingAndGlyphs"
                fill="black"
                stroke="none"
                className="font-space font-bold select-none"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: "152px",
                  letterSpacing: "0.03em",
                }}
              >
                {isPayable ? "PAYABLE" : "WEBXPAY"}
              </text>
            </mask>
          </defs>

          {/* Renders the #f1ff5c gradient through the single-line perimeter mask: 100% ONE LINE */}
          <rect
            x="0"
            y="0"
            width="1200"
            height="180"
            fill="url(#brandHighlightStroke)"
            mask="url(#watermarkSingleLineMask)"
          />
        </svg>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="border-t border-zinc-900 bg-[#08080a] relative">
        {/* Subtle #f1ff5c hairline divider accent */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#f1ff5c]/15 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-normal">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
            <span>
              © 2026 {isPayable ? "Payable (Pvt) Ltd." : "WEBXPAY (Pvt) Ltd."}
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="text-zinc-400">Powered by SEBS LABS</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            <LanguageSwitcher variant="footer" />
            <Link
              href="#privacy"
              className="text-zinc-400 hover:text-white transition-colors duration-150"
            >
              {t.privacyPolicy}
            </Link>
            <Link
              href="#terms"
              className="text-zinc-400 hover:text-white transition-colors duration-150"
            >
              {t.termsOfUse}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
