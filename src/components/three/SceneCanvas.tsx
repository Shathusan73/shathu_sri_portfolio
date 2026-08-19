"use client";

import { Canvas } from "@react-three/fiber";
import { useInView } from "motion/react";
import { useRef } from "react";

import { useIsClient } from "@/lib/hooks/useIsClient";
import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type SceneCanvasProps = {
  children: React.ReactNode;
  className?: string;
  quality: RenderQuality;
  reducedMotion: boolean;
  cameraPosition?: [number, number, number];
  fov?: number;
};

export function SceneCanvas({
  children,
  className,
  quality,
  reducedMotion,
  cameraPosition = [0, 0.28, 5.35],
  fov = 40,
}: SceneCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "20% 0px" });
  const isClient = useIsClient();
  const dpr: [number, number] =
    quality === "high" ? [1, 1.6] : quality === "medium" ? [1, 1.25] : [1, 1];

  return (
    <div ref={ref} className={className}>
      {isClient ? (
        <Canvas
          dpr={dpr}
          frameloop={reducedMotion || !inView ? "demand" : "always"}
          gl={{ antialias: quality !== "low", alpha: true, powerPreference: "high-performance" }}
          camera={{ position: cameraPosition, fov }}
          style={{ width: "100%", height: "100%", display: "block" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          {children}
        </Canvas>
      ) : null}
    </div>
  );
}
