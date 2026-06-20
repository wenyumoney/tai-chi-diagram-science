"use client";
import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

export default function ComputerScienceViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let phase = 0, id: number;
    function draw() {
      const w = c!.width, h = c!.height;
      ctx!.clearRect(0, 0, w, h);
      const acc = "#f97316";
      const cols = 8, rows = 5, cw = w / cols, ch = h / rows;
      for (let r = 0; r < rows; r++) {
        for (let cl = 0; cl < cols; cl++) {
          const v = Math.sin((r + cl) * 0.8 + phase) > 0 ? 1 : 0;
          ctx!.fillStyle = v ? acc : "#27272a";
          ctx!.fillRect(cl * cw + 2, r * ch + 2, cw - 4, ch - 4);
          ctx!.fillStyle = v ? acc : "#52525b";
          ctx!.font = `${Math.min(cw, ch) * 0.4}px monospace`; ctx!.textAlign = "center"; ctx!.textBaseline = "middle";
          ctx!.fillText(v.toString(), cl * cw + cw / 2, r * ch + ch / 2);
        }
      }
      // De Morgan's transform
      ctx!.fillStyle = acc; ctx!.font = "9px sans-serif"; ctx!.textAlign = "center";
      const p = phase % (Math.PI * 4);
      const label = p < Math.PI * 2 ? "¬(A∧B) = ¬A∨¬B" : "¬(A∨B) = ¬A∧¬B";
      ctx!.fillText(label, w / 2, h - 6);
      ctx!.fillText(isZh ? "德·摩根定律 = 逻辑阴阳互化" : "De Morgan = Logic Yin-Yang Transform", w / 2, 14);
      phase += 0.025; id = requestAnimationFrame(draw);
    }
    function resize() { const r = c!.parentElement!.getBoundingClientRect(); c!.width = r.width; c!.height = 200; }
    resize(); const ro = new ResizeObserver(resize); ro.observe(c!.parentElement!);
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, [isZh]);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <p className="text-center text-sm text-zinc-400 mb-4">{isZh ? "布尔代数 = 阴阳逻辑的数字化" : "Boolean Algebra = Digitized Yin-Yang Logic"}</p>
      <canvas ref={canvasRef} className="w-full" />
      <p className="text-center text-xs text-zinc-500 mt-4">{isZh ? "AND/OR/NOT —— 三种基本逻辑运算精确映射阴阳关系。德·摩根定律揭示AND和OR通过NOT互相转化。" : "AND/OR/NOT — three basic logic operations map to yin-yang relationships. De Morgan shows AND/OR transform via NOT."}</p>
    </div>
  );
}
