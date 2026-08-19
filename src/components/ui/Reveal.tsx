"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type RevealDirection = "up" | "down" | "left" | "right" | "scale";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  direction?: RevealDirection;
};

function getInitial(direction: RevealDirection, y: number) {
  switch (direction) {
    case "down":
      return { opacity: 0, y: -y };
    case "left":
      return { opacity: 0, x: -y };
    case "right":
      return { opacity: 0, x: y };
    case "scale":
      return { opacity: 0, scale: 0.94 };
    default:
      return { opacity: 0, y };
  }
}

function getAnimate(direction: RevealDirection) {
  switch (direction) {
    case "left":
    case "right":
      return { opacity: 1, x: 0 };
    case "scale":
      return { opacity: 1, scale: 1 };
    default:
      return { opacity: 1, y: 0 };
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const initial = getInitial(direction, y);
  const animate = inView ? getAnimate(direction) : initial;

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
