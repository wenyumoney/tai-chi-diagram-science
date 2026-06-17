"use client";

import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

export default function SymmetryBreakingViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let animId: number;

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cx = w / 2;
      const cy = h * 0.55;

      ctx!.clearRect(0, 0, w, h);

      // Draw Mexican hat potential (cross-section)
      ctx!.beginPath();
      ctx!.moveTo(0, cy);
      for (let x = 0; x <= w; x++) {
        const xNorm = (x / w - 0.5) * 4; // -2 to 2
        const potential = (xNorm ** 4 - 2 * xNorm ** 2) * 30;
        ctx!.lineTo(x, cy - potential);
        ctx!.moveTo(x, cy - potential);
      }
      ctx!.strokeStyle = "#a78bfa80";
      ctx!.lineWidth = 2;
      ctx!.setLineDash([6, 3]);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // Ball rolling down
      const settled = Math.min(t * 2, 1); // 0→1 over time
      const targetX = t > 0.5 ? -1.2 : 0; // -1.2 after settling
      const ballX = cx + (t < 1 ? (1 - settled) * 0 : -1.2 * w * 0.15 * settled);
      const xNorm = t < 1 ? 0 : (ballX - cx) / (w * 0.15);
      const potential = (xNorm ** 4 - 2 * xNorm ** 2) * 30;
      const ballY = cy - potential;

      // Trail
      if (t > 0.3) {
        ctx!.beginPath();
        ctx!.arc(ballX, ballY, 6, 0, Math.PI * 2);
        ctx!.fillStyle = "#a78bfa15";
        ctx!.fill();
      }

      // Ball
      const grad = ctx!.createRadialGradient(ballX, ballY, 0, ballX, ballY, 8);
      grad.addColorStop(0, "#a78bfa");
      grad.addColorStop(1, "#a78bfa00");
      ctx!.beginPath();
      ctx!.arc(ballX, ballY, 8, 0, Math.PI * 2);
      ctx!.fillStyle = grad;
      ctx!.fill();

      // Peak label
      ctx!.fillStyle = "#a78bfa60";
      ctx!.font = "11px sans-serif";
      ctx!.textAlign = "center";
      ctx!.fillText(
        isZh ? "不稳定的对称态" : "Unstable symmetric state",
        cx, cy - 90
      );

      if (t > 1) {
        ctx!.fillText(
          isZh ? "稳定的破缺态" : "Stable broken state",
          ballX, ballY + 20
        );
      }

      t += 0.005;
      if (t > 3) t = 0; // Loop
      animId = requestAnimationFrame(draw);
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = 260;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [isZh]);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <p className="text-center text-sm text-zinc-400 mb-4">
        {isZh
          ? "对称性自发破缺 = 阴阳从平衡到不平衡的跃迁"
          : "Spontaneous Symmetry Breaking = Yin-Yang transition from balance to imbalance"}
      </p>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
