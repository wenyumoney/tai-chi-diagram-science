"use client";

import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

export default function ChaosFractalViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let zoom = 0;
    let animId: number;

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;

      ctx!.fillStyle = "#09090b";
      ctx!.fillRect(0, 0, w, h);

      // Simplified Sierpinski triangle
      drawSierpinski(w / 2, h / 2, Math.min(w, h) * 0.4, 5);

      // Strange attractor (Lorenz-inspired) in background
      drawAttractor(w, h);

      zoom += 0.003;
      animId = requestAnimationFrame(draw);
    }

    function drawSierpinski(cx: number, cy: number, size: number, depth: number) {
      if (depth === 0) {
        ctx!.beginPath();
        const ox = (Math.sin(zoom) * size * 0.1) * (depth + 1) * 0.1;
        ctx!.arc(
          cx + ox,
          cy - size * 0.3 + Math.cos(zoom * 1.3) * size * 0.1,
          size * 0.05,
          0,
          Math.PI * 2
        );
        ctx!.fillStyle = `hsl(${330 + depth * 20}, 70%, 65%)`;
        ctx!.fill();
        return;
      }

      const h = size * Math.sin(Math.PI / 3);
      const halfSize = size / 2;

      // Three corners
      const x1 = cx;
      const y1 = cy - h / 2;
      const x2 = cx - size / 2;
      const y2 = cy + h / 2;
      const x3 = cx + size / 2;
      const y3 = cy + h / 2;

      // Self-similar sub-triangles (skip center = yin-hole = yang-dot metaphor)
      const alpha = 0.3 + depth * 0.1;
      ctx!.strokeStyle = `rgba(244, 114, 182, ${alpha})`;
      ctx!.lineWidth = 0.5;

      // Draw outline of this triangle
      ctx!.beginPath();
      ctx!.moveTo(x1, y1);
      ctx!.lineTo(x2, y2);
      ctx!.lineTo(x3, y3);
      ctx!.closePath();
      ctx!.stroke();

      // Recurse into 3 corners (not center — the "yin dot" hole)
      drawSierpinski((x1 + x2) / 2, (y1 + y2) / 2, halfSize, depth - 1);
      drawSierpinski((x1 + x3) / 2, (y1 + y3) / 2, halfSize, depth - 1);
      drawSierpinski((x2 + x3) / 2, (y2 + y3) / 2, halfSize, depth - 1);
    }

    function drawAttractor(w: number, h: number) {
      // Simple strange attractor trace
      let x = 0.1;
      let y = 0.1;
      const scale = w * 0.15;

      ctx!.beginPath();
      for (let i = 0; i < 200; i++) {
        const nx = Math.sin(y * 2.5) + Math.cos(x * 1.5) * 0.5;
        const ny = Math.sin(x * 2) + Math.cos(y * 1.8) * 0.5;
        x = nx;
        y = ny;

        const sx = w * 0.15 + (x + 1) * scale;
        const sy = h * 0.1 + (y + 1) * scale * 0.6;

        if (i === 0) ctx!.moveTo(sx, sy);
        else ctx!.lineTo(sx, sy);
      }
      ctx!.strokeStyle = "#f472b615";
      ctx!.lineWidth = 1;
      ctx!.stroke();
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = 280;
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
        {isZh
          ? "分形自相似 = 太极图中的小太极 | 奇异吸引子 = 混沌中有序"
          : "Fractal Self-Similarity = Small Taiji within Taiji | Strange Attractor = Order in Chaos"}
      </p>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
