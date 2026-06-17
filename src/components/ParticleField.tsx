"use client";

import { useEffect, useRef } from "react";
import { createParticleSystem } from "@/lib/particles";

export default function ParticleField() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const isMobile = window.innerWidth < 768;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
      }
    });
    resizeObserver.observe(wrapper);

    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const system = createParticleSystem(canvas, isMobile);
    system.start();

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const r = wrapper.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - r.left,
          y: e.clientY - r.top,
        };
        system.setMouseTarget(mouseRef.current);
      });
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
      system.setMouseTarget(null);
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      system.stop();
      resizeObserver.disconnect();
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-0 overflow-hidden">
      {/* Mesh gradient orbs — Ethereal Glass ambient glow */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)",
          animation: "orb-drift-1 30s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.03) 0%, transparent 70%)",
          animation: "orb-drift-2 40s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)",
          animation: "orb-drift-3 35s ease-in-out infinite alternate",
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
