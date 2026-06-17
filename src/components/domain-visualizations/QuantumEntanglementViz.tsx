"use client";
import type { DomainVizProps } from "./registry";
export default function QuantumEntanglementViz({ locale }: DomainVizProps) {
  return <div className="text-center"><div className="text-6xl mb-4 opacity-50">⚛</div><p className="text-zinc-500 text-sm">{locale === "zh" ? "量子纠缠可视化 — 开发中" : "Quantum Entanglement Visualization — In Development"}</p></div>;
}
