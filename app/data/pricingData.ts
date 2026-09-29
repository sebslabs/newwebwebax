export interface BillingOption {
  period: "6-month" | "12-month";
  months: number;
  priceLkr: number;
  label: string;
  perMonthEquivalent: number;
}

export interface PlanInclusions {
  merchantPortal: boolean;
  invoicing: boolean;
  apisAndPlugins: boolean;
  tokenization: boolean;
  support: string;
  settlementLkr: string;
  settlementIntl: string;
  monthlyLimit: string;
  volumeCommitment: string;
}

export interface GatewayPlan {
  id: "starter" | "economy" | "business";
  name: string;
  tagline: string;
  recommendedFor: string;
  popular?: boolean;
  volumeCommitmentLabel: string;
  volumeMin: number;
  volumeMax: number | null; // null for unlimited/above 25M
  billingOptions: BillingOption[];
  hasSixMonthOption: boolean;
  inclusions: PlanInclusions;
  includedProducts: string[];
  excludedProducts: string[];
  keyRates: {
    localVisaMaster: string;
    foreignVisaMaster: string;
    lankaQr: string;
    upiAlipay: string;
  };
  ctaText: string;
  ctaHref: string;
}

export interface TransactionRateItem {
  id: string;
  name: string;
  category: "cards" | "international" | "qr" | "wallets" | "banking" | "other";
  categoryLabel: string;
  starter: string;
  economy: string;
  business: string;
  badge?: string;
  note?: string;
  iconType: "visa" | "mastercard" | "amex" | "lankaqr" | "upi" | "alipay" | "googlepay" | "wallet" | "bank" | "split";
  status?: "active" | "inactive";
}

export interface PosPlan {
  id: "starter" | "economy" | "business";
  name: string;
  volumeCommitment: string;
  settlement: string;
  support: string;
  merchantPortal: boolean;
  installationFee: string;
  rates: {
    visaMasterLocal: string;
    visaMasterForeign: string;
    amexLocal: string;
    amexForeign: string;
    dinersClub: string;
    lankaQr: string;
    dccRate: string;
    unionPayLocal: string;
    unionPayForeign: string;
  };
}

export interface BankInstallment {
  bankId: string;
  bankName: string;
  bankShort: string;
  logo: string;
  accentColor: string;
  minimumTx: string;
  rates: {
    [tenor: string]: string; // e.g. "3m": "6.50%", "6m": "9.50%"
  };
  availableTenors: number[];
}

export interface PricingFaq {
  question: string;
  answer: string;
  category: "general" | "settlement" | "technical" | "pos" | "split";
}

// ==========================================
// 1. OFFICIAL XGATEWAY PLANS
// ==========================================
export const XGATEWAY_PLANS: GatewayPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Essential e-commerce acceptance for ambitious startups, solo entrepreneurs, and growing digital shops.",
    recommendedFor: "Merchants launching their first online store with low or flexible monthly volume.",
    popular: false,
    volumeCommitmentLabel: "None (Zero commitment)",
    volumeMin: 0,
    volumeMax: 10000000,
    billingOptions: [
      {
        period: "12-month",
        months: 12,
        priceLkr: 10000,
        label: "Rs. 10,000 / 12 Months",
        perMonthEquivalent: 833,
      },
    ],
    hasSixMonthOption: false,
    inclusions: {
      merchantPortal: true,
      invoicing: true,
      apisAndPlugins: true,
      tokenization: false,
      support: "Free (24/7 Phone & Email)",
      settlementLkr: "T+1 (Next Business Day)",
      settlementIntl: "T+2 (NBD + 1)",
      monthlyLimit: "Unlimited",
      volumeCommitment: "None",
    },
    includedProducts: ["XQR", "XPAYLINK", "XSPLIT"],
    excludedProducts: ["XSUPPLIER", "XCOLLECTOR"],
    keyRates: {
      localVisaMaster: "3.80%",
      foreignVisaMaster: "4.85%",
      lankaQr: "1.00%",
      upiAlipay: "1.80%",
    },
    ctaText: "Get Started Now",
    ctaHref: "https://dashboard.webxpay.com/register",
  },
  {
    id: "economy",
    name: "Economy",
    tagline: "High-volume optimized gateway with lower card MDR, tokenization, and B2B supplier financing support.",
    recommendedFor: "Active e-commerce brands processing between Rs. 10M and 25M monthly volume.",
    popular: true,
    volumeCommitmentLabel: "Rs. 10M – 25M / month",
    volumeMin: 10000000,
    volumeMax: 25000000,
    billingOptions: [
      {
        period: "6-month",
        months: 6,
        priceLkr: 29940,
        label: "Rs. 29,940 / 6 Months",
        perMonthEquivalent: 4990,
      },
      {
        period: "12-month",
        months: 12,
        priceLkr: 59880,
        label: "Rs. 59,880 / 12 Months",
        perMonthEquivalent: 4990,
      },
    ],
    hasSixMonthOption: true,
    inclusions: {
      merchantPortal: true,
      invoicing: true,
      apisAndPlugins: true,
      tokenization: true,
      support: "Free (24/7 Phone & Email)",
      settlementLkr: "T+1 (Next Business Day)",
      settlementIntl: "T+2 (NBD + 1)",
      monthlyLimit: "Unlimited",
      volumeCommitment: "Rs. 10m – 25m / month",
    },
    includedProducts: ["XQR", "XPAYLINK", "XSPLIT", "XSUPPLIER"],
    excludedProducts: ["XCOLLECTOR"],
    keyRates: {
      localVisaMaster: "3.10%",
      foreignVisaMaster: "4.85%",
      lankaQr: "1.00%",
      upiAlipay: "1.80%",
    },
    ctaText: "Choose Economy",
    ctaHref: "https://dashboard.webxpay.com/register",
  },
  {
    id: "business",
    name: "Business",
    tagline: "Enterprise-tier pricing with our lowest transaction rates, full product suite, and direct account management.",
    recommendedFor: "Large retail chains, high-volume marketplaces, and enterprises processing over Rs. 25M monthly.",
    popular: false,
    volumeCommitmentLabel: "> Rs. 25M / month",
    volumeMin: 25000000,
    volumeMax: null,
    billingOptions: [
      {
        period: "6-month",
        months: 6,
        priceLkr: 53940,
        label: "Rs. 53,940 / 6 Months",
        perMonthEquivalent: 8990,
      },
      {
        period: "12-month",
        months: 12,
        priceLkr: 107880,
        label: "Rs. 107,880 / 12 Months",
        perMonthEquivalent: 8990,
      },
    ],
    hasSixMonthOption: true,
    inclusions: {
      merchantPortal: true,
      invoicing: true,
      apisAndPlugins: true,
      tokenization: true,
      support: "Dedicated Account Lead + 24/7",
      settlementLkr: "T+1 (Next Business Day)",
      settlementIntl: "T+2 (NBD + 1)",
      monthlyLimit: "Unlimited",
      volumeCommitment: "> Rs. 25m / month",
    },
    includedProducts: ["XQR", "XPAYLINK", "XSPLIT", "XSUPPLIER", "XCOLLECTOR"],
    excludedProducts: [],
    keyRates: {
      localVisaMaster: "2.60%",
      foreignVisaMaster: "4.45%",
      lankaQr: "1.00%",
      upiAlipay: "1.80%",
    },
    ctaText: "Contact Sales / Sign Up",
    ctaHref: "https://dashboard.webxpay.com/register",
  },
];

// ==========================================
// 2. OFFICIAL TRANSACTION PROCESSING RATES
// ==========================================
export const TRANSACTION_RATES: TransactionRateItem[] = [
  // --- CARDS (LOCAL) ---
  {
    id: "visa-master-local",
    name: "Visa / Mastercard (Local)",
    category: "cards",
    categoryLabel: "Card Payments",
    starter: "3.80%",
    economy: "3.10%",
    business: "2.60%",
    badge: "Most Popular",
    iconType: "visa",
    status: "active",
  },
  {
    id: "amex-local",
    name: "American Express (Local)",
    category: "cards",
    categoryLabel: "Card Payments",
    starter: "3.99%",
    economy: "3.75%",
    business: "3.50%",
    iconType: "amex",
    status: "active",
  },
  {
    id: "discover-local",
    name: "Discover Cards",
    category: "cards",
    categoryLabel: "Card Payments",
    starter: "3.99%",
    economy: "3.75%",
    business: "3.50%",
    iconType: "visa",
    status: "active",
  },
  {
    id: "diners-local",
    name: "Diners Club International",
    category: "cards",
    categoryLabel: "Card Payments",
    starter: "3.99%",
    economy: "3.75%",
    business: "3.50%",
    iconType: "visa",
    status: "active",
  },
  {
    id: "unionpay-local",
    name: "UnionPay (Local)",
    category: "cards",
    categoryLabel: "Card Payments",
    starter: "3.80%",
    economy: "3.20%",
    business: "2.90%",
    iconType: "visa",
    status: "active",
  },

  // --- INTERNATIONAL CARDS & WALLETS ---
  {
    id: "visa-master-foreign",
    name: "Visa / Mastercard (Foreign / Cross-Border)",
    category: "international",
    categoryLabel: "International Payments",
    starter: "4.85%",
    economy: "4.85%",
    business: "4.45%",
    badge: "Multi-Currency Ready",
    iconType: "mastercard",
    status: "active",
  },
  {
    id: "foreign-amex-discover-diners",
    name: "Foreign Amex / Discover / Diners Club",
    category: "international",
    categoryLabel: "International Payments",
    starter: "4.85%",
    economy: "4.85%",
    business: "4.45%",
    iconType: "amex",
    status: "active",
  },
  {
    id: "foreign-unionpay",
    name: "Foreign UnionPay Cards",
    category: "international",
    categoryLabel: "International Payments",
    starter: "4.85%",
    economy: "4.85%",
    business: "4.45%",
    iconType: "visa",
    status: "active",
  },
  {
    id: "foreign-googlepay",
    name: "Foreign Google Pay",
    category: "international",
    categoryLabel: "International Payments",
    starter: "4.85%",
    economy: "4.85%",
    business: "4.45%",
    iconType: "googlepay",
    status: "active",
  },

  // --- QR & INSTANT RAILWAYS ---
  {
    id: "lanka-qr",
    name: "LANKAQR (National QR Standard)",
    category: "qr",
    categoryLabel: "QR & Instant Rails",
    starter: "1.00%",
    economy: "1.00%",
    business: "1.00%",
    badge: "Lowest Rate (1.00%)",
    note: "Interoperable with all Sri Lankan banking apps",
    iconType: "lankaqr",
    status: "active",
  },
  {
    id: "upi",
    name: "UPI (Unified Payments Interface - India)",
    category: "qr",
    categoryLabel: "QR & Instant Rails",
    starter: "1.80%",
    economy: "1.80%",
    business: "1.80%",
    badge: "Tourist Favorite",
    note: "Instant acceptance for Indian travelers & tourists",
    iconType: "upi",
    status: "active",
  },
  {
    id: "alipay-plus",
    name: "Alipay+ Cross-Border QR",
    category: "qr",
    categoryLabel: "QR & Instant Rails",
    starter: "1.80%",
    economy: "1.80%",
    business: "1.80%",
    badge: "Asia-Pacific",
    note: "Supports Alipay, Kakao Pay, GCash, Touch'n Go, TrueMoney",
    iconType: "alipay",
    status: "active",
  },

  // --- MOBILE WALLETS & BNPL ---
  {
    id: "googlepay-local",
    name: "Google Pay (Local Cards)",
    category: "wallets",
    categoryLabel: "Wallets & BNPL",
    starter: "3.80%",
    economy: "3.10%",
    business: "2.60%",
    badge: "1-Tap Pay",
    iconType: "googlepay",
    status: "active",
  },
  {
    id: "ez-cash",
    name: "eZ Cash (Dialog)",
    category: "wallets",
    categoryLabel: "Wallets & BNPL",
    starter: "2.65%",
    economy: "2.65%",
    business: "2.65%",
    iconType: "wallet",
    status: "active",
  },
  {
    id: "mcash",
    name: "mCash (SLT-Mobitel)",
    category: "wallets",
    categoryLabel: "Wallets & BNPL",
    starter: "2.65%",
    economy: "2.65%",
    business: "2.65%",
    iconType: "wallet",
    status: "active",
  },
  {
    id: "frimi",
    name: "FriMi Digital Wallet (Nations Trust)",
    category: "wallets",
    categoryLabel: "Wallets & BNPL",
    starter: "2.65%",
    economy: "2.65%",
    business: "2.65%",
    iconType: "wallet",
    status: "active",
  },
  {
    id: "koko-bnpl",
    name: "KOKO Buy Now Pay Later (BNPL)",
    category: "wallets",
    categoryLabel: "Wallets & BNPL",
    starter: "10.00%",
    economy: "10.00%",
    business: "10.00%",
    badge: "3-Instalment BNPL",
    note: "Instant 3-month split payments for end consumers",
    iconType: "split",
    status: "active",
  },
  {
    id: "pinelabs",
    name: "Pinelabs",
    category: "other",
    categoryLabel: "Other Services",
    starter: "—",
    economy: "6.00%",
    business: "6.00%",
    note: "Available on Economy & Business plans",
    iconType: "bank",
    status: "active",
  },

  // --- DIRECT BANKING / JUSTPAY ---
  {
    id: "justpay-high",
    name: "JustPay (Rs. 1,000 – Rs. 50,000)",
    category: "banking",
    categoryLabel: "Direct Bank Transfer",
    starter: "1.90%",
    economy: "1.90%",
    business: "1.90%",
    badge: "Flat 1.90%",
    iconType: "bank",
    status: "active",
  },
  {
    id: "justpay-mid",
    name: "JustPay (Rs. 250 – Rs. 1,000)",
    category: "banking",
    categoryLabel: "Direct Bank Transfer",
    starter: "2.50%",
    economy: "2.50%",
    business: "2.50%",
    iconType: "bank",
    status: "active",
  },
  {
    id: "justpay-low",
    name: "JustPay (Rs. 50 – Rs. 250)",
    category: "banking",
    categoryLabel: "Direct Bank Transfer",
    starter: "6.00%",
    economy: "6.00%",
    business: "6.00%",
    iconType: "bank",
    status: "active",
  },

  // --- INACTIVE CHANNELS (PRESERVED AS PER OFFICIAL DISCLOSURE) ---
  {
    id: "sampath-vishwa",
    name: "Sampath Vishwa",
    category: "banking",
    categoryLabel: "Direct Bank Transfer",
    starter: "Inactive",
    economy: "Inactive",
    business: "Inactive",
    iconType: "bank",
    status: "inactive",
    note: "Channel currently inactive with acquirer",
  },
  {
    id: "upay",
    name: "U Pay",
    category: "wallets",
    categoryLabel: "Wallets & BNPL",
    starter: "Inactive",
    economy: "Inactive",
    business: "Inactive",
    iconType: "wallet",
    status: "inactive",
    note: "Channel currently inactive with acquirer",
  },
];

// ==========================================
// 3. ADVANCED FEATURES & SPECIALIZED RATES
// ==========================================
export const ADVANCED_RATES = {
  tokenization: [
    {
      title: "Tokenization - Visa / Master (Local)",
      starter: "—",
      economy: "3.75%",
      business: "3.50%",
      description: "Secure 1-click card storage and automated recurring charge engine",
    },
    {
      title: "Tokenization - Visa / Master (Foreign)",
      starter: "—",
      economy: "4.85%",
      business: "4.45%",
      description: "Cross-border tokenized recurring billing in foreign currencies",
    },
    {
      title: "Tokenization - Amex (Local)",
      starter: "—",
      economy: "3.75%",
      business: "3.50%",
      description: "Automated recurring billing for American Express cardholders",
    },
    {
      title: "Tokenization - Amex (Foreign)",
      starter: "—",
      economy: "4.85%",
      business: "4.45%",
      description: "Cross-border tokenization for international American Express cards",
    },
  ],
  multiCurrency: {
    title: "Multi-Currency Settlement Engine",
    routes: ["USD → LKR", "USD → USD Direct", "GBP → GBP Direct"],
    processingRate: "4.85%",
    activationFee: "Rs. 5,000 (One-Off)",
    availablePlans: ["Economy", "Business"],
    settlementPeriod: "T+2 (Next Business Day + 1)",
    description: "Accept foreign credit cards in their home currency and settle directly in USD or GBP into your PFC (Personal Foreign Currency) account.",
  },
  b2bSupplier: {
    title: "XSUPPLIER Processing Rate",
    rate: "2.90%",
    availablePlans: ["Economy", "Business"],
    description: "Digital B2B wholesale payment processing with automated invoice reconciliation and vendor split settlements.",
  },
};

// ==========================================
// 4. OFFICIAL XPOS (IN-STORE POINT OF SALE)
// ==========================================
export const XPOS_PLANS: PosPlan[] = [
  {
    id: "starter",
    name: "Starter",
    volumeCommitment: "None",
    settlement: "T+1 (Next Business Day)",
    support: "Free (24/7 Phone & Field Support)",
    merchantPortal: true,
    installationFee: "Rs. 2,500",
    rates: {
      visaMasterLocal: "3.00%",
      visaMasterForeign: "3.90%",
      amexLocal: "3.90%",
      amexForeign: "3.90%",
      dinersClub: "3.90%",
      lankaQr: "1.00%",
      dccRate: "3.00%",
      unionPayLocal: "3.80%",
      unionPayForeign: "3.90%",
    },
  },
  {
    id: "economy",
    name: "Economy",
    volumeCommitment: "Rs. 10m – 25m / month",
    settlement: "T+1 (Next Business Day)",
    support: "Free (24/7 Phone & Field Support)",
    merchantPortal: true,
    installationFee: "Rs. 2,500",
    rates: {
      visaMasterLocal: "2.80%",
      visaMasterForeign: "3.70%",
      amexLocal: "3.70%",
      amexForeign: "3.70%",
      dinersClub: "3.70%",
      lankaQr: "1.00%",
      dccRate: "2.75%",
      unionPayLocal: "3.20%",
      unionPayForeign: "3.70%",
    },
  },
  {
    id: "business",
    name: "Business",
    volumeCommitment: "> Rs. 25m / month",
    settlement: "T+1 (Next Business Day)",
    support: "Free (Dedicated Priority Field Lead)",
    merchantPortal: true,
    installationFee: "Rs. 2,500",
    rates: {
      visaMasterLocal: "2.50%",
      visaMasterForeign: "3.50%",
      amexLocal: "3.50%",
      amexForeign: "3.50%",
      dinersClub: "3.50%",
      lankaQr: "1.00%",
      dccRate: "2.50%",
      unionPayLocal: "2.90%",
      unionPayForeign: "3.50%",
    },
  },
];

export const XPOS_CONDITIONS = [
  "Slip-print on request only. We generally provide slipless smart terminals as an environmental green initiative, but slip-printing terminals can be provisioned on request.",
  "A monthly low-volume maintenance fee of Rs. 4,500 will be charged if terminal processed card volume is less than Rs. 500,000 in a calendar month.",
  "One-time terminal setup, configuration, and merchant training fee is Rs. 2,500 per hardware unit.",
  "Settlement occurs on T+1 (Next Business Day) directly to your designated commercial bank account.",
];

// ==========================================
// 5. OFFICIAL XSPLIT (BANK INSTALMENT MATRIX)
// ==========================================
export const XSPLIT_TENORS = [3, 6, 9, 12, 15, 18, 24, 36, 48, 60];

export const XSPLIT_BANKS: BankInstallment[] = [
  {
    bankId: "commercial-bank",
    bankName: "Commercial Bank of Ceylon",
    bankShort: "COMBANK",
    logo: "/partners/combank.png",
    accentColor: "#0258a5",
    minimumTx: "Rs. 25,000",
    rates: {
      "3m": "5.00%",
      "6m": "6.50%",
      "12m": "9.00%",
      "18m": "14.00%",
      "24m": "18.00%",
    },
    availableTenors: [3, 6, 12, 18, 24],
  },
  {
    bankId: "union-bank",
    bankName: "Union Bank of Colombo",
    bankShort: "UNION BANK",
    logo: "/partners/unionbank.png",
    accentColor: "#d9232e",
    minimumTx: "Rs. 10,000",
    rates: {
      "3m": "6.50%",
      "6m": "9.50%",
      "12m": "14.75%",
      "18m": "20.00%",
      "24m": "21.00%",
      "36m": "22.00%",
    },
    availableTenors: [3, 6, 12, 18, 24, 36],
  },
  {
    bankId: "ndb",
    bankName: "NDB Bank",
    bankShort: "NDB",
    logo: "/partners/ndb.png",
    accentColor: "#0072bc",
    minimumTx: "Rs. 10,000",
    rates: {
      "6m": "8.00%",
      "9m": "10.00%",
      "12m": "11.00%",
      "18m": "14.00%",
      "24m": "17.00%",
      "36m": "23.00%",
    },
    availableTenors: [6, 9, 12, 18, 24, 36],
  },
  {
    bankId: "dfcc",
    bankName: "DFCC Bank",
    bankShort: "DFCC",
    logo: "/partners/dfcc.png",
    accentColor: "#e31b23",
    minimumTx: "Rs. 10,000",
    rates: {
      "3m": "7.00%",
      "6m": "9.00%",
      "9m": "10.00%",
      "12m": "12.00%",
      "15m": "13.00%",
      "18m": "14.00%",
      "24m": "19.00%",
      "36m": "24.00%",
      "48m": "34.00%",
      "60m": "40.00%",
    },
    availableTenors: [3, 6, 9, 12, 15, 18, 24, 36, 48, 60],
  },
  {
    bankId: "seylan",
    bankName: "Seylan Bank",
    bankShort: "SEYLAN",
    logo: "/partners/seylan.png",
    accentColor: "#b81232",
    minimumTx: "Rs. 10,000",
    rates: {
      "6m": "7.00%",
      "12m": "11.00%",
      "24m": "15.00%",
    },
    availableTenors: [6, 12, 24],
  },
];

export const XSPLIT_RULES = {
  generalMinimum: "Rs. 10,000",
  combankMinimum: "Rs. 25,000",
  legalDisclaimer: "XSPLIT Minimum transaction value is Rs. 10,000 with all partner banks except Rs. 25,000 with Commercial Bank of Ceylon. Rates and tenors are published separately on regular basis and are subject to acquirer adjustments and prevailing CBSL financial guidelines.",
};

// ==========================================
// 6. OFFICIAL FOOTNOTES & CONDITIONS
// ==========================================
export const OFFICIAL_FOOTNOTES = [
  {
    code: "CBSL",
    title: "Regulatory Compliance",
    text: "Rates & Conditions are subject to change in accordance with Central Bank of Sri Lanka (CBSL) statutory guidelines and acquiring commercial bank revisions.",
  },
  {
    code: "T+1",
    title: "LKR Settlement Window",
    text: "Local Currency (LKR) transactions settle on T+1 (Next Business Day) into any accredited commercial bank account in Sri Lanka.",
  },
  {
    code: "T+2",
    title: "Foreign Currency Settlement Window",
    text: "Foreign Currency cross-border transactions settle on T+2 (Next Business Day + 1) directly in USD or GBP into your corporate PFC account.",
  },
  {
    code: "TAX",
    title: "Statutory Levies",
    text: "All displayed subscription packages, integration costs, and terminal fees are exclusive of applicable government statutory taxes (VAT / SSCL where applicable).",
  },
  {
    code: "XPOS",
    title: "Smart Terminal Hardware Policy",
    text: "XPOS devices are deployed slipless as an eco-friendly green initiative. Physical slip printing terminals are provided on request. A monthly operational fee of Rs. 4,500 applies if monthly card volume falls below Rs. 500,000.",
  },
  {
    code: "TOKEN",
    title: "Tokenization & Vaulting",
    text: "Tokenization and recurring card vaulting are strictly available on Economy and Business tiers, fully compliant with PCI-DSS Level 1 token vaults.",
  },
];

// ==========================================
// 7. FREQUENTLY ASKED QUESTIONS (FAQS)
// ==========================================
export const PRICING_FAQS: PricingFaq[] = [
  {
    category: "general",
    question: "How do I choose between Starter, Economy, and Business plans?",
    answer: "If you are starting out or process under Rs. 10 Million per month, Starter requires zero monthly volume commitment with an affordable annual subscription of Rs. 10,000. If your monthly card and QR turnover exceeds Rs. 10M, upgrading to Economy unlocks lower 3.10% local card rates, tokenization, and B2B financing. For operations exceeding Rs. 25M monthly, Business provides our lowest 2.60% card rate, full product suite access, and dedicated enterprise account management.",
  },
  {
    category: "settlement",
    question: "When and how are customer payments settled into my bank account?",
    answer: "Local currency (LKR) card, QR, and wallet transactions are credited directly into your commercial bank account on T+1 (Next Business Day). International multi-currency collections (USD & GBP) settle on T+2 (NBD + 1) directly into your accredited PFC bank account.",
  },
  {
    category: "technical",
    question: "Are API integrations, eCommerce plugins, and the Merchant Portal free?",
    answer: "Yes! Every WEBXPAY tier includes full access to our Merchant Partner Portal, real-time transaction reporting, developer REST APIs, and official plugins for WooCommerce, Shopify, Magento, OpenCart, and custom webhooks without any extra hidden software license fees.",
  },
  {
    category: "split",
    question: "How does XSPLIT bank instalment processing work?",
    answer: "XSPLIT enables your customers to convert credit card transactions into 3 to 60-month instalments directly on your checkout page across leading Sri Lankan banks including Commercial Bank, Union Bank, NDB, DFCC, and Seylan Bank. The merchant receives 100% full settlement upfront on T+1, minus the bank tenor processing fee.",
  },
  {
    category: "pos",
    question: "What is the XPOS slipless terminal policy and low-volume fee?",
    answer: "As part of our paperless environmental green initiative, WEBXPAY provides digital SMS/Email receipting terminals. Physical receipt printers are available upon request. To cover cellular SIM connectivity and hardware maintenance, a nominal fee of Rs. 4,500 is only charged if a terminal processes less than Rs. 500,000 within a calendar month.",
  },
  {
    category: "general",
    question: "Can I accept international cards in USD or GBP?",
    answer: "Yes. Our Multi-Currency engine allows overseas customers to pay in USD or GBP while avoiding double-conversion FX penalties. Available on Economy and Business tiers with a one-time activation fee of Rs. 5,000, settling funds directly into your foreign currency PFC account at 4.85%.",
  },
  {
    category: "technical",
    question: "What is Tokenization and how does it benefit recurring merchants?",
    answer: "Tokenization securely replaces sensitive cardholder PAN numbers with encrypted, PCI-DSS Level 1 compliant tokens. This enables frictionless 1-click repeat checkouts, automated monthly SaaS subscriptions, and membership billing without storing raw credit card details on your servers.",
  },
  {
    category: "general",
    question: "How long does merchant KYC and onboarding take?",
    answer: "Online self-onboarding takes under 5 minutes on our Merchant Portal. Once your basic business registration and KYC documents are submitted, verification and acquiring bank gateway provisioning typically complete within 24 to 48 business hours.",
  },
];
