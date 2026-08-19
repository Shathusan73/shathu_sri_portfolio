"use client";

import dynamic from "next/dynamic";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useRenderQuality } from "@/lib/hooks/useRenderQuality";
import { useWebGLSupport } from "@/lib/hooks/useWebGLSupport";

const GlobalCanvas = dynamic(() => import("./GlobalCanvas"), {
  ssr: false,
  loading: () => null,
});

export function GlobalBackground() {
  const quality = useRenderQuality();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();
  const canRender = webgl && quality !== "low" && !reduced;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {canRender ? <GlobalCanvas quality={quality} reducedMotion={reduced} /> : null}
    </div>
  );
}
