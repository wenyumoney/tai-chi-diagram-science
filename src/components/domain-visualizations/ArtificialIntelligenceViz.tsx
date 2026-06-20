"use client";
import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

export default function ArtificialIntelligenceViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let phase = 0, id: number;
    function draw() {
      const w = c!.width, h = c!.height, cx = w / 2, cy = h / 2;
      ctx!.clearRect(0, 0, w, h);
      // GAN-style dual network visualization
      const acc = "#c084fc";
      // Generator node (left, yin)
      ctx!.beginPath(); ctx!.arc(cx - 80, cy, 18 + Math.sin(phase * 2) * 3, 0, Math.PI * 2);
      ctx!.fillStyle = `${acc}15`; ctx!.fill(); ctx!.strokeStyle = `${acc}50`; ctx!.lineWidth = 0.8; ctx!.stroke();
      ctx!.fillStyle = acc; ctx!.font = "8px sans-serif"; ctx!.textAlign = "center";
      ctx!.fillText(isZh ? "生成器(阴)" : "Generator(Yin)", cx - 80, cy + 28);
      // Discriminator node (right, yang)
      ctx!.beginPath(); ctx!.arc(cx + 80, cy, 18 + Math.sin(phase * 2 + Math.PI) * 3, 0, Math.PI * 2);
      ctx!.fillStyle = `${acc}25`; ctx!.fill(); ctx!.strokeStyle = `${acc}70`; ctx!.lineWidth = 1; ctx!.stroke();
      ctx!.fillText(isZh ? "判别器(阳)" : "Discrim(Yang)", cx + 80, cy + 28);
      // Data flow arrows
      ctx!.beginPath(); ctx!.moveTo(cx - 60, cy - 6); ctx!.lineTo(cx + 60, cy - 6);
      ctx!.strokeStyle = `${acc}30`; ctx!.lineWidth = 0.6; ctx!.setLineDash([3, 3]); ctx!.stroke(); ctx!.setLineDash([]);
      ctx!.beginPath(); ctx!.moveTo(cx + 60, cy + 6); ctx!.lineTo(cx - 60, cy + 6);
      ctx!.stroke();
      // Pulsing center
      ctx!.beginPath(); ctx!.arc(cx, cy, 4 + Math.sin(phase * 3) * 2, 0, Math.PI * 2);
      ctx!.fillStyle = `${acc}80`; ctx!.fill();
      phase += 0.02; id = requestAnimationFrame(draw);
    }
    function resize() { const r = c!.parentElement!.getBoundingClientRect(); c!.width = r.width; c!.height = 220; }
    resize(); const ro = new ResizeObserver(resize); ro.observe(c!.parentElement!);
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, [isZh]);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <p className="text-center text-sm text-zinc-400 mb-4">{isZh ? "神经网络 = 数字化的阴阳博弈" : "Neural Networks = Digitized Yin-Yang Games"}</p>
      <canvas ref={canvasRef} className="w-full" />
      <p className="text-center text-xs text-zinc-500 mt-4">{isZh ? "GAN的生成器（阴）与判别器（阳）互相博弈训练——对抗中共同进化。" : "GAN's generator (yin) and discriminator (yang) train through mutual competition — co-evolving through opposition."}</p>
    </div>
  );
}
