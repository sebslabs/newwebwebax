/**
 * WEBXPAY Pricing — Pure Calculation Functions
 * All values derived from pricingData.ts. Never hard-coded.
 */

import { XGATEWAY_PLANS } from "../../data/pricingData";

// ─── Types ────────────────────────────────────────────────────────────────

export type PlanId = "starter" | "economy" | "business";

export interface PlanRecommendation {
  planId: PlanId;
  planName: string;
  monthlyRate: number; // decimal e.g. 0.031 = 3.10%
  processingCost: number; // Rs.
  subscriptionMonthly: number; // Rs. / month equivalent
  totalMonthlyCost: number; // subscription + processing
}

export interface SavingsResult {
  monthlySaving: number; // Rs.
  annualSaving: number; // Rs.
  baselinePlanId: PlanId;
  baselinePlanName: string;
}

export interface XSplitResult {
  customerMonthlyInstalment: number; // Rs. per month
  merchantReceives: number; // Rs. (after MDR)
  bankMdr: number; // decimal e.g. 0.09
  tenorMonths: number;
}

// ─── Rate Map (from pricingData source of truth) ─────────────────────────

/** Local Visa/Master MDR by plan — matches TRANSACTION_RATES exactly */
export const LOCAL_CARD_RATE: Record<PlanId, number> = {
  starter: 0.038,   // 3.80%
  economy: 0.031,   // 3.10%
  business: 0.026,  // 2.60%
};

/** 12-month subscription price per plan (Rs.) */
export const SUBSCRIPTION_ANNUAL: Record<PlanId, number> = {
  starter: 10000,
  economy: 59880,
  business: 107880,
};

/** Volume thresholds (Rs./month) from XGATEWAY_PLANS */
export const VOLUME_THRESHOLDS = {
  economyMin: 10_000_000,   // Rs. 10M
  businessMin: 25_000_000,  // Rs. 25M
};

// ─── Core Calculations ────────────────────────────────────────────────────

/**
 * Calculate monthly card processing cost.
 * processingCost = monthlyVolume × mdr
 */
export function calculateProcessingCost(
  monthlyVolume: number,
  planId: PlanId
): number {
  return monthlyVolume * LOCAL_CARD_RATE[planId];
}

/**
 * Calculate monthly subscription cost (from annual 12-month plan).
 */
export function calculateMonthlySubscription(planId: PlanId): number {
  return SUBSCRIPTION_ANNUAL[planId] / 12;
}

/**
 * Calculate total monthly cost (subscription + processing).
 */
export function calculateTotalMonthlyCost(
  monthlyVolume: number,
  planId: PlanId
): number {
  return (
    calculateMonthlySubscription(planId) +
    calculateProcessingCost(monthlyVolume, planId)
  );
}

/**
 * Recommend a plan based on monthly volume.
 * Matches published thresholds in XGATEWAY_PLANS exactly.
 */
export function recommendPlan(monthlyVolume: number): PlanId {
  if (monthlyVolume >= VOLUME_THRESHOLDS.businessMin) return "business";
  if (monthlyVolume >= VOLUME_THRESHOLDS.economyMin) return "economy";
  return "starter";
}

/**
 * Calculate monthly savings vs. a baseline plan.
 * Always state the baseline clearly.
 */
export function calculateSavings(
  monthlyVolume: number,
  recommendedPlanId: PlanId,
  baselinePlanId: PlanId
): SavingsResult {
  const recommendedCost = calculateTotalMonthlyCost(
    monthlyVolume,
    recommendedPlanId
  );
  const baselineCost = calculateTotalMonthlyCost(monthlyVolume, baselinePlanId);
  const monthlySaving = baselineCost - recommendedCost;

  return {
    monthlySaving: Math.max(0, monthlySaving),
    annualSaving: Math.max(0, monthlySaving * 12),
    baselinePlanId,
    baselinePlanName:
      baselinePlanId.charAt(0).toUpperCase() + baselinePlanId.slice(1),
  };
}

/**
 * Build full plan recommendation object for PlanFinder display.
 */
export function buildPlanRecommendation(
  monthlyVolume: number
): PlanRecommendation {
  const planId = recommendPlan(monthlyVolume);
  const plan = XGATEWAY_PLANS.find((p) => p.id === planId)!;
  const monthlyRate = LOCAL_CARD_RATE[planId];
  const processingCost = calculateProcessingCost(monthlyVolume, planId);
  const subscriptionMonthly = calculateMonthlySubscription(planId);

  return {
    planId,
    planName: plan.name,
    monthlyRate,
    processingCost,
    subscriptionMonthly,
    totalMonthlyCost: processingCost + subscriptionMonthly,
  };
}

/**
 * Calculate XSPLIT customer instalment and merchant payout.
 * customerMonthlyInstalment = txValue / tenorMonths
 * merchantReceives = txValue × (1 - bankMdr)
 */
export function calculateXSplitPayout(
  transactionValue: number,
  bankMdrPercent: string, // e.g. "9.00%"
  tenorMonths: number
): XSplitResult {
  const bankMdr = parseFloat(bankMdrPercent) / 100;
  const customerMonthlyInstalment = transactionValue / tenorMonths;
  const merchantReceives = transactionValue * (1 - bankMdr);

  return {
    customerMonthlyInstalment,
    merchantReceives,
    bankMdr,
    tenorMonths,
  };
}

// ─── Formatters ───────────────────────────────────────────────────────────

/** Format Rs. amounts with standard WEBXPAY style: Rs. 59,880 */
export function formatRs(amount: number, decimals = 0): string {
  return `Rs. ${amount.toLocaleString("en-LK", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/** Format volume in short form: Rs. 15M, Rs. 2.5M */
export function formatVolume(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `Rs. ${m % 1 === 0 ? m : m.toFixed(1)}M`;
  }
  return formatRs(amount);
}

/** Format MDR as percentage string */
export function formatRate(decimal: number): string {
  return `${(decimal * 100).toFixed(2)}%`;
}
