"use client";

import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

export default function QuantumEntanglementViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    let animId: number;

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx!.clearRect(0, 0, w, h);

      // Draw central mini Taiji
      ctx!.beginPath();
      ctx!.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx!.strokeStyle = "#f4f4f540";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // S-curve
      ctx!.beginPath();
      ctx!.arc(cx, cy - 15, 15, 0, Math.PI, false);
      ctx!.arc(cx, cy + 15, 15, Math.PI, 0, false);
      ctx!.closePath();
      ctx!.fillStyle = "#18181b";
      ctx!.fill();

      // Particle 1
      const p1x = cx + Math.cos(phase) * 80;
      const p1y = cy + Math.sin(phase) * 80;
      const grad1 = ctx!.createRadialGradient(p1x, p1y, 0, p1x, p1y, 12);
      grad1.addColorStop(0, "#60a5fa");
      grad1.addColorStop(1, "#60a5fa00");
      ctx!.beginPath();
      ctx!.arc(p1x, p1y, 12, 0, Math.PI * 2);
      ctx!.fillStyle = grad1;
      ctx!.fill();

      // Particle 2 (anti-correlated)
      const p2x = cx + Math.cos(-phase) * 80;
      const p2y = cy + Math.sin(-phase) * 80;
      const grad2 = ctx!.createRadialGradient(p2x, p2y, 0, p2x, p2y, 12);
      grad2.addColorStop(0, "#f472b6");
      grad2.addColorStop(1, "#f472b600");
      ctx!.beginPath();
      ctx!.arc(p2x, p2y, 12, 0, Math.PI * 2);
      ctx!.fillStyle = grad2;
      ctx!.fill();

      // Connection line (correlation)
      ctx!.beginPath();
      ctx!.moveTo(p1x, p1y);
      ctx!.lineTo(p2x, p2y);
      ctx!.strokeStyle = "#60a5fa15";
      ctx!.lineWidth = 1;
      ctx!.setLineDash([4, 4]);
      ctx!.lineDashOffset = phase * 20;
      ctx!.stroke();
      ctx!.setLineDash([]);

      // Wave ripple
      for (let i = 0; i < 3; i++) {
        const ripplePhase = (phase + i * 2) % (Math.PI * 2);
        const r = 40 + (ripplePhase / (Math.PI * 2)) * 60;
        ctx!.beginPath();
        ctx!.arc(cx, cy, r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(96, 165, 250, ${0.1 - ripplePhase * 0.015})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      phase += 0.02;
      animId = requestAnimationFrame(draw);
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = Math.min(rect.width * 0.6, 300);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <p className="text-center text-sm text-zinc-400 mb-4">
        {isZh ? "量子纠缠 = 阴阳互根" : "Quantum Entanglement = Yin-Yang Mutual Dependence"}
      </p>
      <canvas ref={canvasRef} className="w-full" />
      <p className="text-center text-xs text-zinc-500 mt-4">
        {isZh
          ? "两个粒子旋转方向相反但永远保持关联——测量一个立即确定另一个"
          : "Two particles rotate in opposite directions but remain correlated — measuring one instantly determines the other"}
      </p>
    </div>
  );
}
