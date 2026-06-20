"use client";

import { useEffect, useRef, useState } from "react";
import type { DomainVizProps } from "./registry";

const ACCENT = "#60a5fa";
const PINK = "#f472b6";

// ── Comparison 1: Yin-contains-Yang ↔ Superposition ──
function SuperpositionComparison({ isZh }: { isZh: boolean }) {
  const [activeDot, setActiveDot] = useState<"yin" | "yang" | null>(null);

  return (
    <div className="rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500">
      <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
        <h4 className="text-xs font-semibold text-zinc-300 mb-4 text-center">
          {isZh ? "阴中有阳 ↔ 量子叠加态" : "Yin-in-Yang ↔ Quantum Superposition"}
        </h4>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          {/* Taiji with eye-dots */}
          <div className="flex flex-col items-center gap-3">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#3f3f46" strokeWidth="0.5" />
              {/* Yang half (white, right) */}
              <path
                d="M50,4 A46,46 0 0,1 50,96 A23,23 0 0,0 50,50 A23,23 0 0,1 50,4 Z"
                fill="rgba(244,244,245,0.08)"
              />
              {/* Yin half (dark, left) */}
              <path
                d="M50,4 A46,46 0 0,0 50,96 A23,23 0 0,1 50,50 A23,23 0 0,0 50,4 Z"
                fill="#18181b"
              />
              {/* Yin dot in yang (top) — clickable */}
              <circle
                cx="50"
                cy="27"
                r={activeDot === "yin" ? 7 : 4.5}
                fill={activeDot === "yin" ? ACCENT : "#18181b"}
                stroke={activeDot === "yin" ? ACCENT : "#3f3f46"}
                strokeWidth="0.5"
                style={{
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.32,0.72,0,1)",
                }}
                onMouseEnter={() => setActiveDot("yin")}
                onMouseLeave={() => setActiveDot(null)}
              />
              {/* Yang dot in yin (bottom) — clickable */}
              <circle
                cx="50"
                cy="73"
                r={activeDot === "yang" ? 7 : 4.5}
                fill={activeDot === "yang" ? PINK : "rgba(244,244,245,0.08)"}
                stroke={activeDot === "yang" ? PINK : "#3f3f46"}
                strokeWidth="0.5"
                style={{
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.32,0.72,0,1)",
                }}
                onMouseEnter={() => setActiveDot("yang")}
                onMouseLeave={() => setActiveDot(null)}
              />

              {/* Labels for active dot */}
              {activeDot === "yin" && (
                <text x="50" y="18" textAnchor="middle" fontSize="8" fill={ACCENT}>
                  {isZh ? "阴中含阳" : "Yin has Yang"}
                </text>
              )}
              {activeDot === "yang" && (
                <text x="50" y="88" textAnchor="middle" fontSize="8" fill={PINK}>
                  {isZh ? "阳中含阴" : "Yang has Yin"}
                </text>
              )}
            </svg>
            <span className="text-[10px] text-zinc-500 text-center">
              {isZh ? "太极图眼点 — 阴中含阳，阳中含阴" : "Taiji eye-dots — Yin contains Yang, Yang contains Yin"}
            </span>
          </div>

          {/* Arrow bridge */}
          <div className="flex flex-col items-center gap-1">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <line x1="4" y1="14" x2="20" y2="14" stroke={activeDot ? ACCENT : "#3f3f46"} strokeWidth="1.5"
                style={{ transition: "stroke 0.35s cubic-bezier(0.32,0.72,0,1)" }} />
              <polyline points="15,9 21,14 15,19" fill="none" stroke={activeDot ? ACCENT : "#3f3f46"} strokeWidth="1.5"
                style={{ transition: "stroke 0.35s cubic-bezier(0.32,0.72,0,1)" }} />
            </svg>
            <span className="text-[9px] text-zinc-600 font-mono">≈</span>
          </div>

          {/* Superposition sphere */}
          <div className="flex flex-col items-center gap-3">
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Bloch-like sphere */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="#3f3f46" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="42" fill="rgba(96,165,250,0.04)" />
              {/* Equator */}
              <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="#52525b" strokeWidth="0.3" strokeDasharray="3 3" />
              {/* Superposition state vector */}
              <line
                x1="50" y1="50"
                x2="50" y2="14"
                stroke={ACCENT}
                strokeWidth="1.5"
                opacity={activeDot ? "0.9" : "0.4"}
                style={{ transition: "opacity 0.35s ease" }}
              />
              {/* State dot */}
              <circle
                cx="50" cy="14"
                r={activeDot ? 5 : 3}
                fill={ACCENT}
                opacity={activeDot ? "0.9" : "0.5"}
                style={{ transition: "all 0.35s ease" }}
              />
              {/* Faded alternative positions */}
              {[Math.PI / 6, -Math.PI / 6, Math.PI / 3].map((angle, i) => {
                const sx = 50 + Math.sin(angle) * 36;
                const sy = 50 - Math.cos(angle) * 36;
                return (
                  <circle
                    key={i}
                    cx={sx}
                    cy={sy}
                    r="1.5"
                    fill={ACCENT}
                    opacity="0.12"
                  />
                );
              })}
            </svg>
            <span className="text-[10px] text-zinc-500 text-center">
              {isZh ? "量子叠加 — 测量前同时处于多种状态" : "Quantum superposition — Multiple states before measurement"}
            </span>
          </div>
        </div>

        <p className="text-center text-[11px] text-zinc-600 mt-4 leading-relaxed">
          {isZh
            ? "悬停太极图的眼点——正如阴中含阳、阳中含阴，量子粒子在被测量前同时处于多种可能状态的叠加。"
            : "Hover the Taiji eye-dots — just as yin contains yang and vice versa, a quantum particle exists in superposition of multiple states before measurement."}
        </p>
      </div>
    </div>
  );
}

// ── Comparison 2: Mutual dependence ↔ Entanglement ──
function EntanglementComparison({ isZh }: { isZh: boolean }) {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  return (
    <div className="rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500">
      <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
        <h4 className="text-xs font-semibold text-zinc-300 mb-4 text-center">
          {isZh ? "阴阳互根 ↔ 量子纠缠" : "Mutual Dependence ↔ Quantum Entanglement"}
        </h4>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {/* Yin-Yang mutual dependence */}
          <div
            className="flex flex-col items-center gap-3 cursor-pointer"
            onMouseEnter={() => setHoverSide("left")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <svg width="120" height="100" viewBox="0 0 120 100">
              {/* Two interlinked circles */}
              <circle
                cx="40" cy="50" r="30"
                fill="none"
                stroke={hoverSide === "left" ? ACCENT : "#52525b"}
                strokeWidth={hoverSide === "left" ? 1.5 : 0.8}
                strokeDasharray={hoverSide === "left" ? "none" : "4 3"}
                style={{ transition: "all 0.35s cubic-bezier(0.32,0.72,0,1)" }}
              />
              <text x="40" y="54" textAnchor="middle" fontSize="14" fill={hoverSide === "left" ? ACCENT : "#71717a"}
                style={{ transition: "fill 0.35s ease" }}>
                {isZh ? "阴" : "Yin"}
              </text>

              <circle
                cx="80" cy="50" r="30"
                fill="none"
                stroke={hoverSide === "left" ? PINK : "#52525b"}
                strokeWidth={hoverSide === "left" ? 1.5 : 0.8}
                strokeDasharray={hoverSide === "left" ? "none" : "4 3"}
                style={{ transition: "all 0.35s cubic-bezier(0.32,0.72,0,1)" }}
              />
              <text x="80" y="54" textAnchor="middle" fontSize="14" fill={hoverSide === "left" ? PINK : "#71717a"}
                style={{ transition: "fill 0.35s ease" }}>
                {isZh ? "阳" : "Yang"}
              </text>

              {/* Connection bridge */}
              <line
                x1="60" y1="42" x2="60" y2="58"
                stroke={hoverSide === "left" ? ACCENT : "#3f3f46"}
                strokeWidth="2"
                style={{ transition: "stroke 0.35s ease" }}
              />
              <text x="60" y="38" textAnchor="middle" fontSize="7" fill={hoverSide === "left" ? ACCENT : "#52525b"}
                style={{ transition: "fill 0.35s ease" }}>
                {isZh ? "互根" : "interdependent"}
              </text>
            </svg>
            <span className="text-[10px] text-zinc-500 text-center">
              {isZh ? "阴阳互根 — 互为存在条件" : "Mutual dependence — each conditions the other"}
            </span>
          </div>

          {/* Bridge */}
          <span className="text-zinc-600 text-lg">≈</span>

          {/* Quantum entanglement */}
          <div
            className="flex flex-col items-center gap-3 cursor-pointer"
            onMouseEnter={() => setHoverSide("right")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <svg width="140" height="100" viewBox="0 0 140 100">
              {/* Particle A */}
              <circle cx="35" cy="50" r="14" fill="none"
                stroke={hoverSide === "right" ? ACCENT : "#52525b"}
                strokeWidth={hoverSide === "right" ? 1.5 : 0.8}
                style={{ transition: "all 0.35s ease" }} />
              <circle cx="35" cy="50" r="4"
                fill={hoverSide === "right" ? ACCENT : "#60a5fa80"}
                style={{ transition: "fill 0.35s ease" }} />
              <text x="35" y="74" textAnchor="middle" fontSize="8" fill="#71717a">
                {isZh ? "粒子 A" : "Particle A"}
              </text>

              {/* Particle B */}
              <circle cx="105" cy="50" r="14" fill="none"
                stroke={hoverSide === "right" ? PINK : "#52525b"}
                strokeWidth={hoverSide === "right" ? 1.5 : 0.8}
                style={{ transition: "all 0.35s ease" }} />
              <circle cx="105" cy="50" r="4"
                fill={hoverSide === "right" ? PINK : "#f472b680"}
                style={{ transition: "fill 0.35s ease" }} />
              <text x="105" y="74" textAnchor="middle" fontSize="8" fill="#71717a">
                {isZh ? "粒子 B" : "Particle B"}
              </text>

              {/* Entanglement dashed line */}
              <line
                x1="49" y1="50" x2="91" y2="50"
                stroke={hoverSide === "right" ? ACCENT : "#3f3f46"}
                strokeWidth={hoverSide === "right" ? 1.2 : 0.6}
                strokeDasharray={hoverSide === "right" ? "none" : "5 5"}
                style={{ transition: "all 0.35s ease" }}
              />

              {/* Spin correlation arrows */}
              <text x="35" y="36" textAnchor="middle" fontSize="10" fill={ACCENT}
                opacity={hoverSide === "right" ? "0.9" : "0.4"}
                style={{ transition: "opacity 0.35s ease" }}>
                ↑
              </text>
              <text x="105" y="64" textAnchor="middle" fontSize="10" fill={PINK}
                opacity={hoverSide === "right" ? "0.9" : "0.4"}
                style={{ transition: "opacity 0.35s ease" }}>
                ↓
              </text>

              {/* Measurement label when hovered */}
              {hoverSide === "right" && (
                <text x="70" y="24" textAnchor="middle" fontSize="8" fill={ACCENT}>
                  {isZh ? "瞬时关联 · 无视距离" : "Instant correlation · No matter the distance"}
                </text>
              )}
            </svg>
            <span className="text-[10px] text-zinc-500 text-center">
              {isZh ? "量子纠缠 — 测量一个立即确定另一个" : "Entanglement — Measuring one determines the other"}
            </span>
          </div>
        </div>

        <p className="text-center text-[11px] text-zinc-600 mt-4 leading-relaxed">
          {isZh
            ? "悬停任一侧——阴阳互根与量子纠缠表达同一个核心洞见：存在本质上是关系性的，独立个体是幻象。"
            : "Hover either side — yin-yang interdependence and quantum entanglement express the same insight: existence is fundamentally relational, not independent."}
        </p>
      </div>
    </div>
  );
}

// ── Comparison 3: Waxing-waning ↔ Wave function evolution ──
function WaveEvolutionComparison({ isZh }: { isZh: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cx = w / 4;
      const cy = h / 2;

      ctx!.clearRect(0, 0, w, h);

      // ── Left: Taiji waxing-waning curve ──
      // Yang intensity (sin²)
      ctx!.beginPath();
      for (let x = 0; x <= w / 2; x++) {
        const xNorm = (x / (w / 2)) * Math.PI * 2;
        const yangVal = Math.sin(xNorm + phase) ** 2;
        const y = cy - (yangVal - 0.5) * h * 0.6;
        if (x === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = ACCENT;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // Yin intensity (cos²) — complementary
      ctx!.beginPath();
      for (let x = 0; x <= w / 2; x++) {
        const xNorm = (x / (w / 2)) * Math.PI * 2;
        const yinVal = Math.cos(xNorm + phase) ** 2;
        const y = cy - (yinVal - 0.5) * h * 0.6;
        if (x === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = PINK;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // Label left
      ctx!.fillStyle = "#71717a";
      ctx!.font = "9px sans-serif";
      ctx!.textAlign = "center";
      ctx!.fillText(
        isZh ? "阴阳消长" : "Yin-Yang Wax & Wane",
        w / 4,
        h - 8
      );

      // Divider
      ctx!.beginPath();
      ctx!.moveTo(w / 2, 8);
      ctx!.lineTo(w / 2, h - 8);
      ctx!.strokeStyle = "#3f3f46";
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      // ── Right: Wave function (Schrödinger evolution) ──
      const rx = w / 2 + w / 4;
      ctx!.beginPath();
      for (let x = w / 2; x <= w; x++) {
        const xNorm = ((x - w / 2) / (w / 2)) * Math.PI * 2;
        const waveVal = Math.sin(xNorm * 3 + phase * 0.7) * Math.exp(-Math.abs(xNorm - Math.PI) * 0.3);
        const y = cy + waveVal * h * 0.3;
        if (x === w / 2) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = ACCENT;
      ctx!.lineWidth = 1.2;
      ctx!.setLineDash([3, 2]);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // Envelope
      ctx!.beginPath();
      for (let x = w / 2; x <= w; x++) {
        const xNorm = ((x - w / 2) / (w / 2)) * Math.PI * 2;
        const envVal = Math.exp(-Math.abs(xNorm - Math.PI) * 0.3) * h * 0.3;
        const y = cy + envVal;
        if (x === w / 2) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = "rgba(96,165,250,0.15)";
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      ctx!.beginPath();
      for (let x = w / 2; x <= w; x++) {
        const xNorm = ((x - w / 2) / (w / 2)) * Math.PI * 2;
        const envVal = Math.exp(-Math.abs(xNorm - Math.PI) * 0.3) * h * 0.3;
        const y = cy - envVal;
        if (x === w / 2) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = "rgba(96,165,250,0.15)";
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      // Label right
      ctx!.fillStyle = "#71717a";
      ctx!.font = "9px sans-serif";
      ctx!.textAlign = "center";
      ctx!.fillText(
        isZh ? "波函数演化 (薛定谔方程)" : "Wave Function (Schrödinger Eq.)",
        rx,
        h - 8
      );

      phase += 0.015;
      animId = requestAnimationFrame(draw);
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width * 2;
      canvas!.height = 120 * 2;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = "120px";
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
    <div className="rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500">
      <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
        <h4 className="text-xs font-semibold text-zinc-300 mb-3 text-center">
          {isZh ? "阴阳消长 ↔ 波函数连续演化" : "Waxing-Waning ↔ Wave Function Evolution"}
        </h4>
        <canvas ref={canvasRef} className="w-full" />
        <p className="text-center text-[11px] text-zinc-600 mt-3 leading-relaxed">
          {isZh
            ? "阴阳的消长转化是一个连续动态过程（左），正如量子态的波函数在薛定谔方程下连续演化而非跳跃（右）。变化是连续的，不是离散的。"
            : "The waxing and waning of yin-yang is a continuous dynamic process (left), just as the quantum wave function evolves continuously under the Schrödinger equation (right). Change is continuous, not discrete."}
        </p>
      </div>
    </div>
  );
}

// ── Main export ──
export default function QuantumComparison({ locale }: DomainVizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".comp-card",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: { each: 0.12, from: "start" },
            ease: "power2.out",
          }
        );
      }, container);
      return () => ctx.revert();
    });
  }, []);

  return (
    <div ref={containerRef}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
          {isZh ? "可视化对照" : "Visual Comparison"}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="comp-card">
          <SuperpositionComparison isZh={isZh} />
        </div>
        <div className="comp-card">
          <EntanglementComparison isZh={isZh} />
        </div>
        <div className="comp-card">
          <WaveEvolutionComparison isZh={isZh} />
        </div>
      </div>
    </div>
  );
}
