"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { DomainVizProps } from "./registry";

const ACCENT = "#60a5fa";
const PINK = "#f472b6";
const BG = "#09090b";

export default function QuantumEntanglementViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const [hoveredParticle, setHoveredParticle] = useState<0 | 1 | null>(null);
  const isZh = locale === "zh";

  const drawTaiji = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "#52525b";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Yang (white) half — right side
      ctx.beginPath();
      ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(cx, cy, 0, Math.PI / 2, -Math.PI / 2, true);
      ctx.closePath();
      ctx.fillStyle = "rgba(244,244,245,0.12)";
      ctx.fill();

      // Yin (dark) half — left side
      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI / 2, -Math.PI / 2, false);
      ctx.arc(cx, cy, 0, -Math.PI / 2, Math.PI / 2, true);
      ctx.closePath();
      ctx.fillStyle = BG;
      ctx.fill();

      // Yang dot (in yin half, bottom)
      ctx.beginPath();
      ctx.arc(cx, cy + r / 2, r * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(244,244,245,0.12)";
      ctx.fill();

      // Yin dot (in yang half, top)
      ctx.beginPath();
      ctx.arc(cx, cy - r / 2, r * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = BG;
      ctx.fill();
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    function resize() {
      const rect = container!.getBoundingClientRect();
      const w = rect.width;
      const h = Math.min(w * 0.7, 340);
      canvas!.width = w * (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
      canvas!.height = h * (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
        0,
        0,
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
        0,
        0
      );
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    function draw() {
      const w = canvas!.width / (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
      const h = canvas!.height / (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
      const cx = w / 2;
      const cy = h * 0.45;
      const phase = phaseRef.current;

      ctx!.clearRect(0, 0, w, h);

      // ── Outer wave ripples ──
      for (let i = 0; i < 4; i++) {
        const ripplePhase = (phase + i * 1.5) % (Math.PI * 2);
        const radius = 55 + (ripplePhase / (Math.PI * 2)) * 130;
        const alpha = Math.max(0, 0.08 - (ripplePhase / (Math.PI * 2)) * 0.08);
        ctx!.beginPath();
        ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // ── Orbit ring ──
      ctx!.beginPath();
      ctx!.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(96, 165, 250, 0.08)";
      ctx!.lineWidth = 0.5;
      ctx!.setLineDash([3, 8]);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // ── Center Taiji ──
      drawTaiji(ctx!, cx, cy, 34);

      // ── Two entangled particles ──
      const p1Angle = phase * 0.7;
      const p2Angle = -phase * 0.7 + Math.PI; // anti-correlated (π out of phase)
      const orbitRadius = 95;

      const p1x = cx + Math.cos(p1Angle) * orbitRadius;
      const p1y = cy + Math.sin(p1Angle) * orbitRadius;
      const p2x = cx + Math.cos(p2Angle) * orbitRadius;
      const p2y = cy + Math.sin(p2Angle) * orbitRadius;

      // Connection line (entanglement correlation)
      ctx!.beginPath();
      ctx!.moveTo(p1x, p1y);
      ctx!.lineTo(p2x, p2y);
      ctx!.strokeStyle = "rgba(96, 165, 250, 0.12)";
      ctx!.lineWidth = 0.8;
      ctx!.setLineDash([4, 6]);
      ctx!.lineDashOffset = -phase * 15;
      ctx!.stroke();
      ctx!.setLineDash([]);

      // Check hover distance
      const mouse = mouseRef.current;
      const p1Hovered =
        mouse &&
        Math.hypot(mouse.x - p1x, mouse.y - p1y) < 18;
      const p2Hovered =
        mouse &&
        Math.hypot(mouse.x - p2x, mouse.y - p2y) < 18;

      // Particle 1 (blue) — yang
      const p1r = p1Hovered ? 15 : 10;
      const grad1 = ctx!.createRadialGradient(p1x, p1y, 0, p1x, p1y, p1r);
      grad1.addColorStop(0, p1Hovered ? ACCENT : "rgba(96,165,250,0.9)");
      grad1.addColorStop(0.5, "rgba(96,165,250,0.3)");
      grad1.addColorStop(1, "rgba(96,165,250,0)");
      ctx!.beginPath();
      ctx!.arc(p1x, p1y, p1r, 0, Math.PI * 2);
      ctx!.fillStyle = grad1;
      ctx!.fill();

      // Particle 1 core
      ctx!.beginPath();
      ctx!.arc(p1x, p1y, 3, 0, Math.PI * 2);
      ctx!.fillStyle = ACCENT;
      ctx!.fill();

      // Particle 2 (pink) — yin
      const p2r = p2Hovered ? 15 : 10;
      const grad2 = ctx!.createRadialGradient(p2x, p2y, 0, p2x, p2y, p2r);
      grad2.addColorStop(0, p2Hovered ? PINK : "rgba(244,114,182,0.9)");
      grad2.addColorStop(0.5, "rgba(244,114,182,0.3)");
      grad2.addColorStop(1, "rgba(244,114,182,0)");
      ctx!.beginPath();
      ctx!.arc(p2x, p2y, p2r, 0, Math.PI * 2);
      ctx!.fillStyle = grad2;
      ctx!.fill();

      // Particle 2 core
      ctx!.beginPath();
      ctx!.arc(p2x, p2y, 3, 0, Math.PI * 2);
      ctx!.fillStyle = PINK;
      ctx!.fill();

      // Hover labels
      if (p1Hovered) {
        ctx!.fillStyle = ACCENT;
        ctx!.font = "11px monospace";
        ctx!.textAlign = "center";
        ctx!.fillText(
          isZh ? "自旋 ↑" : "Spin ↑",
          p1x,
          p1y - 20
        );
      }
      if (p2Hovered) {
        ctx!.fillStyle = PINK;
        ctx!.font = "11px monospace";
        ctx!.textAlign = "center";
        ctx!.fillText(
          isZh ? "自旋 ↓" : "Spin ↓",
          p2x,
          p2y - 20
        );
      }

      // ── Labels ──
      ctx!.fillStyle = "rgba(161,161,170,0.6)";
      ctx!.font = "10px sans-serif";
      ctx!.textAlign = "center";
      ctx!.fillText(
        isZh ? "量子纠缠对" : "Entangled Pair",
        cx,
        cy + 60
      );

      // ── Latin motto ──
      ctx!.fillStyle = "rgba(113,113,122,0.5)";
      ctx!.font = "italic 11px serif";
      ctx!.textAlign = "center";
      ctx!.fillText(
        "Contraria Sunt Complementa",
        cx,
        cy + 78
      );

      // ── Bohr reference ──
      ctx!.fillStyle = "rgba(113,113,122,0.35)";
      ctx!.font = "9px sans-serif";
      ctx!.fillText(
        isZh ? "— 尼尔斯·玻尔族徽铭文 (1947)" : "— Niels Bohr's Coat of Arms Motto (1947)",
        cx,
        cy + 94
      );

      phaseRef.current += 0.018;
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [isZh, drawTaiji]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null;
    setHoveredParticle(null);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto py-6 md:py-10">
      <p className="text-center text-sm text-zinc-400 mb-2">
        {isZh
          ? "量子纠缠 = 阴阳互根"
          : "Quantum Entanglement = Yin-Yang Mutual Dependence"}
      </p>
      <canvas
        ref={canvasRef}
        className="w-full block cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <p className="text-center text-xs text-zinc-500 mt-3 max-w-md mx-auto leading-relaxed">
        {isZh
          ? "两个纠缠粒子自旋方向相反，无论相隔多远，测量一个立即确定另一个——时空之外的关联，正如阴阳互根。悬停粒子查看状态。"
          : "Two entangled particles have opposite spins. Measuring one instantly determines the other regardless of distance — correlation beyond spacetime, mirroring yin-yang mutual dependence. Hover particles to see spin states."}
      </p>
    </div>
  );
}
