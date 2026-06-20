import type { PanoramaNode } from "@/data/types";
import { computeLayout } from "@/lib/panorama-layout";
import type { PositionedNode } from "@/components/panorama/types";

/**
 * Mulberry32 seeded PRNG — deterministic across SSR/CSR.
 * Adapted from bryc's implementation.
 */
function seededRandom(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Computes 2D force-directed layout, then extends to 3D by assigning
 * z-depth with constrained randomness. Core nodes cluster near z=0;
 * extended nodes spread wider for parallax depth.
 *
 * Uses a seeded PRNG (seed=42) to guarantee identical output on
 * server and client, preventing hydration mismatches.
 */
export function computeLayout3D(nodes: PanoramaNode[]): PositionedNode[] {
  const laidOut = computeLayout(nodes);
  const random = seededRandom(42);

  return laidOut.map((node) => {
    const x = node.x ?? 500;
    const y = node.y ?? 500;
    const range = node.isCore ? 20 : 50;
    const z = (random() - 0.5) * 2 * range;
    return { ...node, x, y, z } as PositionedNode;
  });
}
