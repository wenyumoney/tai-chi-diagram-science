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

    // Detect mobile
    const isMobile = window.innerWidth < 768;

    // Handle resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
      }
    });
    resizeObserver.observe(wrapper);

    // Set initial size
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Create and start particle system
    const system = createParticleSystem(canvas, isMobile);
    system.start();

    // Mouse tracking (throttled by rAF)
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

    // Cleanup
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
    <div ref={wrapperRef} className="fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
