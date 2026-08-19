"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, InstancedMesh, Object3D, ShaderMaterial, Vector2 } from "three";

import { hashed } from "@/lib/hash";
import type { RenderQuality } from "@/lib/hooks/useRenderQuality";

type GlobalFieldProps = {
  quality: RenderQuality;
  reducedMotion: boolean;
};

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vUv;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv;
  float n = noise(uv * 3.4 + uTime * 0.035 + uMouse * 0.22);
  float n2 = noise(uv * 7.0 - uTime * 0.02);
  vec3 color = mix(uColorA, uColorB, n);
  color += vec3(0.04, 0.14, 0.22) * n2;
  float vignette = smoothstep(1.15, 0.18, length(uv - 0.5));
  gl_FragColor = vec4(color, 0.42 * vignette);
}
`;

const shaderUniforms = {
  uTime: { value: 0 },
  uMouse: { value: new Vector2() },
  uColorA: { value: new Color("#04081a") },
  uColorB: { value: new Color("#0b2744") },
};

function ShaderPlane({ reducedMotion }: { reducedMotion: boolean }) {
  const material = useRef<ShaderMaterial>(null);
  const mouse = useRef(new Vector2());
  const target = useRef(new Vector2());

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      target.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const shader = material.current;
    if (!shader) return;
    shader.uniforms.uTime.value = state.clock.elapsedTime;
    if (!reducedMotion) {
      mouse.current.lerp(target.current, 0.045);
      shader.uniforms.uMouse.value.copy(mouse.current);
    }
  });

  return (
    <mesh position={[0, 0, -6]} scale={[22, 14, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        uniforms={shaderUniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

function ParticleField({
  count,
  reducedMotion,
}: {
  count: number;
  reducedMotion: boolean;
}) {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        x: (hashed(index + 1.17) - 0.5) * 18,
        y: (hashed(index + 41.3) - 0.5) * 11,
        z: (hashed(index + 91.8) - 0.5) * 10,
        s: 0.012 + hashed(index + 17.4) * 0.038,
        speed: 0.07 + hashed(index + 3.2) * 0.14,
      })),
    [count],
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((point, index) => {
      dummy.position.set(
        point.x,
        point.y + (reducedMotion ? 0 : Math.sin(t * point.speed + index) * 0.32),
        point.z,
      );
      dummy.scale.setScalar(point.s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (!reducedMotion) {
      mesh.current.rotation.y = t * 0.018;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#67e8f9" transparent opacity={0.55} />
    </instancedMesh>
  );
}

export function GlobalField({ quality, reducedMotion }: GlobalFieldProps) {
  const scroll = useRef(0);
  const count = quality === "high" ? 220 : 110;

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scroll.current = window.scrollY / max;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    state.camera.position.z = 6.4 - scroll.current * 1.35;
    state.camera.rotation.z = scroll.current * 0.07;
    state.camera.position.y = scroll.current * -0.35;
  });

  return (
    <>
      <ShaderPlane reducedMotion={reducedMotion} />
      <ParticleField count={count} reducedMotion={reducedMotion} />
    </>
  );
}

export default GlobalField;
