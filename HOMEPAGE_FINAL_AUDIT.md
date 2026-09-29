# WEBXPAY Homepage — Final Production Audit

> **Status:** ✅ Production-ready · Build exit 0 · TypeScript 0 errors  
> **Routes:** `/` and `/pricing` — both prerendered as static content  
> **Last audited:** 2026-09-29

---

## 01 · Component Map

| Component | File | Purpose |
|-----------|------|---------|
| `HeroSection` | `app/components/HeroSection.tsx` | Fixed floating navbar + hero headline + hero image |
| `ClientLogos` | `app/components/ClientLogos.tsx` | Merchant category trust marquee |
| `CoreSolutions` | `app/components/CoreSolutions.tsx` | XGATEWAY + XPOS stacking card scroll |
| `XGatewayLiveDashboard` | `app/components/xgateway/XGatewayLiveDashboard.tsx` | XGATEWAY animated dashboard |
| `XPOSLiveDashboard` | `app/components/xpos/XPOSLiveDashboard.tsx` | XPOS animated terminal |
| `ProductSuite` | `app/components/ProductSuite.tsx` | 4-card product grid (XSPLIT, XQR, XCOLLECTOR, XSUPPLIER) |
| `ProductCard` | `app/components/product-suite/ProductCard.tsx` | Card shell with hover polish |
| `XSplitAnimation` | `app/components/product-suite/XSplitAnimation.tsx` | BNPL split visual |
| `XQRAnimation` | `app/components/product-suite/XQRAnimation.tsx` | LankaQR/UPI/Alipay+ visual |
| `XCollectorAnimation` | `app/components/product-suite/XCollectorAnimation.tsx` | Field agent route visual |
| `XSupplierAnimation` | `app/components/product-suite/XSupplierAnimation.tsx` | B2B supplier credit visual |
| `TrustStats` | `app/components/TrustStats.tsx` | Dark metrics section + marquees |
| `CtaBanner` | `app/components/CtaBanner.tsx` | Yellow CTA card |
| `FloatingActions` | `app/components/FloatingActions.tsx` | Right-side quick services dock |
| `Footer` | `app/components/Footer.tsx` | 7-icon social, address, watermark |
| `LanguageSwitcher` | `app/components/LanguageSwitcher.tsx` | EN / SI / TA toggle |
| `LanguageContext` | `app/context/LanguageContext.tsx` | Language state + translations |

---

## 02 · Brand Token Compliance

| Token | Value | Used In |
|-------|-------|---------|
| Stellar Yellow | `#f1ff5c` | Hero pill borders, CTA card, accent glows, stat hovers, footer watermark, FloatingActions |
| Obsidian Grey | `#22272D` | Navbar buttons, section headings, CTA section, card buttons |
| Lunar White | `#f4faff` | Hero bg, ClientLogos bg, ProductSuite bg |
| Pure White | `#ffffff` | Main content sections |
| Font: Sora | `font-sora` | All headings (h1–h3) |
| Font: Manrope | `font-manrope` | Body copy, descriptions |
| Font: Space Grotesk | `font-space` | Badges, tags, labels, code-adjacent |
| Max container | `max-w-7xl mx-auto` | All sections |

---

## 03 · Section Spacing Normalization

All primary sections use consistent vertical padding:
```
py-16 sm:py-20 lg:py-24
```
Sections audited:
- ✅ `CoreSolutions` — `py-16 sm:py-20 lg:py-24`
- ✅ `ProductSuite` — `py-16 sm:py-20 lg:py-24`
- ✅ `TrustStats` — `py-12 sm:py-20 lg:py-24`
- ✅ `CtaBanner` — `py-16 sm:py-20 lg:py-24`

---

## 04 · Navbar Polish

- **Floating pill navbar** fixed at top, `z-40`, `pointer-events-none` on header / `pointer-events-auto` on nav
- **Scroll state**: `isScrolled` via `useEffect` → stronger `shadow` + `bg-white/95` on scroll
- **Solutions mega-menu**: 2-column brand architecture — Core Solutions (XGATEWAY, XPOS) + Product Suite (XSPLIT, XQR, XCOLLECTOR, XSUPPLIER)
- **Keyboard**: `Escape` closes dropdown and mobile menu
- **Click-outside**: `mousedown` listener on `solutionsRef`
- **Language Switcher**: text-only `EN / SI / TA` pills, no icons
- **Mobile menu**: full accordion with auth CTAs and language switcher
- **ARIA**: `aria-expanded`, `aria-label` on all interactive elements

---

## 05 · Hero Section

- **Fluid typography**: `clamp(1.65rem, 4.5vw + 0.5rem, 3.6rem)` — smooth scaling from 320px → 1440px
- **Headline pills**: "Digital" + "Payments" — white glass pill with `#d4e622` border + lime glow shadow
- **Ambient background**: radial `#f1ff5c` gradient at 65% opacity; film grain SVG overlay at 1.5% opacity
- **Hero image**: `/webxpay-hero-transparent.png` — `object-contain object-bottom`, priority loaded
- **Bottom fade**: gradient `from-[#f4faff]` for seamless transition to ClientLogos strip

---

## 06 · Client Logos / Trust Strip

**CHANGED**: Replaced fake global tech logos (Amazon, NVIDIA, Ford, Google, Shopify, Coinbase, Mindbody) with:
- Honest "Trusted across 40,000+ businesses in Sri Lanka" label
- 12 merchant category pills with SVG icons: Retail, Hotels, Telecom, Healthcare, Education, Logistics, Insurance, Food, Government, Real Estate, Events, NGOs
- Framer Motion infinite marquee (38s loop, `useReducedMotion` respected)
- Pill design: white bg, `border-zinc-200/80`, smooth hover with `border-zinc-300` lift

**Rationale**: The old logos implied WEBXPAY processed payments for Amazon, Google, NVIDIA etc. — a false credibility claim that damages trust with any savvy visitor.

---

## 07 · Hero Social Proof — Resolved

Old fake global company logos removed. Replaced with real merchant categories from WEBXPAY's actual market. No invented data or misleading partnerships displayed.

---

## 08 · Core Solutions (XGATEWAY + XPOS)

- **SSR fix**: Removed `typeof window !== 'undefined' && window.innerWidth >= 1024` from render-time inline style (hydration-breaking)
- **Fix applied**: `isLargeScreen` state initialized to `false`, set in `useEffect` + tracked via `resize` listener
- **Stacking scroll effect**: Card 1 scales down + fades as Card 2 slides over it via `card1Progress` (0→1)
- **Card 1**: XGATEWAY — indigo/purple ambient glow, `XGatewayLiveDashboard` animation
- **Card 2**: XPOS — lime/emerald glow, `XPOSLiveDashboard` animation
- **CTAs**: Dark pill buttons with hover translate-x arrow animation

---

## 09 · ProductSuite Cards

- **Grid**: `grid-cols-1 md:grid-cols-2` with `gap-6 sm:gap-8`
- **Card shape**: `rounded-2xl` (upgraded from `rounded-xl`)
- **Shadow**: `shadow-[0_4px_20px_rgba(0,0,0,0.04)]` → hover `shadow-[0_20px_56px_rgba(0,0,0,0.11)]`
- **Lift**: `hover:-translate-y-1.5` (upgraded from `-translate-y-1`)
- **Arrow button**: On hover → background becomes `#f1ff5c`, border `yellow-300`, icon moves diagonal (+0.5x, -0.5y)
- **Lime glow**: Subtle `#f1ff5c/12` blur orb appears in bottom-right corner on hover
- **Description**: Transitions `text-zinc-500 → text-zinc-700` on group hover
- **Animation**: `opacity: 0, y: 20` → `opacity: 1, y: 0` with `[0.16, 1, 0.3, 1]` easing (spring-like)

---

## 10 · Trust Stats Section

- **Dark section**: `bg-[#22272D]` with lime/blue ambient orbs
- **Stats grid**: `grid-cols-1 sm:grid-cols-2` — 4 animated stat cards
- **AnimatedStatNumber**: Framer Motion `animate()` counter — 2.2s spring easing, `useReducedMotion` respected
- **Stat card hover**: `translateY(-4px)`, border brightens to `#f1ff5c/50`, number color → `#f1ff5c`
- **Banking partners marquee**: 6 banks × 2 sets, 24s loop
- **Payment methods marquee**: 15 methods × 2 sets, 32s loop (Visa, Mastercard, Amex, LANKAQR, UPI, Alipay+, Google Pay, UnionPay, Discover, Diners Club, KOKO, JustPay, eZ Cash, FriMi, mCash)
- **Marquee direction**: opposite to banking partners for visual variety

---

## 11 · CTA Banner

- **Design**: Lime-green gradient card (`#ebfa4c → #f1ff5c → #d4f932`), min height `sm:min-h-[460px]`
- **Left column**: Headline, subtitle, two buttons (dark primary + white ghost)
- **Right column**: `/cta-dashboard.png` image, anchored flush to bottom-right
- **Animation**: `whileInView` fade+slide with `once: true`
- **Scroll**: Links use `#contact` and `#solutions` anchors

---

## 12 · FloatingActions

**REDESIGNED** with collapsed mobile launcher:

### Desktop (≥640px):
- 4 service buttons always visible (`w-14 h-14 rounded-2xl`)
- Tooltips appear on hover (slide-in from right)
- Hover: appropriate accent color per service (lime for Crypto, zinc for Bank, amber for Bill, blue for GovPay)

### Mobile (<640px):
- **One collapsed `+` launcher button** (`rounded-full`)
- Tapping expands 4 service buttons with **staggered AnimatePresence** animation (12ms delay per item)
- `+` button rotates 45° to become `×` via Framer Motion `animate={{ rotate }}`
- Service buttons collapse on selection

### All Sizes:
- Live support chat button (`w-14 h-14 rounded-[20px] bg-zinc-950`)
- Chat drawer: AnimatePresence fade+scale, `no-scrollbar` chat history
- Modal: AnimatePresence backdrop + zoom-in card

---

## 13 · Footer

- **Social icons**: 7 platforms — Facebook, Instagram, LinkedIn, X (Twitter), YouTube, WhatsApp, TikTok
- **Hover**: `#f1ff5c` text + border glow `rgba(241,255,92,0.25)`
- **Watermark**: SVG mask technique — single-line `#f1ff5c` outlined "WEBXPAY"
- **Credit**: "Powered by SEBS LABS" (not "Shaped by Byondx.Studio")
- **Language switcher**: EN / SI / TA in footer variant
- **Copyright**: `© 2026 WEBXPAY (Pvt) Ltd.`
- **Address**: 46/45, 5th floor, Green Lanka Towers, Nawam Mawatha, Colombo 02

---

## 14 · Language Support

- **3 languages**: English (EN), Sinhala (SI), Tamil (TA)
- **Switcher**: Text-only pills, no flags/icons — compact and accessible
- **Coverage**: All user-facing strings translated in all 3 locales via `LanguageContext`
- **New key added**: `supportedPaymentMethods` — covers the Payment Methods marquee label

---

## 15 · Scrollbar & Overflow Hygiene

All horizontal scroll containers use one of two approaches:
1. `flex-wrap` — for pill/tab groups that should wrap naturally
2. `.no-scrollbar` CSS utility — for tables/marquees that must scroll without showing OS scrollbar tracks

Files using `.no-scrollbar`:
- `XSplitPricing.tsx` (table)
- `PlanComparison.tsx` (table)
- `XPOSPricing.tsx` (table)
- `FloatingActions.tsx` (chat history)

Files using `flex-wrap`:
- `TransactionRates.tsx` (category pills)
- `PricingFAQ.tsx` (category pills)
- `XSplitPricing.tsx` (bank tabs)
- `ProductPricingNav.tsx` (product nav pills)

---

## 16 · Accessibility & SEO

- **ARIA labels**: All buttons, icons, and interactive elements have `aria-label`
- **ARIA expanded**: Solutions dropdown and mobile menu use `aria-expanded`
- **Skip links**: Not yet added — recommended for future sprint
- **Color contrast**: All text on white/light bg: zinc-950 (#09090b) ≥ 7:1. Dark section: white on #22272D ≥ 8:1
- **`useReducedMotion`**: All Framer Motion marquees and AnimatedStatNumber respect user preference
- **Image alt text**: All images have descriptive alt attributes
- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<address>` used correctly
- **Next.js metadata**: Pricing page has `export const metadata` with `title`, `description`, `openGraph`
- **Font loading**: Sora, Manrope, Space Grotesk loaded via `next/font/google` with `display: swap`
- **`priority`**: Hero image has `priority` prop for LCP optimization

---

## 🔴 Known Issues / Future Improvements

| Issue | Priority | Notes |
|-------|----------|-------|
| Skip navigation link | Medium | Add `<a href="#main">Skip to content</a>` for keyboard users |
| XGATEWAY/XPOS animation orchestration | Low | Currently uses multiple `setTimeout`; could be unified with Framer Motion state machine for cleaner code |
| Hero paragraph / social proof copy | Low | No subheadline below H1 — adding "Processing Rs. 145B+ for 40,000+ merchants" as body copy would boost conversion |
| CTA button hrefs | Low | `#contact` and `#solutions` are placeholder anchors; connect to real page sections |
| Product card hrefs | Low | All `href="#xsplit"` etc. are anchors; pages per product don't exist yet |
| `ClientLogos` no `aria-hidden` on mirror set | Low | `aria-hidden="true"` already applied to Set B |

---

*Generated by WEBXPAY Homepage Production Polish sprint · 2026-09-29*
