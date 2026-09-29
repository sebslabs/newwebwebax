"use client";

import { useState } from "react";

interface MultiCurrencyExpandProps {
  routes: string[];
  activationFee: string;
  description: string;
}

export default function MultiCurrencyExpand({
  routes,
  activationFee,
  description,
}: MultiCurrencyExpandProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 text-sm font-space font-semibold text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 rounded cursor-pointer"
      >
        <span>{open ? "Hide Processing Terms −" : "View Processing Terms +"}</span>
      </button>

      {/* Expanded details */}
      {open && (
        <div className="mt-4 border-t border-zinc-700/60 pt-4 space-y-3">
          {/* Routes */}
          <div>
            <span className="text-[10px] font-space uppercase tracking-wider text-zinc-400 block mb-1.5">
              Settlement Routes
            </span>
            <div className="flex flex-wrap gap-2">
              {routes.map((route) => (
                <span
                  key={route}
                  className="px-2.5 py-1 rounded-lg bg-zinc-700/50 border border-zinc-600/40 text-xs font-space text-zinc-200"
                >
                  {route}
                </span>
              ))}
            </div>
          </div>

          {/* Activation fee */}
          <div className="flex items-center justify-between py-2.5 border-b border-zinc-700/40">
            <span className="text-xs font-manrope text-zinc-400">One-time Activation</span>
            <span className="text-sm font-bold font-sora text-white">{activationFee}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-400 font-manrope leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
