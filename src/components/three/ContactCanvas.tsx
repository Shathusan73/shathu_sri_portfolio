"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, PointLight } from "three";

import { SceneCanvas } from "./SceneCanvas";
import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type ContactCanvasProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

function PulseRing({ reducedMotion }: { reducedMotion: boolean }) {
  const torus = useRef<Mesh>(null);
  const inner = useRef<Mesh>(null);
  const lightA = useRef<PointLight>(null);
  const lightB = useRef<PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = reducedMotion ? 1 : 1 + Math.sin(t * 1.6) * 0.08;
    if (torus.current) {
      torus.current.scale.setScalar(pulse);
      torus.current.rotation.x = 1.15;
      torus.current.rotation.z = reducedMotion ? 0.2 : t * 0.22;
    }
    if (inner.current) {
      inner.current.rotation.y = reducedMotion ? 0.4 : t * 0.35;
    }
    if (lightA.current) {
      lightA.current.intensity = 0.9 + Math.sin(t * 1.8) * 0.35;
    }
    if (lightB.current) {
      lightB.current.intensity = 0.7 + Math.cos(t * 1.4) * 0.3;
    }
  });

  return (
    <group>
      <pointLight ref={lightA} position={[1.6, 1.2, 2.2]} color="#22d3ee" />
      <pointLight ref={lightB} position={[-1.8, -0.8, 1.6]} color="#a78bfa" />
      <mesh ref={torus}>
        <torusGeometry args={[1.15, 0.045, 16, 96]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.7}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          roughness={0.12}
          metalness={0.35}
          emissive="#38bdf8"
          emissiveIntensity={0.4}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

export default function ContactCanvas({ quality, reducedMotion }: ContactCanvasProps) {
  return (
    <SceneCanvas
      quality={quality}
      reducedMotion={reducedMotion}
      className="h-[220px] w-full sm:h-[260px]"
      cameraPosition={[0, 0.15, 4.2]}
      fov={40}
    >
      <ambientLight intensity={0.45} />
      <PulseRing reducedMotion={reducedMotion} />
    </SceneCanvas>
  );
}
