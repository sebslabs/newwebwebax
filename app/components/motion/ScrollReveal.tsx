"use client";

import React from "react";
import { motion, useReducedMotion, Variants, Easing } from "framer-motion";

// ─── Easing & Timings ──────────────────────────────────────────────────────

export const PREMIUM_EASE: Easing = [0.22, 1, 0.36, 1]; // Fast start, smooth deceleration

// ─── Shared Variants ───────────────────────────────────────────────────────

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom: { duration?: number; delay?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.7,
      delay: custom.delay ?? 0,
      ease: PREMIUM_EASE,
    },
  }),
};

export const mobileFadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom: { duration?: number; delay?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.5,
      delay: custom.delay ?? 0,
      ease: PREMIUM_EASE,
    },
  }),
};

export const cardRevealVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: PREMIUM_EASE,
    },
  }),
};

export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: PREMIUM_EASE,
    },
  },
};

// ─── Reusable Motion Wrapper Components ─────────────────────────────────────

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  amount?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  yOffset = 28,
  amount = 0.2,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: PREMIUM_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  amount?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  amount = 0.15,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 20,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset, scale: 0.985 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.65,
            ease: PREMIUM_EASE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
