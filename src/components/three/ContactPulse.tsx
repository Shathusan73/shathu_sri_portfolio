"use client";

import dynamic from "next/dynamic";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useRenderQuality } from "@/lib/hooks/useRenderQuality";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";

const ContactCanvas = dynamic(() => import("./ContactCanvas"), {
  ssr: false,
  loading: () => <ContactFallback />,
});

function ContactFallback() {
  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-[1.6rem] border border-cyan/20 bg-white/5 sm:h-[260px]">
      <div className="absolute inset-12 rounded-full border border-cyan/30" />
      <div className="absolute inset-[38%] rounded-full bg-cyan/20 blur-xl" />
    </div>
  );
}

export function ContactPulse() {
  const quality = useRenderQuality();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();

  if (!webgl || reduced || quality === "low") {
    return <ContactFallback />;
  }

  return <ContactCanvas quality={quality} reducedMotion={reduced} />;
}
