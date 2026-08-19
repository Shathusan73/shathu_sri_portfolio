"use client";

import { SceneCanvas } from "./SceneCanvas";
import HeroWorkspace from "./HeroWorkspace";
import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type HeroCanvasProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

export default function HeroCanvas({ quality, reducedMotion }: HeroCanvasProps) {
  return (
    <SceneCanvas quality={quality} reducedMotion={reducedMotion} className="h-full min-h-[340px] w-full">
      <HeroWorkspace quality={quality} reducedMotion={reducedMotion} />
    </SceneCanvas>
  );
}
