"use client";

import dynamic from "next/dynamic";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useRenderQuality } from "@/lib/hooks/useRenderQuality";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";

const EducationCanvas = dynamic(() => import("./EducationCanvas"), {
  ssr: false,
  loading: () => <EducationFallback />,
});

function EducationFallback() {
  return (
    <div className="relative mx-auto h-[240px] w-full max-w-xs sm:h-[280px]">
      <div className="absolute inset-10 rotate-45 rounded-2xl border border-amber-300/30 bg-cyan/10" />
    </div>
  );
}

export function EducationGem() {
  const quality = useRenderQuality();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();

  if (!webgl || reduced || quality === "low") {
    return <EducationFallback />;
  }

  return <EducationCanvas quality={quality} reducedMotion={reduced} />;
}
