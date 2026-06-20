"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { PositionedNode } from "./types";
import { COLORS } from "./types";

interface PanoramaNodesProps {
  nodes: PositionedNode[];
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  entranceStartTime: number;
  locale: string;
  onNodeHover: (id: string | null) => void;
  onNodeSelect: (id: string | null) => void;
}

export default function PanoramaNodes({
  nodes,
  hoveredNodeId,
  selectedNodeId,
  locale,
  onNodeHover,
  onNodeSelect,
}: PanoramaNodesProps) {
  const isZh = locale === "zh";

  // Compute highlighted node set (connected to hovered/selected)
  const highlightedIds = useMemo(() => {
    const set = new Set<string>();
    const active = hoveredNodeId || selectedNodeId;
    if (!active) return set;

    const activeNode = nodes.find((n) => n.id === active);
    if (!activeNode) return set;

    set.add(active);
    for (const connId of activeNode.connections) set.add(connId);
    for (const other of nodes) {
      if (other.connections.includes(active)) set.add(other.id);
    }
    return set;
  }, [nodes, hoveredNodeId, selectedNodeId]);

  return (
    <group>
      {nodes.map((node, index) => (
        <NodeMesh
          key={node.id}
          node={node}
          index={index}
          isHovered={node.id === hoveredNodeId}
          isSelected={node.id === selectedNodeId}
          isHighlighted={highlightedIds.has(node.id)}
          isDimmed={
            !!hoveredNodeId &&
            !highlightedIds.has(node.id) &&
            node.id !== hoveredNodeId
          }
          isZh={isZh}
          onHover={onNodeHover}
          onSelect={onNodeSelect}
        />
      ))}
    </group>
  );
}

// ── Per-node sub-component (each gets its own useFrame) ──────────

interface NodeMeshProps {
  node: PositionedNode;
  index: number;
  isHovered: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  isZh: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
}

function NodeMesh({
  node,
  isHovered,
  isSelected,
  isDimmed,
  isZh,
  onHover,
  onSelect,
}: NodeMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Points>(null);

  const baseRadius = node.isCore ? 7.0 : 4.0;
  const coreColor = useMemo(() => new THREE.Color(COLORS.CORE), []);
  const extColor = useMemo(() => new THREE.Color(COLORS.EXTENDED), []);
  const highlightColor = useMemo(() => new THREE.Color(COLORS.HIGHLIGHT), []);

  // Unique float phase per node (hash id → 0~2π)
  const floatPhase = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < node.id.length; i++)
      hash = ((hash << 5) - hash + node.id.charCodeAt(i)) | 0;
    return ((Math.abs(hash) % 1000) / 1000) * Math.PI * 2;
  }, [node.id]);

  // Precompute orbit particle positions (ring in XZ plane)
  const orbitPositions = useMemo(() => {
    const count = 24;
    const r = baseRadius * 1.8;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [baseRadius]);

  // Initial cage rotation offset (so it doesn't sync with body)
  useEffect(() => {
    if (cageRef.current?.rotation) {
      cageRef.current.rotation.set(Math.PI / 6, Math.PI / 4, 0);
    }
  }, []);

  useFrame((_state, delta) => {
    const now = performance.now();
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    // ── Floating bobbing ──
    group.position.y =
      node.y + Math.sin(now * 0.0008 + floatPhase) * 3;

    // ── Self-rotation (body) ──
    mesh.rotation.y += delta * (node.isCore ? 0.15 : 0.2);
    mesh.rotation.x += delta * 0.07;

    // ── Wireframe cage rotation (offset, slower) ──
    if (cageRef.current) {
      cageRef.current.rotation.y += delta * 0.08;
      cageRef.current.rotation.x += delta * 0.04;
    }

    // ── Hover pulse ──
    const pulse =
      isHovered && !isSelected
        ? 1 + Math.sin(now * 0.005) * 0.12
        : 1;
    const dimScale = isDimmed ? 0.5 : 1;
    mesh.scale.setScalar(pulse * dimScale);

    // ── Core emissive glow (Bloom) ──
    const material = mesh.material as THREE.MeshStandardMaterial;
    if (node.isCore) {
      const targetEmissive = isHovered || isSelected ? 0.55 : 0.2;
      material.emissiveIntensity +=
        (targetEmissive - material.emissiveIntensity) * 0.1;
    }

    // ── Extended node color on hover ──
    if (!node.isCore && isHovered) {
      material.color.copy(highlightColor);
    } else if (!node.isCore && !isHovered) {
      material.color.copy(extColor);
    }

    // ── Selection / hover ring ──
    const ring = ringRef.current;
    if (ring) {
      ring.visible = isHovered || isSelected;
      if (ring.visible) {
        const ringPulse =
          isHovered && !isSelected
            ? 1 + Math.sin(now * 0.005) * 0.08
            : 1;
        ring.scale.setScalar(1.3 * ringPulse);
        const ringMat = ring.material as THREE.MeshBasicMaterial;
        ringMat.opacity = isSelected
          ? 0.6
          : 0.3 + Math.sin(now * 0.005) * 0.12;
      }
    }

    // ── Particle orbit ring ──
    const orbit = orbitRef.current;
    if (orbit) {
      orbit.visible = isHovered || isSelected;
      if (orbit.visible) {
        orbit.rotation.y += delta * 0.9;
        orbit.rotation.x += delta * 0.3;
      }
    }
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(node.id);
  };

  const handlePointerOut = () => {
    onHover(null);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  const label = node.name[isZh ? "zh" : "en"];
  const showLabel = node.isCore || isHovered;

  return (
    <group ref={groupRef} position={[node.x, node.y, node.z]}>
      {/* Selection/hover ring */}
      <mesh ref={ringRef} visible={false}>
        <torusGeometry
          args={[baseRadius * 1.3, baseRadius * 0.04, 16, 32]}
        />
        <meshBasicMaterial
          color={isSelected ? COLORS.CORE : COLORS.HIGHLIGHT}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe outer cage (core nodes only) */}
      {node.isCore && (
        <mesh ref={cageRef}>
          <icosahedronGeometry args={[baseRadius * 1.35, 1]} />
          <meshBasicMaterial
            color={coreColor}
            wireframe
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Node body */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {node.isCore ? (
          <icosahedronGeometry args={[baseRadius, 0]} />
        ) : (
          <octahedronGeometry args={[baseRadius, 0]} />
        )}
        <meshStandardMaterial
          color={node.isCore ? coreColor : extColor}
          metalness={node.isCore ? 0.25 : 0.4}
          roughness={node.isCore ? 0.35 : 0.65}
          emissive={node.isCore ? coreColor : new THREE.Color("#000000")}
          emissiveIntensity={node.isCore ? 0.2 : 0}
        />
      </mesh>

      {/* Particle orbit ring (hover / selected) */}
      <points ref={orbitRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[orbitPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={node.isCore ? COLORS.CORE : COLORS.EXTENDED}
          size={0.25}
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Label billboard (DOM) */}
      {showLabel && (
        <Html
          position={[0, baseRadius + 0.55, 0]}
          center
          style={{ pointerEvents: "none" }}
        >
          <span
            className={`text-[10px] font-medium whitespace-nowrap leading-none ${
              node.isCore ? "text-sky-400" : "text-green-400"
            }`}
            style={{
              fontFamily:
                "var(--font-geist-sans), PingFang SC, Microsoft YaHei, sans-serif",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {label}
          </span>
        </Html>
      )}
    </group>
  );
}
