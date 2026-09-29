import React from "react";
import type { Metadata } from "next";
import PricingNavbar from "./components/PricingNavbar";
import PricingHero from "./components/PricingHero";
import ProductPricingNav from "./components/ProductPricingNav";
import XGatewayPricing from "./components/XGatewayPricing";
import PlanFinder from "./components/PlanFinder";
import PlanComparison from "./components/PlanComparison";
import TransactionRates from "./components/TransactionRates";
import MultiCurrencyCard from "./components/MultiCurrencyCard";
import AdvancedRates from "./components/AdvancedRates";
import XPOSPricing from "./components/XPOSPricing";
import XSplitPricing from "./components/XSplitPricing";
import PricingNotes from "./components/PricingNotes";
import PricingFAQ from "./components/PricingFAQ";
import PricingCTA from "./components/PricingCTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "WEBXPAY Pricing | Payment Gateway, POS & Bank Instalment Rates Sri Lanka",
  description:
    "Official WEBXPAY pricing: Explore XGATEWAY subscription tiers, in-store XPOS terminals, and XSPLIT bank instalment rates. Central Bank of Sri Lanka compliant, PCI-DSS Level 1, with T+1 bank settlements.",
  keywords: [
    "WEBXPAY pricing",
    "Sri Lanka payment gateway rates",
    "Internet Payment Gateway Sri Lanka",
    "LANKAQR rates",
    "Credit card processing rates Colombo",
    "POS terminal pricing Sri Lanka",
    "Bank instalment rates Sri Lanka",
    "XGATEWAY",
    "XPOS",
    "XSPLIT",
  ],
};

export default function PricingPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#f4faff] text-[#22272D] flex flex-col font-sans overflow-x-hidden">
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

      {/* Persistent Floating Navigation */}
      <PricingNavbar />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1">
        {/* 1. Hero Section */}
        <PricingHero />

        {/* 2. Sticky Sub-Navigation */}
        <ProductPricingNav />

        {/* 3. XGATEWAY Core Subscriptions */}
        <XGatewayPricing />

        {/* 4. Plan Recommendation Calculator */}
        <PlanFinder />

        {/* 5. Compare Plan Features (Collapsed initially) */}
        <PlanComparison />

        {/* 6. All Payment Rates (Filterable / Expandable) */}
        <TransactionRates />

        {/* 7. Multi-Currency Spotlight & Specialized Rates */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <MultiCurrencyCard />
          <AdvancedRates />
        </div>

        {/* 8. XPOS Smart Android Terminal Pricing */}
        <XPOSPricing />

        {/* 9. XSPLIT Bank Instalment Matrix & Calculator */}
        <XSplitPricing />

        {/* 10. Official Disclosures & Footnotes */}
        <PricingNotes />

        {/* 11. Interactive FAQ Accordion */}
        <PricingFAQ />

        {/* 12. Final Call-to-Action */}
        <PricingCTA />
      </main>

      {/* Footer */}
      <Footer brand="webxpay" />
    </div>
  );
}
