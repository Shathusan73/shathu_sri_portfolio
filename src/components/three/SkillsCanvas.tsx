"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

import { SceneCanvas } from "./SceneCanvas";
import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type SkillsCanvasProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

const CRYSTALS = [
  { color: "#38bdf8", radius: 1.28, speed: 0.42, size: 0.22, phase: 0.2 },
  { color: "#818cf8", radius: 1.48, speed: -0.33, size: 0.18, phase: 1.1 },
  { color: "#22d3ee", radius: 1.12, speed: 0.51, size: 0.16, phase: 2.2 },
  { color: "#a78bfa", radius: 1.62, speed: 0.28, size: 0.2, phase: 3.4 },
  { color: "#60a5fa", radius: 0.95, speed: -0.46, size: 0.14, phase: 4.1 },
];

function OrbitCrystal({
  color,
  radius,
  speed,
  size,
  phase,
  reducedMotion,
}: (typeof CRYSTALS)[number] & { reducedMotion: boolean }) {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = reducedMotion ? phase : state.clock.elapsedTime * speed + phase;
    mesh.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.35) * 0.42, Math.sin(t) * radius * 0.55);
    mesh.current.rotation.x = t * 0.7;
    mesh.current.rotation.y = t * 0.9;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[size, 0]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.12}
        metalness={0.38}
        emissive={color}
        emissiveIntensity={0.32}
        clearcoat={1}
      />
    </mesh>
  );
}

export default function SkillsCanvas({ quality, reducedMotion }: SkillsCanvasProps) {
  const crystals = useMemo(
    () => (quality === "medium" ? CRYSTALS.slice(0, 4) : CRYSTALS),
    [quality],
  );

  return (
    <SceneCanvas
      quality={quality}
      reducedMotion={reducedMotion}
      className="h-[220px] w-full sm:h-[260px]"
      cameraPosition={[0, 0.1, 4.2]}
      fov={42}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[2.4, 1.6, 3]} intensity={1.1} color="#67e8f9" />
      <pointLight position={[-2, -1, 2]} intensity={0.6} color="#a78bfa" />
      {crystals.map((item) => (
        <OrbitCrystal key={item.color + item.phase} {...item} reducedMotion={reducedMotion} />
      ))}
    </SceneCanvas>
  );
}
