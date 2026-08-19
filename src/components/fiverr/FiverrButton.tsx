"use client";

import { motion } from "motion/react";

import { FiverrIcon } from "@/components/ui/BrandIcons";
import { FIVERR_PROFILE_URL } from "@/data/fiverr";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function FiverrButton() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.a
      href={FIVERR_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hire me on Fiverr"
      initial={reduced ? false : { opacity: 0, y: 12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group pointer-events-auto fixed right-4 bottom-[5.75rem] z-50 flex items-center gap-3 print:hidden sm:right-6 sm:bottom-[6.25rem]"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#1a1a1a]/95 px-3 py-1.5 text-xs font-medium text-[#ddd] shadow-lg backdrop-blur-md transition-colors group-hover:border-[#1DBF73]/50 group-hover:text-white">
        Hire me
      </span>

      <span className="relative inline-flex h-14 w-14 items-center justify-center">
        {reduced ? null : (
          <span className="absolute inset-0 rounded-full bg-[#1DBF73]/40 blur-md transition-opacity group-hover:opacity-80" />
        )}
        <motion.span
          animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1DBF73] text-white shadow-[0_16px_40px_-12px_rgb(29_191_115/0.85)] ring-2 ring-white/15 transition group-hover:bg-[#19a463] group-hover:ring-white/30 group-focus-visible:ring-2 group-focus-visible:ring-white"
        >
          <FiverrIcon className="h-7 w-7" />
        </motion.span>
      </span>
    </motion.a>
  );
}
