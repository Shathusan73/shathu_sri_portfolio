"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, RoundedBox, Sparkles } from "@react-three/drei";
import { Color, Group, Mesh, MeshStandardMaterial } from "three";

import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type HeroWorkspaceProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

const TECH = [
  { color: "#38bdf8", radius: 2.15, speed: 0.42, size: 0.16, phase: 0.2 },
  { color: "#2563eb", radius: 2.35, speed: 0.33, size: 0.2, phase: 1.4 },
  { color: "#22d3ee", radius: 1.95, speed: -0.38, size: 0.14, phase: 2.2 },
  { color: "#818cf8", radius: 2.55, speed: 0.28, size: 0.18, phase: 3.1 },
  { color: "#67e8f9", radius: 2.05, speed: -0.46, size: 0.12, phase: 4.0 },
];

function ScreenLines({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, index) => {
      const mesh = child as Mesh;
      const material = mesh.material as MeshStandardMaterial;
      material.opacity = 0.22 + ((Math.sin(t * 1.8 + index * 0.7) + 1) / 2) * 0.55;
    });
  });

  const widths = [0.72, 1.15, 0.9, 1.35, 0.58, 1.05];

  return (
    <group ref={group} position={[0, 0.04, 0.051]}>
      {widths.map((width, index) => (
        <mesh key={width} position={[-0.95 + width / 2, 0.42 - index * 0.16, 0]}>
          <planeGeometry args={[width, 0.055]} />
          <meshBasicMaterial color={index % 2 === 0 ? "#7dd3fc" : "#93c5fd"} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Laptop({ reducedMotion }: { reducedMotion: boolean }) {
  const screen = useRef<MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!screen.current || reducedMotion) return;
    screen.current.emissiveIntensity = 0.42 + Math.sin(state.clock.elapsedTime * 2.1) * 0.14;
  });

  return (
    <group rotation={[-0.16, 0.46, 0]} position={[0, -0.05, 0]}>
      <RoundedBox args={[2.45, 0.09, 1.58]} radius={0.045} smoothness={4} position={[0, -0.08, 0.1]}>
        <meshStandardMaterial color="#0f172a" metalness={0.72} roughness={0.22} />
      </RoundedBox>
      <mesh position={[0, -0.025, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.62, 0.95]} />
        <meshStandardMaterial color="#020617" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0.72, -0.018, 0.62]}>
        <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
      </mesh>
      <group position={[0, 0.84, -0.68]} rotation={[-0.2, 0, 0]}>
        <RoundedBox args={[2.38, 1.52, 0.07]} radius={0.045} smoothness={4}>
          <meshStandardMaterial color="#020617" metalness={0.55} roughness={0.28} />
        </RoundedBox>
        <mesh position={[0, 0.02, 0.046]}>
          <planeGeometry args={[2.08, 1.26]} />
          <meshStandardMaterial
            ref={screen}
            color="#082f49"
            emissive={new Color("#2563eb")}
            emissiveIntensity={0.45}
            roughness={0.18}
            metalness={0.15}
          />
        </mesh>
        <ScreenLines reducedMotion={reducedMotion} />
      </group>
    </group>
  );
}

function Satellite({
  color,
  radius,
  speed,
  size,
  phase,
  reducedMotion,
}: {
  color: string;
  radius: number;
  speed: number;
  size: number;
  phase: number;
  reducedMotion: boolean;
}) {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = reducedMotion ? phase : state.clock.elapsedTime * speed + phase;
    mesh.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.15) * 0.55 + 0.45, Math.sin(t) * radius * 0.72);
    mesh.current.rotation.x = t * 0.8;
    mesh.current.rotation.y = t * 1.1;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[size, 0]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.12}
        metalness={0.35}
        emissive={color}
        emissiveIntensity={0.28}
        clearcoat={1}
        clearcoatRoughness={0.12}
      />
    </mesh>
  );
}

function OrbitRing({
  radius,
  speed,
  color,
  tilt,
  reducedMotion,
}: {
  radius: number;
  speed: number;
  color: string;
  tilt: number;
  reducedMotion: boolean;
}) {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current || reducedMotion) return;
    mesh.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={mesh} rotation={[tilt, 0.3, 0]}>
      <torusGeometry args={[radius, 0.01, 12, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.38} />
    </mesh>
  );
}

export function HeroWorkspace({ quality, reducedMotion }: HeroWorkspaceProps) {
  const group = useRef<Group>(null);
  const { pointer, viewport } = useThree();
  const sparkleCount = quality === "high" ? 70 : quality === "medium" ? 36 : 0;
  const satellites = useMemo(
    () => (quality === "low" ? TECH.slice(0, 3) : TECH),
    [quality],
  );

  useFrame((state) => {
    if (!group.current) return;
    const targetX = reducedMotion ? 0.12 : pointer.y * 0.22;
    const targetY = reducedMotion ? -0.18 : pointer.x * 0.42;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.045;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.045;
    if (!reducedMotion) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.06;
    }
    if (!reducedMotion) {
      state.camera.position.x += (pointer.x * 0.55 - state.camera.position.x) * 0.035;
      state.camera.position.y += (0.32 + pointer.y * 0.18 - state.camera.position.y) * 0.035;
      state.camera.lookAt(0, 0.1, 0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <spotLight position={[4, 8, 4]} angle={0.4} penumbra={0.6} intensity={1.35} color="#ffffff" />
      <pointLight position={[-3.2, 2.2, 2.4]} intensity={1.1} color="#67e8f9" />
      <pointLight position={[3.4, -0.6, 2.2]} intensity={0.7} color="#818cf8" />
      {quality === "high" ? (
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={0.45} />
        </Suspense>
      ) : null}
      {sparkleCount > 0 ? (
        <Sparkles count={sparkleCount} scale={[7, 4.5, 5]} size={2.2} speed={0.35} color="#7dd3fc" opacity={0.65} />
      ) : null}
      <group ref={group} position={[0, -0.05, 0]} scale={Math.min(1.08, viewport.width / 8.8)}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}>
          <circleGeometry args={[2.35, 64]} />
          <meshStandardMaterial color="#071525" metalness={0.55} roughness={0.35} />
        </mesh>
        <Laptop reducedMotion={reducedMotion} />
        {satellites.map((item) => (
          <Satellite key={item.color + item.phase} {...item} reducedMotion={reducedMotion} />
        ))}
        {quality !== "low" ? (
          <>
            <OrbitRing radius={1.72} speed={0.18} color="#38bdf8" tilt={1.15} reducedMotion={reducedMotion} />
            <OrbitRing radius={2.15} speed={-0.12} color="#818cf8" tilt={0.72} reducedMotion={reducedMotion} />
          </>
        ) : null}
        <Float speed={1.2} floatIntensity={0.45} rotationIntensity={0.25}>
          <mesh position={[1.05, 0.72, 0.85]}>
            <octahedronGeometry args={[0.15, 0]} />
            <meshPhysicalMaterial color="#e0f2fe" metalness={0.4} roughness={0.16} clearcoat={1} />
          </mesh>
        </Float>
      </group>
      {quality !== "low" ? (
        <ContactShadows position={[0, -1.22, 0]} opacity={0.42} scale={9} blur={2.6} far={4} />
      ) : null}
    </>
  );
}

export default HeroWorkspace;
