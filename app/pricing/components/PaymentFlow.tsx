/**
 * PaymentFlow.tsx
 * Clean 3-step payment flow visualization for the WEBXPAY Pricing page.
 * Desktop: horizontal row with arrows.
 * Mobile: vertical stack with down-arrows.
 * Server component — pure HTML/Tailwind, no animations, no client hooks.
 */

/** Credit card icon (step 1) */
function IconCard() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-zinc-600"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

/** Lightning / shield icon (step 2) */
function IconShield() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-[#22272D]"
      aria-hidden="true"
    >
      <path d="M12 2l7 4v5c0 5-3.5 9-7 10C9 20 5 16 5 11V6l7-4z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

/** Bank / building icon (step 3) */
function IconBank() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-emerald-600"
      aria-hidden="true"
    >
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 3 7 21 7" />
    </svg>
  );
}

/** Horizontal right-arrow (desktop) / Down-arrow (mobile via rotate) */
function ArrowSeparator() {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0 rotate-90 sm:rotate-0"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 16"
        fill="none"
        className="w-10 h-4"
        aria-hidden="true"
      >
        {/* Shaft */}
        <line
          x1="0"
          y1="8"
          x2="32"
          y2="8"
          stroke="#f1ff5c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Arrowhead */}
        <polyline
          points="26,2 38,8 26,14"
          stroke="#f1ff5c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Arrowhead dark overlay for contrast on white bg */}
        <polyline
          points="26,2 38,8 26,14"
          stroke="#a3b000"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function PaymentFlow() {
  return (
    <section
      className="w-full py-6 sm:py-8 bg-white border-t border-b border-zinc-100"
      aria-label="Payment flow overview"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Optional section label */}
        <p className="text-center text-[11px] font-space uppercase tracking-widest text-zinc-400 mb-5 sm:mb-6">
          How it works
        </p>

        {/*
          Flow container:
          - Mobile: flex-col (vertical stack)
          - Desktop (sm+): flex-row (horizontal)
        */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2"
          role="list"
          aria-label="Payment processing steps"
        >
          {/* ── Step 1: Customer Pays ── */}
          <div
            role="listitem"
            className="flex flex-col items-center text-center gap-2 flex-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
              <IconCard />
            </div>
            <p className="text-sm font-semibold font-sora text-[#22272D]">
              Customer Pays
            </p>
            <p className="text-xs text-zinc-500 font-manrope">
              Card, QR, Wallet, or Bank
            </p>
          </div>

          <ArrowSeparator />

          {/* ── Step 2: WEBXPAY Processes ── */}
          <div
            role="listitem"
            className="flex flex-col items-center text-center gap-2 flex-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#f1ff5c] flex items-center justify-center">
              <IconShield />
            </div>
            <p className="text-sm font-semibold font-sora text-[#22272D]">
              WEBXPAY Processes
            </p>
            <p className="text-xs text-zinc-500 font-manrope">
              Secure · PCI-DSS · Real-time
            </p>
          </div>

          <ArrowSeparator />

          {/* ── Step 3: Your Bank Account ── */}
          <div
            role="listitem"
            className="flex flex-col items-center text-center gap-2 flex-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <IconBank />
            </div>
            <p className="text-sm font-semibold font-sora text-[#22272D]">
              Your Bank Account
            </p>
            <p className="text-xs text-zinc-500 font-manrope">
              Settled{" "}
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-space text-[10px] font-semibold leading-none border border-emerald-200/60">
                T+1
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
