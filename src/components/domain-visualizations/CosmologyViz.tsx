"use client";
import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

export default function CosmologyViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let phase = 0, id: number;
    function draw() {
      const w = c!.width, h = c!.height, cx = w / 2, cy = h / 2;
      ctx!.fillStyle = "#09090b"; ctx!.fillRect(0, 0, w, h);
      const acc = "#818cf8";
      // Expanding universe rings
      for (let i = 0; i < 6; i++) {
        const r = 15 + ((phase * 30 + i * 55) % 180);
        ctx!.beginPath(); ctx!.arc(cx, cy, r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(129,140,248,${Math.max(0, 0.2 - r / 400)})`; ctx!.lineWidth = 0.5; ctx!.stroke();
      }
      // Central singularity → Taiji
      ctx!.beginPath(); ctx!.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx!.fillStyle = `${acc}15`; ctx!.fill(); ctx!.strokeStyle = `${acc}40`; ctx!.lineWidth = 0.8; ctx!.stroke();
      // Yin-yang split
      ctx!.beginPath(); ctx!.arc(cx, cy, 14, -Math.PI / 2, Math.PI / 2, false); ctx!.arc(cx, cy, 7, Math.PI / 2, -Math.PI / 2, true); ctx!.closePath();
      ctx!.fillStyle = `${acc}25`; ctx!.fill();
      ctx!.fillStyle = acc; ctx!.font = "8px sans-serif"; ctx!.textAlign = "center";
      ctx!.fillText(isZh ? "大爆炸 = 无极生太极" : "Big Bang = Wuji→Taiji", cx, cy + 45);
      // Matter/Antimatter dots
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + phase * 0.3;
        const r = 50 + (i % 3) * 20;
        const x = cx + Math.cos(angle) * r, y = cy + Math.sin(angle) * r;
        ctx!.beginPath(); ctx!.arc(x, y, i % 2 ? 2 : 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = i === 0 ? `${acc}90` : `${acc}30`; ctx!.fill();
      }
      phase += 0.015; id = requestAnimationFrame(draw);
    }
    function resize() { const r = c!.parentElement!.getBoundingClientRect(); c!.width = r.width; c!.height = 240; }
    resize(); const ro = new ResizeObserver(resize); ro.observe(c!.parentElement!);
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, [isZh]);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <p className="text-center text-sm text-zinc-400 mb-4">{isZh ? "宇宙大爆炸 = 无极生太极" : "Big Bang = Wuji gives birth to Taiji"}</p>
      <canvas ref={canvasRef} className="w-full" />
      <p className="text-center text-xs text-zinc-500 mt-4">{isZh ? "138亿年前，宇宙从奇点中诞生——暗物质/暗能量构成宇宙的'阴'，可见物质仅为'阳'。" : "13.8B years ago, the universe was born from a singularity — dark matter/energy as cosmic 'yin,' visible matter as 'yang.'"}</p>
    </div>
  );
}
