"use client";

import dynamic from "next/dynamic";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useRenderQuality } from "@/lib/hooks/useRenderQuality";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";

const SkillsCanvas = dynamic(() => import("./SkillsCanvas"), {
  ssr: false,
  loading: () => <SkillsFallback />,
});

function SkillsFallback() {
  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 sm:h-[260px]">
      <div className="absolute inset-8 rounded-full border border-cyan/20" />
      <div className="absolute inset-16 rounded-full border border-violet/20" />
    </div>
  );
}

export function SkillsOrbit() {
  const quality = useRenderQuality();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();

  if (!webgl || reduced || quality === "low") {
    return <SkillsFallback />;
  }

  return <SkillsCanvas quality={quality} reducedMotion={reduced} />;
}
