"use client";
import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

export default function BiologyViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let phase = 0, id: number;
    function draw() {
      const w = c!.width, h = c!.height, cx = w / 2, cy = h / 2;
      ctx!.clearRect(0, 0, w, h);
      const acc = "#22d3ee";
      // DNA double helix
      for (let y = 20; y < h - 20; y += 3) {
        const t = y / (h - 40);
        const x1 = cx + Math.sin(t * Math.PI * 4 + phase) * 40;
        const x2 = cx + Math.sin(t * Math.PI * 4 + phase + Math.PI) * 40;
        ctx!.fillStyle = `${acc}30`; ctx!.fillRect(x1, y, 2, 2);
        ctx!.fillStyle = `${acc}15`; ctx!.fillRect(x2, y, 2, 2);
        // Base pair bridge
        ctx!.beginPath(); ctx!.moveTo(x1 + 1, y + 1); ctx!.lineTo(x2 + 1, y + 1);
        ctx!.strokeStyle = `${acc}08`; ctx!.lineWidth = 0.3; ctx!.stroke();
      }
      // Center labels
      ctx!.fillStyle = acc; ctx!.font = "9px sans-serif"; ctx!.textAlign = "center";
      ctx!.fillText("A···T   G···C", cx, cy);
      ctx!.fillText(isZh ? "DNA = 阴阳互补缠绕" : "DNA = Yin-Yang Complementarity", cx, cy + 18);
      phase += 0.015; id = requestAnimationFrame(draw);
    }
    function resize() { const r = c!.parentElement!.getBoundingClientRect(); c!.width = r.width; c!.height = 220; }
    resize(); const ro = new ResizeObserver(resize); ro.observe(c!.parentElement!);
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, [isZh]);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <p className="text-center text-sm text-zinc-400 mb-4">{isZh ? "DNA双螺旋 = 太极图的分子版本" : "DNA Double Helix = Molecular Taiji Diagram"}</p>
      <canvas ref={canvasRef} className="w-full" />
      <p className="text-center text-xs text-zinc-500 mt-4">{isZh ? "两条互补链互相缠绕，每链包含另一链的全部信息——阴中含阳、阳中含阴的分子级实现。" : "Two complementary strands intertwine — each contains the other's complete information: yin-yang at the molecular level."}</p>
    </div>
  );
}
