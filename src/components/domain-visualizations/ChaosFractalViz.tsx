"use client";
import type { DomainVizProps } from "./registry";
export default function ChaosFractalViz({ locale }: DomainVizProps) {
  return <div className="text-center"><div className="text-6xl mb-4 opacity-50">∞</div><p className="text-zinc-500 text-sm">{locale === "zh" ? "混沌与分形可视化 — 开发中" : "Chaos & Fractal Visualization — In Development"}</p></div>;
}
