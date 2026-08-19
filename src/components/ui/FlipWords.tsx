"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type FlipWordsProps = {
  words: readonly string[];
  className?: string;
};

export function FlipWords({ words, className }: FlipWordsProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduced, words.length]);

  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={cn("inline-flex min-h-[1.15em] overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 18, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -18, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
