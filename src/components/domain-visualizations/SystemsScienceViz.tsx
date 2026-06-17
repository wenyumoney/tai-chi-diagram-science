"use client";

import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function SystemsScienceViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 150;
    const boids: Boid[] = [];
    let organized = 0;
    let animId: number;

    // Init with random positions
    for (let i = 0; i < COUNT; i++) {
      boids.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.004,
      });
    }

    function update() {
      for (const b of boids) {
        // Gentle yin-yang attractor field (kicks in gradually)
        const cx = 0.5;
        const cy = 0.5;
        const dx = b.x - cx;
        const dy = b.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Yin-yang attractor: particles on one side flow one way
        const attractForce = organized * 0.00008;
        b.vx += Math.cos(angle + Math.PI / 2) * attractForce;
        b.vy += Math.sin(angle + Math.PI / 2) * attractForce;

        // Random perturbation
        b.vx += (Math.random() - 0.5) * 0.0008;
        b.vy += (Math.random() - 0.5) * 0.0008;

        // Damping
        b.vx *= 0.99;
        b.vy *= 0.99;

        // Move
        b.x += b.vx;
        b.y += b.vy;

        // Edge wrapping
        if (b.x < 0) b.x = 1;
        if (b.x > 1) b.x = 0;
        if (b.y < 0) b.y = 1;
        if (b.y > 1) b.y = 0;
      }

      organized = Math.min(organized + 0.0003, 1);
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;

      ctx!.clearRect(0, 0, w, h);

      // Draw yin-yang attractor field (subtle)
      const cx = w / 2;
      const cy = h / 2;

      if (organized > 0.1) {
        ctx!.beginPath();
        ctx!.arc(cx, cy, w * 0.35, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(251, 146, 60, ${organized * 0.15})`;
        ctx!.lineWidth = 1;
        ctx!.setLineDash([8, 4]);
        ctx!.stroke();
        ctx!.setLineDash([]);
      }

      // Draw particles
      for (const b of boids) {
        const x = b.x * w;
        const y = b.y * h;

        // Color blend: warm gold (yang) on right, cool orange (yin) on left
        const hue = organized > 0.5
          ? (b.x > 0.5 ? 35 : 25)
          : 35;
        const sat = 60 + organized * 20;
        const light = 55 + organized * 15;

        ctx!.beginPath();
        ctx!.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${0.5 + organized * 0.4})`;
        ctx!.fill();
      }

      // Label
      ctx!.fillStyle = `rgba(255, 255, 255, ${0.3 + organized * 0.4})`;
      ctx!.font = "9px sans-serif";
      ctx!.textAlign = "center";
      if (organized > 0.5) {
        ctx!.fillText(
          isZh ? "涌现模式" : "Emergent Pattern",
          canvas!.width / 2,
          canvas!.height - 12
        );
      } else {
        ctx!.fillText(
          isZh ? "自组织进行中..." : "Self-organizing...",
          canvas!.width / 2,
          canvas!.height - 12
        );
      }
    }

    function loop() {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = 280;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [isZh]);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <p className="text-center text-sm text-zinc-400 mb-4">
        {isZh
          ? "涌现 = 整体大于部分之和 | 自组织 = 有序来自互动"
          : "Emergence = Whole > Sum of Parts | Self-Organization = Order from Interaction"}
      </p>
      <canvas ref={canvasRef} className="w-full" />
      <p className="text-center text-xs text-zinc-500 mt-4">
        {isZh
          ? "150个粒子遵循简单规则——通过局部互动自组织为相干流动模式"
          : "150 particles following simple rules — self-organizing into coherent flow patterns through local interactions"}
      </p>
    </div>
  );
}
