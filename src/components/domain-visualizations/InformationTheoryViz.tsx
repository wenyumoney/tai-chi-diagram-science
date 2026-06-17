"use client";
import type { DomainVizProps } from "./registry";
export default function InformationTheoryViz({ locale }: DomainVizProps) {
  return <div className="text-center"><div className="text-6xl mb-4 opacity-50">𝕀</div><p className="text-zinc-500 text-sm">{locale === "zh" ? "信息论可视化 — 开发中" : "Information Theory Visualization — In Development"}</p></div>;
}
