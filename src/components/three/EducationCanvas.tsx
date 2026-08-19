"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Group } from "three";

import { SceneCanvas } from "./SceneCanvas";
import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type EducationCanvasProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

function DiplomaGem({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.28;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
  });

  return (
    <group ref={group}>
      <Float speed={1.1} floatIntensity={0.35} rotationIntensity={0.2}>
        <mesh>
          <octahedronGeometry args={[1.05, 0]} />
          <meshPhysicalMaterial
            color="#67e8f9"
            roughness={0.08}
            metalness={0.45}
            emissive="#22d3ee"
            emissiveIntensity={0.28}
            clearcoat={1}
            transmission={0.18}
            thickness={0.4}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[1.07, 0]} />
          <meshBasicMaterial color="#e0f2fe" wireframe transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.35, 0.015, 10, 80]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.45} />
        </mesh>
      </Float>
    </group>
  );
}

export default function EducationCanvas({ quality, reducedMotion }: EducationCanvasProps) {
  return (
    <SceneCanvas
      quality={quality}
      reducedMotion={reducedMotion}
      className="mx-auto h-[240px] w-full max-w-xs sm:h-[280px]"
      cameraPosition={[0, 0.1, 4]}
      fov={40}
    >
      <ambientLight intensity={0.65} />
      <pointLight position={[2, 2.4, 3]} intensity={1.2} color="#fde68a" />
      <pointLight position={[-2, -1, 2]} intensity={0.7} color="#67e8f9" />
      <DiplomaGem reducedMotion={reducedMotion} />
    </SceneCanvas>
  );
}
