"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

  const transformRef = useRef({ offsetX: 0, offsetY: 0, scale: 1 });
  const dragRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    totalDrag: number;
  }>({ dragging: false, startX: 0, startY: 0, totalDrag: 0 });
  const layoutNodesRef = useRef<PanoramaNode[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const selectedRef = useRef<string | null>(null);
  const needsRedraw = useRef(true);

  const isZh = locale === "zh";

  // Trigger redraw
  const redraw = useCallback(() => {
    needsRedraw.current = true;
  }, []);

  // Draw function — only called when state changes, not in a continuous loop
  const draw = useCallback(() => {
    if (!needsRedraw.current) return;
    needsRedraw.current = false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const positioned = layoutNodesRef.current;
    if (positioned.length === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const t = transformRef.current;

    ctx.clearRect(0, 0, w, h);

    const worldToScreen = (wx: number, wy: number) => ({
      sx: wx * t.scale + t.offsetX,
      sy: wy * t.scale + t.offsetY,
    });

    const hoveredId = hoveredRef.current;
    const selectedId = selectedRef.current;

    // Build connection highlight sets
    const getConnectedIds = (node: PanoramaNode): Set<string> => {
      const conns = new Set(node.connections);
      for (const other of positioned) {
        if (other.connections.includes(node.id)) conns.add(other.id);
      }
      return conns;
    };

    const hoveredNode = hoveredId ? positioned.find((n) => n.id === hoveredId) : null;
    const selectedNode = selectedId ? positioned.find((n) => n.id === selectedId) : null;

    const highlightedConnections = new Set<string>();
    if (hoveredNode) {
      for (const id of getConnectedIds(hoveredNode)) highlightedConnections.add(id);
      highlightedConnections.add(hoveredId!);
    }
    if (selectedNode) {
      for (const id of getConnectedIds(selectedNode)) highlightedConnections.add(id);
      highlightedConnections.add(selectedId!);
    }

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
          highlightedConnections.has(node.id) && highlightedConnections.has(connId);

        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = isHighlighted ? `${CORE_GLOW}45` : "#3f3f4620";
        ctx.lineWidth = isHighlighted ? 1 : 0.5;
        ctx.stroke();
      }
    }

    // Draw nodes
    for (const node of positioned) {
      const { sx, sy } = worldToScreen(node.x ?? 0, node.y ?? 0);
      const isCore = node.isCore;
      const isHovered = node.id === hoveredId;
      const isSelected = node.id === selectedId;
      const isConnected = highlightedConnections.has(node.id);

      const radius = isCore ? 7 : 4;
      const hoverBoost = isHovered ? 3 : 0;
      const finalRadius = radius + hoverBoost;

      // Core node subtle static glow
      if (isCore) {
        ctx.beginPath();
        ctx.arc(sx, sy, finalRadius + 5, 0, Math.PI * 2);
        ctx.fillStyle = `${CORE_GLOW}0c`;
        ctx.fill();
      }

      // Selection/hover ring
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(sx, sy, finalRadius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected ? CORE_GLOW : `${HIGHLIGHT_COLOR}80`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Node fill
      ctx.beginPath();
      ctx.arc(sx, sy, finalRadius, 0, Math.PI * 2);

      if (isCore) {
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, finalRadius);
        grad.addColorStop(0, CORE_GLOW);
        grad.addColorStop(0.6, `${CORE_GLOW}80`);
        grad.addColorStop(1, `${CORE_GLOW}00`);
        ctx.fillStyle = grad;
      } else {
        const alpha = isConnected ? "a0" : "40";
        ctx.fillStyle = isHovered ? HIGHLIGHT_COLOR : `${EXTENDED_COLOR}${alpha}`;
      }
      ctx.fill();

      // Stroke
      ctx.strokeStyle = isCore
        ? `${CORE_GLOW}35`
        : isConnected
          ? "#ffffff12"
          : "#3f3f4618";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Label: always for core, only for hovered extended
      if (isCore || isHovered) {
        const label = node.name[isZh ? "zh" : "en"];
        const fontSize = isCore ? 11 : 10;
        ctx.font = `500 ${fontSize}px Geist, PingFang SC, Microsoft YaHei, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        const labelY = sy - finalRadius - 6;

        // Shadow
        ctx.fillStyle = "#09090bd0";
        ctx.fillText(label, sx + 1, labelY + 1);

        ctx.fillStyle = isCore
          ? `${CORE_GLOW}${isHovered || isSelected ? "ff" : "c0"}`
          : "#d4d4d8";
        ctx.fillText(label, sx, labelY);
      }

      // Dim non-connected nodes when hovering
      if (hoveredId && !isConnected && node.id !== hoveredId) {
        ctx.beginPath();
        ctx.arc(sx, sy, finalRadius + 3, 0, Math.PI * 2);
        ctx.fillStyle = "#09090b55";
        ctx.fill();
      }
    }
  }, [isZh]);

  // Init layout and canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const positioned = computeLayout(nodes);
    layoutNodesRef.current = positioned;

    function resize() {
      const wrapper = canvas!.parentElement;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = Math.min(rect.height, 560);

      // Recenter on first resize
      const coreNodes = positioned.filter((n) => n.isCore);
      if (coreNodes.length > 0 && transformRef.current.scale === 1) {
        const avgX = coreNodes.reduce((s, n) => s + (n.x ?? 500), 0) / coreNodes.length;
        const avgY = coreNodes.reduce((s, n) => s + (n.y ?? 500), 0) / coreNodes.length;
        transformRef.current.offsetX = canvas!.width / 2 - avgX;
        transformRef.current.offsetY = canvas!.height / 2 - avgY;
      }
      redraw();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    redraw();

    return () => ro.disconnect();
  }, [nodes, redraw]);

  // Sync React state to refs (avoids useEffect re-triggering the entire setup)
  useEffect(() => { hoveredRef.current = hoveredNodeId; draw(); }, [hoveredNodeId, draw]);
  useEffect(() => { selectedRef.current = selectedNodeId; draw(); }, [selectedNodeId, draw]);

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

  function getCanvasPos(e: React.MouseEvent) {
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
      totalDrag: 0,
    };
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (dragRef.current.dragging) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      dragRef.current.totalDrag += Math.abs(dx) + Math.abs(dy);

      transformRef.current.offsetX += dx;
      transformRef.current.offsetY += dy;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      redraw();
    } else {
      const pos = getCanvasPos(e);
      const nearest = findNearestNode(pos.x, pos.y);
      if (nearest !== hoveredRef.current) {
        setHoveredNodeId(nearest);
      }
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    const wasDragging = dragRef.current.dragging;
    const totalDrag = dragRef.current.totalDrag;
    dragRef.current.dragging = false;

    if (wasDragging && totalDrag < 8) {
      const pos = getCanvasPos(e);
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
    redraw();
  }

  const selectedNodeData = selectedNodeId
    ? layoutNodesRef.current.find((n) => n.id === selectedNodeId)
    : null;

  return (
    <div className="relative w-full" style={{ touchAction: "none" }}>
      {/* Instruction overlay — static DOM, only shown initially */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none transition-opacity duration-700"
        id="panorama-hints"
      >
        <p className="text-zinc-500 text-xs mb-1">
          {isZh
            ? "拖拽探索  ·  滚轮缩放  ·  点击金色节点进入详情"
            : "Drag to pan  ·  Scroll to zoom  ·  Click golden nodes to enter"}
        </p>
        <p className="text-zinc-600 text-[10px]">
          {isZh
            ? "连线表示学科间的概念关联"
            : "Lines connect disciplines sharing conceptual bridges"}
        </p>
      </div>

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
                  <span
                    className={`inline-block text-[10px] uppercase tracking-[0.15em] font-medium mb-1.5 px-2 py-0.5 rounded-full ${
                      selectedNodeData.isCore
                        ? "text-[#d4a853] bg-[#d4a853]/10"
                        : "text-zinc-400 bg-white/[0.03]"
                    }`}
                  >
                    {selectedNodeData.isCore
                      ? isZh
                        ? "核心领域"
                        : "Core Domain"
                      : isZh
                        ? "扩展领域"
                        : "Extended Domain"}
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {selectedNodeData.name[isZh ? "zh" : "en"]}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="w-6 h-6 rounded-full bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
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
                  onClick={() =>
                    router.push(`/${locale}/domain/${selectedNodeData.coreSlug}`)
                  }
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
