"use client";

import { Canvas } from "@react-three/fiber";

import { useDocumentHidden } from "@/lib/hooks/useDocumentHidden";
import { useIsClient } from "@/lib/hooks/useIsClient";
import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

import GlobalField from "./GlobalField";

type GlobalCanvasProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

export default function GlobalCanvas({ quality, reducedMotion }: GlobalCanvasProps) {
  const isClient = useIsClient();
  const hidden = useDocumentHidden();
  const dpr: [number, number] = quality === "high" ? [1, 1.35] : [1, 1.1];

  return (
    <div className="h-full w-full">
      {isClient ? (
        <Canvas
          dpr={dpr}
          frameloop={reducedMotion || hidden ? "demand" : "always"}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 6.4], fov: 50 }}
          style={{ width: "100%", height: "100%", display: "block" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <GlobalField quality={quality} reducedMotion={reducedMotion} />
        </Canvas>
      ) : null}
    </div>
  );
}
