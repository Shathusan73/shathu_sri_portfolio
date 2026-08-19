"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const isFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!isFinePointer || reduced) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [isFinePointer, reduced, x, y]);

  if (!isFinePointer || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/50 mix-blend-screen lg:block"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    />
  );
}
