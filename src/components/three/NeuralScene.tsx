"use client";

import dynamic from "next/dynamic";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useRenderQuality } from "@/lib/hooks/useRenderQuality";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";

const NeuralCanvas = dynamic(() => import("./NeuralCanvas"), {
  ssr: false,
  loading: () => <div className="h-[320px] w-full bg-white/5 sm:h-[380px] lg:h-[420px]" />,
});

export function NeuralScene() {
  const quality = useRenderQuality();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();

  if (!webgl) {
    return (
      <div className="h-[320px] min-h-[280px] w-full bg-[radial-gradient(circle_at_center,#163055,transparent_60%)] sm:h-[380px] lg:h-[420px]" />
    );
  }

  return <NeuralCanvas quality={quality} reducedMotion={reduced} />;
}
