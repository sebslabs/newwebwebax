/**
 * PricingHero.tsx
 * Reduced-height hero section for the WEBXPAY Pricing page.
 * Server component — no client hooks, no interactivity.
 */

const trustMetrics = [
  {
    value: "T+1",
    label: "Next-day LKR Settlement",
  },
  {
    value: "1.00%",
    label: "Lowest LANKAQR Rate",
  },
  {
    value: "3,000+",
    label: "Active Sri Lankan Merchants",
  },
  {
    value: "PCI-DSS",
    label: "Level 1 Security Standard",
  },
] as const;

export default function PricingHero() {
  return (
    <section
      className="w-full pt-28 sm:pt-32 pb-10 sm:pb-14 lg:pb-16 relative overflow-hidden"
      aria-labelledby="pricing-hero-heading"
    >
      {/* Ambient lime glow — reduced intensity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
        style={{
          height: "60%",
          background:
            "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(241,255,92,0.35) 0%, transparent 75%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline */}
        <h1
          id="pricing-hero-heading"
          className="font-sora font-semibold text-[#22272D] leading-[1.12] text-center whitespace-pre-line"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
        >
          {`Transparent, scale-ready\npricing for Sri Lanka's\nambitious businesses.`}
        </h1>

        {/* Supporting copy */}
        <p className="text-base sm:text-lg text-zinc-600 font-manrope text-center mt-3 mb-8">
          One flat rate. No hidden fees. No surprises.
        </p>

        {/* Trust Metric Badges */}
        <div
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
          role="list"
          aria-label="Key trust metrics"
        >
          {trustMetrics.map((metric) => (
            <div
              key={metric.value}
              role="listitem"
              className="flex flex-col items-center px-5 py-3 bg-white rounded-2xl border border-zinc-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.05)] min-w-[120px]"
            >
              <span className="text-xl sm:text-2xl font-bold font-sora text-[#22272D]">
                {metric.value}
              </span>
              <span className="text-[11px] text-zinc-500 font-space uppercase tracking-wide mt-0.5 text-center">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
