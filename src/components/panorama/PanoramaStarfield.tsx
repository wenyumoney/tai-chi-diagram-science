"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "./types";

// Fibonacci sphere distribution: uniform spacing on sphere surface
function fibonacciSphere(count: number, radius: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // -1 to 1 uniformly
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    pos[i * 3] = Math.cos(theta) * radiusAtY * radius;
    pos[i * 3 + 1] = y * radius;
    pos[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius;
  }
  return pos;
}

function SmallStars() {
  const ref = useRef<THREE.Points>(null);
  const count = 480;

  const positions = useMemo(() => {
    // 4 concentric shells
    const shells = [350, 480, 600, 750];
    const all = new Float32Array(count * 3);
    const perShell = Math.floor(count / shells.length);
    for (let s = 0; s < shells.length; s++) {
      const shellPos = fibonacciSphere(perShell, shells[s]);
      all.set(shellPos, s * perShell * 3);
    }
    return all;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01;
      ref.current.rotation.x += delta * 0.003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.35} color="#94a3b8" transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function MediumStars() {
  const ref = useRef<THREE.Points>(null);
  const count = 90;

  const positions = useMemo(() => {
    const shells = [380, 520, 660, 780];
    const all = new Float32Array(count * 3);
    const perShell = Math.floor(count / shells.length);
    for (let s = 0; s < shells.length; s++) {
      const shellPos = fibonacciSphere(perShell, shells[s]);
      all.set(shellPos, s * perShell * 3);
    }
    return all;
  }, []);

  // Per-star twinkle phases (hash-based, deterministic)
  const phases = useMemo(() => {
    const p = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      let hash = i * 2654435761 >>> 0;
      hash = ((hash << 5) - hash + 42) | 0;
      p[i] = ((Math.abs(hash) % 1000) / 1000) * Math.PI * 2;
    }
    return p;
  }, []);

  useFrame(({ clock }, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x -= delta * 0.008;
      const t = clock.elapsedTime;
      const mat = ref.current.material as THREE.PointsMaterial;
      // Average opacity oscillates — gives a gentle collective twinkle
      const avgTwinkle = 0.3 + Math.sin(t * 1.3) * 0.1 + Math.sin(t * 2.1 + 1.5) * 0.08;
      mat.opacity = avgTwinkle;
    }
  });

  // 15% of medium stars get blue tint
  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const blue = new THREE.Color(COLORS.CORE);
    const white = new THREE.Color("#cbd5e1");
    for (let i = 0; i < count; i++) {
      const isBlue = i < Math.floor(count * 0.15);
      const c = isBlue ? blue : white;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.9} vertexColors transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function LargeStars() {
  const ref = useRef<THREE.Points>(null);
  const count = 24;

  const positions = useMemo(() => {
    const shells = [400, 560, 700];
    const all = new Float32Array(count * 3);
    const perShell = Math.floor(count / shells.length);
    for (let s = 0; s < shells.length; s++) {
      const shellPos = fibonacciSphere(perShell, shells[s]);
      all.set(shellPos, s * perShell * 3);
    }
    return all;
  }, []);

  const phases = useMemo(() => {
    const p = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      let hash = (i + 100) * 2654435761 >>> 0;
      hash = ((hash << 5) - hash + 137) | 0;
      p[i] = ((Math.abs(hash) % 1000) / 1000) * Math.PI * 2;
    }
    return p;
  }, []);

  const speeds = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = 0.8 + ((i * 73) % 100) / 100 * 1.4; // 0.8 ~ 2.2
    }
    return s;
  }, []);

  useFrame(({ clock }, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.025;
      ref.current.rotation.z += delta * 0.006;
      const t = clock.elapsedTime;
      // Compute average opacity from per-star phases
      let sum = 0;
      for (let i = 0; i < count; i++) {
        sum += 0.45 + Math.sin(t * speeds[i] + phases[i]) * 0.35;
      }
      const mat = ref.current.material as THREE.PointsMaterial;
      mat.opacity = sum / count;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={2.2} color={COLORS.CORE} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function PanoramaStarfield() {
  return (
    <group>
      <SmallStars />
      <MediumStars />
      <LargeStars />
    </group>
  );
}
