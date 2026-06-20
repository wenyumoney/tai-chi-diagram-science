import type { PanoramaNode } from "@/data/types";

/** A PanoramaNode with computed 3D position (all coordinates guaranteed) */
export interface PositionedNode extends PanoramaNode {
  x: number;
  y: number;
  z: number;
}

/** Per-node animation state tracked in useFrame */
export interface NodeAnimState {
  entranceProgress: number;
}

/** Per-connection highlight lerp state */
export interface ConnectionAnimState {
  currentAlpha: number;
}

/** Shared color constants matching DESIGN.md palette */
export const COLORS = {
  CORE: "#38bdf8",          // sky blue
  EXTENDED: "#4ade80",      // light green
  HIGHLIGHT: "#fbbf24",     // amber (hover highlight on extended nodes)
  CONN_DIM: "#3f3f46",
  CONN_HIGHLIGHT: "#38bdf8", // match core
  BACKGROUND: "#09090b",
} as const;
