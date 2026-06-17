"use client";
import type { DomainVizProps } from "./registry";
export default function SystemsScienceViz({ locale }: DomainVizProps) {
  return <div className="text-center"><div className="text-6xl mb-4 opacity-50">◉</div><p className="text-zinc-500 text-sm">{locale === "zh" ? "系统科学可视化 — 开发中" : "Systems Science Visualization — In Development"}</p></div>;
}
