"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import { Color, Group, Mesh } from "three";

import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type NeuralNetworkSceneProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

const LAYERS = [
  { x: -3.15, count: 4, color: "#67e8f9", z: 0.35 },
  { x: -1.55, count: 5, color: "#38bdf8", z: -0.2 },
  { x: 0, count: 6, color: "#818cf8", z: 0.45 },
  { x: 1.55, count: 4, color: "#60a5fa", z: -0.15 },
  { x: 3.15, count: 3, color: "#22d3ee", z: 0.25 },
];

function nodePosition(layer: (typeof LAYERS)[number], index: number) {
  const span = (layer.count - 1) * 0.72;
  return [layer.x, span / 2 - index * 0.72, layer.z + (index % 2 === 0 ? 0.12 : -0.12)] as const;
}

function Pulse({
  from,
  to,
  delay,
  color,
}: {
  from: readonly [number, number, number];
  to: readonly [number, number, number];
  delay: number;
  color: string;
}) {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = (state.clock.elapsedTime * 0.42 + delay) % 1;
    mesh.current.position.set(
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t,
      from[2] + (to[2] - from[2]) * t,
    );
    mesh.current.scale.setScalar(0.7 + Math.sin(t * Math.PI) * 0.8);
    const material = mesh.current.material;
    if ("opacity" in material) {
      material.opacity = 0.15 + Math.sin(t * Math.PI) * 0.85;
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.05, 10, 10]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

export function NeuralNetworkScene({ quality, reducedMotion }: NeuralNetworkSceneProps) {
  const group = useRef<Group>(null);
  const nodes = useMemo(
    () => LAYERS.map((layer) => Array.from({ length: layer.count }, (_, index) => nodePosition(layer, index))),
    [],
  );
  const connections = useMemo(() => {
    const lines: { from: readonly [number, number, number]; to: readonly [number, number, number]; color: string }[] =
      [];
    for (let i = 0; i < nodes.length - 1; i += 1) {
      nodes[i].forEach((from, fromIndex) => {
        nodes[i + 1].forEach((to, toIndex) => {
          if (quality === "low" && (fromIndex + toIndex) % 2 !== 0) return;
          if (quality === "medium" && (fromIndex + toIndex) % 3 === 0) return;
          lines.push({ from, to, color: LAYERS[i + 1].color });
        });
      });
    }
    return lines;
  }, [nodes, quality]);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.22;
    group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.14) * 0.08;
  });

  const pulseCount = quality === "high" ? 14 : quality === "medium" ? 8 : 4;

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 2.4, 4.2]} intensity={1.4} color="#7dd3fc" />
      <pointLight position={[-3.4, -1.2, 2.2]} intensity={0.7} color="#818cf8" />
      {quality !== "low" ? (
        <Sparkles count={quality === "high" ? 55 : 28} scale={[8, 4, 3]} size={2} speed={0.3} color="#67e8f9" opacity={0.5} />
      ) : null}
      <group ref={group}>
        {connections.map((line, index) => (
          <Line
            key={`line-${index}`}
            points={[line.from, line.to]}
            color={line.color}
            lineWidth={1.2}
            transparent
            opacity={0.32}
          />
        ))}
        {nodes.flatMap((layer, layerIndex) =>
          layer.map((position, nodeIndex) => (
            <mesh key={`node-${layerIndex}-${nodeIndex}`} position={position}>
              <sphereGeometry args={[0.1, 18, 18]} />
              <meshStandardMaterial
                color={LAYERS[layerIndex].color}
                emissive={new Color(LAYERS[layerIndex].color)}
                emissiveIntensity={0.7}
                roughness={0.2}
                metalness={0.25}
              />
            </mesh>
          )),
        )}
        {!reducedMotion
          ? connections.slice(0, pulseCount).map((line, index) => (
              <Pulse
                key={`pulse-${index}`}
                from={line.from}
                to={line.to}
                delay={index * 0.11}
                color={line.color}
              />
            ))
          : null}
      </group>
    </>
  );
}

export default NeuralNetworkScene;
