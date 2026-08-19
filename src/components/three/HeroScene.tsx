"use client";

import dynamic from "next/dynamic";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useRenderQuality } from "@/lib/hooks/useRenderQuality";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";

import { HeroFallback } from "./HeroFallback";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroScene() {
  const quality = useRenderQuality();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();
  const canRender = webgl && !reduced;

  return (
    <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[560px]">
      {canRender ? <HeroCanvas quality={quality} reducedMotion={reduced} /> : <HeroFallback />}
    </div>
  );
}
