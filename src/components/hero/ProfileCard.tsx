"use client";

import { Download, MapPin } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { FlipWords } from "@/components/ui/FlipWords";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function ProfileCard() {
  const reduced = usePrefersReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18 });

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - y) * 7);
    rotateY.set((x - 0.5) * 9);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.aside
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="profile-card relative isolate flex h-fit w-full flex-col overflow-hidden p-4 sm:p-5"
      aria-label="Profile"
    >
      <div className="pointer-events-none absolute -top-16 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#ff5c00]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-36 w-36 rounded-full bg-[#c8f900]/10 blur-3xl" />

      <motion.div
        ref={photoRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduced ? undefined : { rotateX: springX, rotateY: springY, transformPerspective: 900 }}
        className="profile-photo group relative mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl lg:max-w-full"
      >
        <Image
          src={site.profileImage}
          alt={`${site.fullName} — ${site.role}`}
          fill
          priority
          sizes="(max-width: 1024px) 280px, 360px"
          className="object-cover object-[center_18%] transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#111]/80 via-transparent to-[#ff5c00]/15" />
        <div className="profile-photo-shine pointer-events-none absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111]/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8f900] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c8f900]" />
            </span>
            Available
          </span>
          <span className="rounded-full bg-[#ff5c00] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
            {site.role}
          </span>
        </div>
      </motion.div>

      <div className="relative mt-5 shrink-0 text-center">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#ff5c00] uppercase">Portfolio</p>
        <h2 className="mt-1.5 text-[1.65rem] leading-tight font-black tracking-tight text-white">
          {site.fullName}
        </h2>
        <p className="mt-2 text-sm text-[#888]">
          <FlipWords words={site.flipWords} className="text-[#ff5c00]" />
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#666]">
          <MapPin className="h-3.5 w-3.5 text-[#ff5c00]" aria-hidden />
          {site.contact.location}
        </p>
      </div>

      <p className="relative mt-4 shrink-0 text-center text-sm leading-relaxed text-[#888]">
        Building intelligent digital products with modern web systems and applied AI.
      </p>

      <div className="relative mt-5 grid shrink-0 grid-cols-2 gap-2">
        <Link
          href={site.cvHref}
          className="btn-shine inline-flex items-center justify-center gap-1.5 rounded-full bg-[#ff5c00] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#ff7a2e]"
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          Download CV
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:border-[#ff5c00]/50 hover:text-[#ff5c00]"
        >
          Let’s talk
        </Link>
      </div>

      <div className="relative mt-4 flex shrink-0 justify-center pb-1">
        <SocialIcons />
      </div>
    </motion.aside>
  );
}
