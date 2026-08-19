"use client";

import dynamic from "next/dynamic";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useRenderQuality } from "@/lib/hooks/useRenderQuality";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";

const AboutCanvas = dynamic(() => import("./AboutCanvas"), {
  ssr: false,
  loading: () => <AboutFallback />,
});

function AboutFallback() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <div className="absolute inset-8 rounded-[2rem] bg-linear-to-br from-cyan/20 via-blue/10 to-violet/20" />
      <div className="absolute inset-[22%] rotate-12 rounded-3xl border border-cyan/25 bg-white/5 shadow-lift" />
    </div>
  );
}

export function AboutObject() {
  const quality = useRenderQuality();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();

  if (!webgl || reduced || quality === "low") {
    return <AboutFallback />;
  }

  return <AboutCanvas quality={quality} reducedMotion={reduced} />;
}
