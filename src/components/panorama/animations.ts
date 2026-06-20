import { Color } from "three";

/** Cubic ease-out — approximates DESIGN.md cubic-bezier(0.32,0.72,0,1) */
export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Linear interpolation between two Three.js Color instances */
export function lerpColor(a: Color, b: Color, t: number): Color {
  return a.clone().lerp(b, t);
}

/** Exponential decay speed for connection highlight transitions */
export const LERP_SPEED = 0.12;

/** Entrance animation timing (matches previous Canvas 2D values) */
export const ENTRANCE_DURATION = 500; // ms per node
export const ENTRANCE_STAGGER = 50; // ms delay between successive nodes
