"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  ariaLabel?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-cyan text-slate-950 shadow-[0_16px_40px_-16px_rgb(34_211_238_/_0.7)] hover:bg-cyan/85",
  secondary:
    "border border-white/15 bg-white/5 text-foreground hover:border-cyan/40 hover:bg-white/10",
  ghost: "text-foreground hover:text-cyan",
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = "button",
  variant = "primary",
  ariaLabel,
  download,
  target,
  rel,
  disabled,
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  function handleMove(event: React.MouseEvent<HTMLElement>) {
    if (reduced || disabled) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(
    "btn-shine inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300",
    variants[variant],
    disabled && "cursor-not-allowed opacity-60",
    className,
  );

  const style = reduced ? undefined : { x: springX, y: springY };

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal && !download) {
      return (
        <motion.div style={style} className="inline-flex">
          <Link
            ref={ref as React.RefObject<HTMLAnchorElement>}
            href={href}
            aria-label={ariaLabel}
            className={classes}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        download={download}
        target={target}
        rel={rel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={style}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
    >
      {children}
    </motion.button>
  );
}
