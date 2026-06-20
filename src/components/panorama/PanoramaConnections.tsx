"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PositionedNode, ConnectionAnimState } from "./types";
import { COLORS } from "./types";
import { lerpColor, LERP_SPEED } from "./animations";

interface PanoramaConnectionsProps {
  nodes: PositionedNode[];
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
}

export default function PanoramaConnections({
  nodes,
  hoveredNodeId,
  selectedNodeId,
}: PanoramaConnectionsProps) {
  const tubeRefs = useRef<Map<string, THREE.Mesh>>(new Map());
  const animStates = useRef<Map<string, ConnectionAnimState>>(new Map());

  const dimColor = useMemo(() => new THREE.Color(COLORS.CONN_DIM), []);
  const highlightColor = useMemo(
    () => new THREE.Color(COLORS.CONN_HIGHLIGHT),
    [],
  );

  // Compute highlighted node set
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

  // Build unique edge list with precomputed transforms for cylinder tubes
  const edges = useMemo(() => {
    const seen = new Set<string>();
    const result: {
      key: string;
      a: PositionedNode;
      b: PositionedNode;
      midpoint: THREE.Vector3;
      length: number;
      quaternion: THREE.Quaternion;
    }[] = [];
    for (const node of nodes) {
      for (const connId of node.connections) {
        const key = [node.id, connId].sort().join("-");
        if (seen.has(key)) continue;
        seen.add(key);
        const target = nodes.find((n) => n.id === connId);
        if (!target) continue;

        const a = node;
        const b = target;
        const midpoint = new THREE.Vector3(
          (a.x + b.x) / 2,
          (a.y + b.y) / 2,
          (a.z + b.z) / 2,
        );
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dz = b.z - a.z;
        const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const dir = new THREE.Vector3(dx, dy, dz).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir,
        );

        result.push({ key, a, b, midpoint, length, quaternion });
      }
    }
    return result;
  }, [nodes]);

  // Set of edge keys that should be highlighted
  const highlightedEdgeKeys = useMemo(() => {
    const set = new Set<string>();
    for (const { key, a, b } of edges) {
      if (highlightedIds.has(a.id) && highlightedIds.has(b.id)) {
        set.add(key);
      }
    }
    return set;
  }, [edges, highlightedIds]);

  // Color lerp animation
  useFrame(() => {
    for (const [key, tube] of tubeRefs.current) {
      const targetAlpha = highlightedEdgeKeys.has(key) ? 1 : 0;
      const state = animStates.current.get(key) ?? {
        currentAlpha: 0,
      };
      state.currentAlpha +=
        (targetAlpha - state.currentAlpha) * LERP_SPEED;

      // Cleanup settled entries
      if (state.currentAlpha < 0.002 && targetAlpha === 0) {
        animStates.current.delete(key);
      } else {
        animStates.current.set(key, state);
      }

      const material = tube.material as THREE.MeshBasicMaterial;
      material.color.copy(
        lerpColor(dimColor, highlightColor, state.currentAlpha),
      );
    }
  });

  return (
    <group>
      {edges.map(({ key, midpoint, length, quaternion }) => (
        <TubeEdge
          key={key}
          edgeKey={key}
          midpoint={midpoint}
          length={length}
          quaternion={quaternion}
          tubeRefs={tubeRefs}
        />
      ))}
    </group>
  );
}

// ── Per-edge cylinder tube ──

interface TubeEdgeProps {
  edgeKey: string;
  midpoint: THREE.Vector3;
  length: number;
  quaternion: THREE.Quaternion;
  tubeRefs: React.MutableRefObject<Map<string, THREE.Mesh>>;
}

function TubeEdge({
  edgeKey,
  midpoint,
  length,
  quaternion,
  tubeRefs,
}: TubeEdgeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (mesh && mesh.quaternion) {
      tubeRefs.current.set(edgeKey, mesh);
      mesh.quaternion.copy(quaternion);
    }
    return () => {
      tubeRefs.current.delete(edgeKey);
    };
  }, [edgeKey, quaternion, tubeRefs]);

  return (
    <mesh ref={meshRef} position={midpoint}>
      <cylinderGeometry args={[0.3, 0.3, length, 6]} />
      <meshBasicMaterial
        color={COLORS.CONN_DIM}
        transparent
        opacity={0.1}
        depthWrite={false}
      />
    </mesh>
  );
}
