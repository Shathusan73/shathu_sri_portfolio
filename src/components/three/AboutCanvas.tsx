"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Group } from "three";

import { SceneCanvas } from "./SceneCanvas";
import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type AboutCanvasProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

function Crystal({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const targetX = reducedMotion ? 0.18 : state.pointer.y * 0.35;
    const targetY = reducedMotion ? 0.4 : state.pointer.x * 0.55;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    if (!reducedMotion) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh rotation={[0.4, 0, 0.2]}>
          <torusGeometry args={[1.45, 0.02, 12, 80]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[1.2, 0.4, 0]}>
          <torusGeometry args={[1.72, 0.012, 10, 80]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.32} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.15, 0]} />
          <meshPhysicalMaterial
            color="#1d4ed8"
            roughness={0.14}
            metalness={0.4}
            emissive="#0891b2"
            emissiveIntensity={0.22}
            clearcoat={1}
            clearcoatRoughness={0.15}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.16, 0]} />
          <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.42} />
        </mesh>
      </Float>
    </group>
  );
}

export default function AboutCanvas({ quality, reducedMotion }: AboutCanvasProps) {
  return (
    <SceneCanvas
      quality={quality}
      reducedMotion={reducedMotion}
      className="mx-auto aspect-square h-full w-full max-w-sm"
      cameraPosition={[0, 0, 4.2]}
      fov={42}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 2, 4]} intensity={1.2} />
      <pointLight position={[-2, 1, 2]} intensity={0.7} color="#67e8f9" />
      <Crystal reducedMotion={reducedMotion} />
    </SceneCanvas>
  );
}
