"use client";

import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";

export default function HeroSection() {
  return (
    <div className="relative w-full bg-[#f4faff] text-[#22272D] flex flex-col items-center font-sans pb-0 overflow-x-hidden">
      {/* 1. Subtle SVG Noise Overlay */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.015] mix-blend-multiply">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* 2. Atmospheric Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(241, 255, 92, 0.65) 0%, rgba(241, 255, 92, 0.35) 30%, rgba(244, 250, 255, 0.4) 58%, rgba(244, 250, 255, 1) 78%)",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#f4faff] via-[#f4faff]/80 to-transparent" />
      </div>

      {/* Shared Locked Navbar */}
      <Navbar />

      {/* Hero Section Content — Full-Width Edge-to-Edge on Mobile */}
      <main className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center pt-20 sm:pt-28 lg:pt-36 px-4 sm:px-6 lg:px-8 text-center pb-0">
        
        {/* Main Headline */}
        <h1 className="text-[32px] xs:text-[36px] sm:text-4xl md:text-5xl lg:text-[56px] font-bold sm:font-medium text-[#22272D] leading-[1.12] sm:leading-[1.13] font-sora max-w-4xl tracking-tight">
          <span className="text-[#22272D] block mb-1 sm:mb-2 font-semibold sm:font-normal">
            Powering the Future of
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-2 font-sora">
            {/* Pill 1: "Digital" */}
            <span className="inline-flex items-center justify-center px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#d4e622] shadow-[0_0_20px_rgba(241,255,92,0.45)] text-[#22272D] font-bold sm:font-medium hover:scale-105 transition-transform duration-200">
              Digital
            </span>
            {/* Pill 2: "Payments" */}
            <span className="inline-flex items-center justify-center px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#d4e622] shadow-[0_0_20px_rgba(241,255,92,0.45)] text-[#22272D] font-bold sm:font-medium hover:scale-105 transition-transform duration-200">
              Payments
            </span>
          </div>
        </h1>

        {/* Full-Width Mobile Edge-to-Edge Hero Image Showcase */}
        <div className="relative w-[calc(100%+32px)] -mx-4 sm:mx-auto sm:w-full max-w-none sm:max-w-4xl lg:max-w-[960px] xl:max-w-[1040px] mt-4 sm:mt-8 mb-0 h-[290px] xs:h-[330px] sm:h-[380px] md:h-[440px] lg:h-[500px] xl:h-[540px] flex items-end justify-center overflow-hidden">
          <Image
            src="/webxpay-hero-transparent.png"
            alt="WEBXPAY Digital Payments Ecosystem"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1040px"
            className="object-contain object-bottom scale-[1.18] sm:scale-100 origin-bottom select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
          />
        </div>

      </main>
    </div>
  );
}
