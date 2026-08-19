"use client";

import { SceneCanvas } from "./SceneCanvas";
import NeuralNetworkScene from "./NeuralNetworkScene";
import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type NeuralCanvasProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

export default function NeuralCanvas({ quality, reducedMotion }: NeuralCanvasProps) {
  return (
    <SceneCanvas
      quality={quality}
      reducedMotion={reducedMotion}
      className="h-[320px] w-full sm:h-[380px] lg:h-[420px]"
      cameraPosition={[0, 0, 8.2]}
      fov={40}
    >
      <NeuralNetworkScene quality={quality} reducedMotion={reducedMotion} />
    </SceneCanvas>
  );
}
