import type { PanoramaNode } from "@/data/types";

interface LayoutOptions {
  width?: number;
  height?: number;
  iterations?: number;
}

export function computeLayout(
  nodes: PanoramaNode[],
  options: LayoutOptions = {}
): PanoramaNode[] {
  const width = options.width ?? 1000;
  const height = options.height ?? 1000;
  const iterations = options.iterations ?? 150;

  // Clone nodes with mutable positions
  const positions: Map<string, { x: number; y: number; pinned: boolean }> =
    new Map();

  for (const node of nodes) {
    if (node.x !== undefined && node.y !== undefined) {
      positions.set(node.id, { x: node.x, y: node.y, pinned: true });
    } else {
      // Random initial position
      positions.set(node.id, {
        x: width * 0.25 + Math.random() * width * 0.5,
        y: height * 0.25 + Math.random() * height * 0.5,
        pinned: false,
      });
    }
  }

  // Build connection lookup for faster access
  const connectionSet = new Map<string, Set<string>>();
  for (const node of nodes) {
    connectionSet.set(node.id, new Set(node.connections));
  }

  // Force-directed iterations
  const repulsionStrength = 5000;
  const attractionStrength = 0.01;
  const damping = 0.9;
  const maxForce = 50;

  for (let iter = 0; iter < iterations; iter++) {
    const forces = new Map<string, { fx: number; fy: number }>();
    for (const node of nodes) {
      forces.set(node.id, { fx: 0, fy: 0 });
    }

    // Repulsion between all pairs (Coulomb's law)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = positions.get(nodes[i].id)!;
        const b = positions.get(nodes[j].id)!;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = repulsionStrength / (dist * dist);

        const fa = forces.get(nodes[i].id)!;
        const fb = forces.get(nodes[j].id)!;
        fa.fx += (dx / dist) * force;
        fa.fy += (dy / dist) * force;
        fb.fx -= (dx / dist) * force;
        fb.fy -= (dy / dist) * force;
      }
    }

    // Attraction along connections (Hooke's law)
    for (const node of nodes) {
      const a = positions.get(node.id)!;
      const connected = connectionSet.get(node.id);
      if (!connected) continue;

      for (const connId of connected) {
        const b = positions.get(connId);
        if (!b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        const fa = forces.get(node.id)!;
        fa.fx += dx * attractionStrength;
        fa.fy += dy * attractionStrength;
      }
    }

    // Apply forces with damping
    const cooling = 1 - iter / iterations;
    for (const node of nodes) {
      const pos = positions.get(node.id)!;
      if (pos.pinned) continue;

      const f = forces.get(node.id)!;
      const fx = Math.max(-maxForce, Math.min(maxForce, f.fx));
      const fy = Math.max(-maxForce, Math.min(maxForce, f.fy));

      pos.x += fx * damping * cooling;
      pos.y += fy * damping * cooling;

      // Clamp to bounds with margin
      pos.x = Math.max(20, Math.min(width - 20, pos.x));
      pos.y = Math.max(20, Math.min(height - 20, pos.y));
    }
  }

  // Return nodes with computed positions
  return nodes.map((node) => {
    const pos = positions.get(node.id)!;
    return {
      ...node,
      x: Math.round(pos.x),
      y: Math.round(pos.y),
    };
  });
}
