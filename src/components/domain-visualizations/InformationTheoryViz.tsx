"use client";

import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

export default function InformationTheoryViz({ locale }: DomainVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 16;
    const ROWS = 12;
    const CELL = 20;
    let grid: number[][];
    let organized = 0; // 0=chaos, 1=fully organized
    let animId: number;

    function initGrid() {
      grid = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => (Math.random() > 0.5 ? 1 : 0))
      );
      organized = 0;
    }

    initGrid();

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cellW = w / COLS;
      const cellH = h / ROWS;

      ctx!.clearRect(0, 0, w, h);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          // Target: yin-yang pattern
          const angle = Math.atan2(r - ROWS / 2, c - COLS / 2);
          const dist = Math.sqrt((r - ROWS / 2) ** 2 + (c - COLS / 2) ** 2);
          const targetBit = angle > 0 ? 0 : 1; // Simple split

          // Blend toward target as organized increases
          const current = grid[r][c];
          const flipped = Math.random() < organized * 0.02;
          if (flipped) grid[r][c] = targetBit;
          const display = organized > 0.9 ? grid[r][c] : current;

          const x = c * cellW;
          const y = r * cellH;

          ctx!.beginPath();
          ctx!.arc(x + cellW / 2, y + cellH / 2, cellW * 0.35, 0, Math.PI * 2);
          ctx!.fillStyle = display
            ? "rgba(212, 168, 83, 0.9)" // Yang = gold
            : "rgba(24, 24, 27, 0.9)"; // Yin = dark
          ctx!.fill();

          // Border
          ctx!.strokeStyle = display
            ? "#d4a85340"
            : "#27272a";
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }

      // Entropy meter
      const zeros = grid.flat().filter((b) => b === 0).length;
      const total = ROWS * COLS;
      const entropy = 1 - Math.abs(zeros / total - 0.5) * 2; // Max at 50/50

      ctx!.fillStyle = "#ffffff30";
      ctx!.font = "10px monospace";
      ctx!.textAlign = "right";
      ctx!.fillText(
        isZh
          ? `熵: ${(entropy * 100).toFixed(0)}%`
          : `Entropy: ${(entropy * 100).toFixed(0)}%`,
        canvas!.width - 12, 16
      );

      organized += 0.001;
      if (organized > 2) {
        initGrid();
      }

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
          ? "比特 = 阴阳 | 信息 = 消除不确定性"
          : "Bit = Yin-Yang | Information = Eliminating Uncertainty"}
      </p>
      <canvas ref={canvasRef} className="w-full" />
      <p className="text-center text-xs text-zinc-500 mt-4">
        {isZh
          ? "随机比特逐渐组织为有序图案——信息获取即熵减"
          : "Random bits gradually organize into ordered patterns — information acquisition is entropy reduction"}
      </p>
    </div>
  );
}
