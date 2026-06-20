"use client";
import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

export default function PsychologyViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let phase = 0, id: number;
    function draw() {
      const w = c!.width, h = c!.height, cx = w / 2, cy = h / 2;
      ctx!.clearRect(0, 0, w, h);
      const acc = "#e879f9";
      // Consciousness (yang, bright, top)
      ctx!.beginPath(); ctx!.arc(cx, cy - 25, 30, 0, Math.PI * 2);
      ctx!.fillStyle = `${acc}12`; ctx!.fill(); ctx!.strokeStyle = `${acc}50`; ctx!.lineWidth = 0.8; ctx!.stroke();
      ctx!.fillStyle = acc; ctx!.font = "9px sans-serif"; ctx!.textAlign = "center";
      ctx!.fillText(isZh ? "意识 (阳)" : "Conscious (Yang)", cx, cy - 22);
      // Unconscious (yin, dark, bottom)
      ctx!.beginPath(); ctx!.arc(cx, cy + 25, 30, 0, Math.PI * 2);
      ctx!.fillStyle = `${acc}06`; ctx!.fill(); ctx!.strokeStyle = `${acc}25`; ctx!.lineWidth = 0.6; ctx!.setLineDash([3, 3]); ctx!.stroke(); ctx!.setLineDash([]);
      ctx!.fillText(isZh ? "无意识 (阴)" : "Unconscious (Yin)", cx, cy + 28);
      // Connecting flow
      ctx!.beginPath(); ctx!.moveTo(cx, cy - 55); ctx!.lineTo(cx, cy + 55);
      ctx!.strokeStyle = `${acc}15`; ctx!.lineWidth = 1.5; ctx!.stroke();
      // Integration pulse
      const pulse = Math.sin(phase * 2) * 15;
      ctx!.beginPath(); ctx!.arc(cx, cy, 12 + Math.abs(pulse) * 0.5, 0, Math.PI * 2);
      ctx!.fillStyle = `${acc}${Math.round(20 + Math.abs(pulse) * 1.5)}`; ctx!.fill();
      ctx!.fillStyle = acc; ctx!.font = "7px sans-serif";
      ctx!.fillText(isZh ? "个性化 = 整合" : "Individuation", cx, cy + 65);
      phase += 0.015; id = requestAnimationFrame(draw);
    }
    function resize() { const r = c!.parentElement!.getBoundingClientRect(); c!.width = r.width; c!.height = 220; }
    resize(); const ro = new ResizeObserver(resize); ro.observe(c!.parentElement!);
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, [isZh]);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <p className="text-center text-sm text-zinc-400 mb-4">{isZh ? "意识（阳）与无意识（阴）= 荣格的太极心理学" : "Conscious (Yang) & Unconscious (Yin) = Jung's Taiji Psychology"}</p>
      <canvas ref={canvasRef} className="w-full" />
      <p className="text-center text-xs text-zinc-500 mt-4">{isZh ? "荣格从《易经》中发现了共时性——意识与无意识的整合（个性化）正是阴阳合一。" : "Jung discovered synchronicity in the I Ching — the integration of conscious and unconscious (Individuation) is yin-yang unity."}</p>
    </div>
  );
}
