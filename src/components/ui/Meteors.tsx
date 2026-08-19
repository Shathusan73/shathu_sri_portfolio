"use client";

import { hashed } from "@/lib/hash";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type MeteorsProps = {
  count?: number;
};

export function Meteors({ count = 16 }: MeteorsProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  const items = Array.from({ length: count }, (_, index) => ({
    left: `${hashed(index + 2.1) * 100}%`,
    top: `${hashed(index + 11.7) * 55}%`,
    delay: `${hashed(index + 5.4) * 7}s`,
    duration: `${2.2 + hashed(index + 19.3) * 2.8}s`,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((item, index) => (
        <span
          key={index}
          className="meteor"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        />
      ))}
    </div>
  );
}
