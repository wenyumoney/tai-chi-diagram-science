"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PanoramaNode } from "@/data/types";
import { computeLayout } from "@/lib/panorama-layout";

interface PanoramaMapProps {
  nodes: PanoramaNode[];
  locale: string;
}

const CORE_GLOW = "#d4a853";
const EXTENDED_COLOR = "#71717a";
const HIGHLIGHT_COLOR = "#60a5fa";

export default function PanoramaMap({ nodes, locale }: PanoramaMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(true);

  const transformRef = useRef({ offsetX: 0, offsetY: 0, scale: 1 });
  const dragRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    totalDrag: number;
  }>({ dragging: false, startX: 0, startY: 0, lastX: 0, lastY: 0, totalDrag: 0 });
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);
  const layoutNodesRef = useRef<PanoramaNode[]>([]);
  const pulseRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);

  const isZh = locale === "zh";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const positioned = computeLayout(nodes);
    layoutNodesRef.current = positioned;

    // Center on core cluster initially
    const coreNodes = positioned.filter((n) => n.isCore);
    if (coreNodes.length > 0) {
      const avgX = coreNodes.reduce((s, n) => s + (n.x ?? 500), 0) / coreNodes.length;
      const avgY = coreNodes.reduce((s, n) => s + (n.y ?? 500), 0) / coreNodes.length;
      transformRef.current.offsetX = canvas.width / 2 - avgX;
      transformRef.current.offsetY = canvas.height / 2 - avgY;
    }

    // Hide hints after first interaction
    const hideHints = () => setShowHints(false);
    canvas.addEventListener("pointerdown", hideHints, { once: true });
    canvas.addEventListener("wheel", hideHints, { once: true });

    // Find connected node IDs for a node (bidirectional)
    const getConnectedIds = (node: PanoramaNode): Set<string> => {
      const conns = new Set(node.connections);
      for (const other of positioned) {
        if (other.connections.includes(node.id)) {
          conns.add(other.id);
        }
      }
      return conns;
    };

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const t = transformRef.current;

      ctx!.clearRect(0, 0, w, h);

      // Pulse value (0 to 1, looping)
      const pulse = (Math.sin(pulseRef.current * 0.03) + 1) / 2;
      pulseRef.current++;

      const worldToScreen = (wx: number, wy: number) => ({
        sx: wx * t.scale + t.offsetX,
        sy: wy * t.scale + t.offsetY,
      });

      // Find the hovered and selected nodes
      const hoveredNode = hoveredNodeId
        ? positioned.find((n) => n.id === hoveredNodeId)
        : null;
      const selectedNode = selectedNodeId
        ? positioned.find((n) => n.id === selectedNodeId)
        : null;

      const hoveredConnections = hoveredNode
        ? getConnectedIds(hoveredNode)
        : new Set<string>();
      const selectedConnections = selectedNode
        ? getConnectedIds(selectedNode)
        : new Set<string>();
      const highlightedConnections = new Set([
        ...hoveredConnections,
        ...selectedConnections,
      ]);

      // Draw connections
      const drawnConnections = new Set<string>();
      for (const node of positioned) {
        for (const connId of node.connections) {
          const key = [node.id, connId].sort().join("-");
          if (drawnConnections.has(key)) continue;
          drawnConnections.add(key);

          const target = positioned.find((n) => n.id === connId);
          if (!target) continue;

          const a = worldToScreen(node.x ?? 0, node.y ?? 0);
          const b = worldToScreen(target.x ?? 0, target.y ?? 0);

          const isHighlighted =
            highlightedConnections.has(node.id) &&
            highlightedConnections.has(connId);

          ctx!.beginPath();
          ctx!.moveTo(a.sx, a.sy);
          ctx!.lineTo(b.sx, b.sy);
          ctx!.strokeStyle = isHighlighted
            ? `${CORE_GLOW}50`
            : "#3f3f4625";
          ctx!.lineWidth = isHighlighted ? 1 : 0.5;
          ctx!.stroke();
        }
      }

      // Draw nodes
      for (const node of positioned) {
        const { sx, sy } = worldToScreen(node.x ?? 0, node.y ?? 0);
        const isCore = node.isCore;
        const isHovered = node.id === hoveredNodeId;
        const isSelected = node.id === selectedNodeId;
        const isConnectedToHighlight =
          hoveredNodeId &&
          (highlightedConnections.has(node.id) || node.id === hoveredNodeId);

        const baseRadius = isCore ? 7 : 4;
        const hoverBoost = isHovered ? 3 : 0;
        const pulseBoost = isCore ? pulse * 2 : 0;
        const radius = baseRadius + hoverBoost + pulseBoost;

        // Outer glow for core nodes
        if (isCore) {
          ctx!.beginPath();
          ctx!.arc(sx, sy, radius + 6 + pulse * 4, 0, Math.PI * 2);
          ctx!.fillStyle = `${CORE_GLOW}15`;
          ctx!.fill();
        }

        // Hover/selection ring
        if (isHovered || isSelected) {
          ctx!.beginPath();
          ctx!.arc(sx, sy, radius + 5, 0, Math.PI * 2);
          ctx!.strokeStyle = isSelected ? CORE_GLOW : HIGHLIGHT_COLOR;
          ctx!.lineWidth = 1.5;
          ctx!.stroke();
        }

        // Node circle
        ctx!.beginPath();
        ctx!.arc(sx, sy, radius, 0, Math.PI * 2);

        if (isCore) {
          const grad = ctx!.createRadialGradient(sx, sy, 0, sx, sy, radius);
          grad.addColorStop(0, CORE_GLOW);
          grad.addColorStop(0.6, `${CORE_GLOW}80`);
          grad.addColorStop(1, `${CORE_GLOW}00`);
          ctx!.fillStyle = grad;
        } else {
          const alpha = isConnectedToHighlight ? "b0" : "50";
          ctx!.fillStyle =
            isHovered ? HIGHLIGHT_COLOR : `${EXTENDED_COLOR}${alpha}`;
        }
        ctx!.fill();

        // Subtle stroke
        ctx!.strokeStyle = isCore
          ? `${CORE_GLOW}40`
          : isConnectedToHighlight
            ? "#ffffff15"
            : "#3f3f4620";
        ctx!.lineWidth = 0.5;
        ctx!.stroke();

        // Label for core nodes and hovered nodes
        if (isCore || isHovered) {
          const label = node.name[isZh ? "zh" : "en"];
          const fontSize = isCore ? 11 : 10;
          ctx!.font = `${fontSize}px Geist, PingFang SC, Microsoft YaHei, sans-serif`;
          ctx!.textAlign = "center";
          ctx!.textBaseline = "bottom";

          // Text shadow for readability
          const labelY = sy - radius - 6;
          ctx!.fillStyle = "#09090b90";
          ctx!.fillText(label, sx + 1, labelY + 1);

          ctx!.fillStyle = isCore
            ? `${CORE_GLOW}${isHovered ? "ff" : "90"}`
            : "#d4d4d8";
          ctx!.fillText(label, sx, labelY);
        }

        // Dim non-connected nodes when hovering
        if (hoveredNodeId && !isConnectedToHighlight && node.id !== hoveredNodeId) {
          ctx!.beginPath();
          ctx!.arc(sx, sy, radius + 3, 0, Math.PI * 2);
          ctx!.fillStyle = "#09090b50";
          ctx!.fill();
        }
      }

      // Draw canvas hints (fade out after interaction)
      if (showHints && hoveredNodeId === null) {
        const alpha = 0.35 + pulse * 0.15;
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.font = "12px Geist, PingFang SC, Microsoft YaHei, sans-serif";
        ctx!.textAlign = "center";

        const hintY1 = h - 44;
        const hintY2 = h - 26;

        ctx!.fillText(
          isZh ? "拖拽探索  ·  滚轮缩放  ·  点击金色节点进入详情" : "Drag to pan  ·  Scroll to zoom  ·  Click golden nodes to enter",
          w / 2,
          hintY1
        );
        ctx!.fillText(
          isZh ? "图中连线表示学科间的概念关联" : "Lines connect disciplines that share conceptual bridges",
          w / 2,
          hintY2
        );

        // Arrow cursor hint at center
        ctx!.font = "20px sans-serif";
        ctx!.fillStyle = `rgba(212,168,83,${0.25 + pulse * 0.1})`;
        ctx!.fillText("↗", w / 2 + 40, h / 2 - 30);
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    function resize() {
      const wrapper = canvas!.parentElement;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = Math.min(rect.height, 560);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [nodes, hoveredNodeId, selectedNodeId, isZh, showHints]);

  // Event handlers
  function screenToWorld(sx: number, sy: number) {
    const t = transformRef.current;
    return {
      wx: (sx - t.offsetX) / t.scale,
      wy: (sy - t.offsetY) / t.scale,
    };
  }

  function findNearestNode(sx: number, sy: number): string | null {
    const { wx, wy } = screenToWorld(sx, sy);
    let nearest: string | null = null;
    let minDist = 36 / transformRef.current.scale;

    for (const node of layoutNodesRef.current) {
      const dx = (node.x ?? 0) - wx;
      const dy = (node.y ?? 0) - wy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        nearest = node.id;
      }
    }
    return nearest;
  }

  function getCanvasPos(e: MouseEvent | Touch) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handlePointerDown(e: React.PointerEvent) {
    canvasRef.current?.setPointerCapture(e.pointerId);
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      totalDrag: 0,
    };
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (dragRef.current.dragging) {
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      transformRef.current.offsetX += dx;
      transformRef.current.offsetY += dy;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      dragRef.current.totalDrag += Math.abs(dx) + Math.abs(dy);
    } else {
      const pos = getCanvasPos(e.nativeEvent);
      setHoveredNodeId(findNearestNode(pos.x, pos.y));
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    dragRef.current.dragging = false;
    // Only treat as click if minimal drag
    if (dragRef.current.totalDrag < 8) {
      const pos = getCanvasPos(e.nativeEvent);
      const nodeId = findNearestNode(pos.x, pos.y);
      if (nodeId) {
        const node = layoutNodesRef.current.find((n) => n.id === nodeId);
        if (node) {
          setSelectedNodeId(nodeId);
          setHoveredNodeId(null);
          if (node.isCore && node.coreSlug) {
            router.push(`/${locale}/domain/${node.coreSlug}`);
          }
        }
      } else {
        setSelectedNodeId(null);
      }
    }
    canvasRef.current?.releasePointerCapture(e.pointerId);
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.88 : 1.12;
    const newScale = Math.min(4, Math.max(0.4, transformRef.current.scale * delta));

    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    transformRef.current.offsetX =
      mx - (mx - transformRef.current.offsetX) * (newScale / transformRef.current.scale);
    transformRef.current.offsetY =
      my - (my - transformRef.current.offsetY) * (newScale / transformRef.current.scale);
    transformRef.current.scale = newScale;
  }

  const selectedNodeData = selectedNodeId
    ? layoutNodesRef.current.find((n) => n.id === selectedNodeId)
    : null;

  return (
    <div className="relative w-full" style={{ touchAction: "none" }}>
      <canvas
        ref={canvasRef}
        className="w-full cursor-grab active:cursor-grabbing"
        style={{ height: 560 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          dragRef.current.dragging = false;
          setHoveredNodeId(null);
        }}
        onWheel={handleWheel}
      />

      {/* Selected node detail panel */}
      {selectedNodeData && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[min(90vw,360px)]">
          <div className="rounded-2xl p-[1px] bg-white/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
            <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.05]">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  {/* Category badge */}
                  <span className={`inline-block text-[10px] uppercase tracking-[0.15em] font-medium mb-1.5 px-2 py-0.5 rounded-full ${
                    selectedNodeData.isCore
                      ? "text-[#d4a853] bg-[#d4a853]/10"
                      : "text-zinc-400 bg-white/[0.03]"
                  }`}>
                    {selectedNodeData.isCore
                      ? (isZh ? "核心领域" : "Core Domain")
                      : (isZh ? "扩展领域" : "Extended Domain")}
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {selectedNodeData.name[isZh ? "zh" : "en"]}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="w-6 h-6 rounded-full bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="2" y1="2" x2="8" y2="8" />
                    <line x1="8" y1="2" x2="2" y2="8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                {selectedNodeData.description[isZh ? "zh" : "en"]}
              </p>
              {selectedNodeData.isCore && selectedNodeData.coreSlug && (
                <button
                  onClick={() => router.push(`/${locale}/domain/${selectedNodeData.coreSlug}`)}
                  className="w-full py-2 rounded-full text-xs font-medium text-[#d4a853] border border-[#d4a853]/20 bg-[#d4a853]/[0.04] hover:bg-[#d4a853]/[0.08] transition-colors"
                >
                  {isZh ? "进入详情 →" : "Enter Detail →"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
