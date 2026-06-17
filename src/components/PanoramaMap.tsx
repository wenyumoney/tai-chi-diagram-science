"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PanoramaNode } from "@/data/types";
import { computeLayout } from "@/lib/panorama-layout";

interface PanoramaMapProps {
  nodes: PanoramaNode[];
  locale: string;
}

export default function PanoramaMap({ nodes, locale }: PanoramaMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const transformRef = useRef({ offsetX: 0, offsetY: 0, scale: 1 });
  const dragRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({ dragging: false, startX: 0, startY: 0, lastX: 0, lastY: 0 });
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);
  const layoutNodesRef = useRef<PanoramaNode[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Compute layout
    const positioned = computeLayout(nodes);
    layoutNodesRef.current = positioned;

    // Center on core cluster
    const coreNodes = positioned.filter((n) => n.isCore);
    if (coreNodes.length > 0) {
      const avgX =
        coreNodes.reduce((s, n) => s + (n.x ?? 500), 0) / coreNodes.length;
      const avgY =
        coreNodes.reduce((s, n) => s + (n.y ?? 500), 0) / coreNodes.length;
      transformRef.current.offsetX = canvas.width / 2 - avgX;
      transformRef.current.offsetY = canvas.height / 2 - avgY;
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const t = transformRef.current;

      ctx!.clearRect(0, 0, w, h);

      const worldToScreen = (wx: number, wy: number) => ({
        sx: wx * t.scale + t.offsetX,
        sy: wy * t.scale + t.offsetY,
      });

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

          ctx!.beginPath();
          ctx!.moveTo(a.sx, a.sy);
          ctx!.lineTo(b.sx, b.sy);
          ctx!.strokeStyle = "#3f3f4650";
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }

      // Draw nodes
      for (const node of positioned) {
        const { sx, sy } = worldToScreen(node.x ?? 0, node.y ?? 0);
        const isCore = node.isCore;
        const isHovered = node.id === hoveredNode;
        const radius = isCore ? (isHovered ? 10 : 8) : isHovered ? 6 : 4;

        // Node circle
        ctx!.beginPath();
        ctx!.arc(sx, sy, radius + 4, 0, Math.PI * 2);

        if (isCore) {
          ctx!.fillStyle = "#d4a85330";
        } else {
          ctx!.fillStyle = "transparent";
        }
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(sx, sy, radius, 0, Math.PI * 2);
        if (isCore) {
          const grad = ctx!.createRadialGradient(sx, sy, 0, sx, sy, radius);
          grad.addColorStop(0, "#d4a853");
          grad.addColorStop(1, "#d4a85300");
          ctx!.fillStyle = grad;
        } else {
          ctx!.fillStyle = isHovered ? "#60a5fa" : "#71717a80";
        }
        ctx!.fill();
        ctx!.strokeStyle = isCore ? "#d4a85360" : "#3f3f4640";
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = Math.min(rect.height, window.innerHeight - 56);
      draw();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    draw();

    return () => ro.disconnect();
  }, [nodes, hoveredNode]);

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
    let minDist = 30 / transformRef.current.scale; // 30px threshold in world coords

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

  function handleMouseDown(e: React.MouseEvent) {
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
    };
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (dragRef.current.dragging) {
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      transformRef.current.offsetX += dx;
      transformRef.current.offsetY += dy;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
    } else {
      const pos = getCanvasPos(e.nativeEvent);
      setHoveredNode(findNearestNode(pos.x, pos.y));
    }
  }

  function handleMouseUp(e: React.MouseEvent) {
    dragRef.current.dragging = false;
    const dx = Math.abs(e.clientX - dragRef.current.startX);
    const dy = Math.abs(e.clientY - dragRef.current.startY);

    // Click (not drag)
    if (dx < 5 && dy < 5) {
      const pos = getCanvasPos(e.nativeEvent);
      const nodeId = findNearestNode(pos.x, pos.y);
      if (nodeId) {
        const node = layoutNodesRef.current.find((n) => n.id === nodeId);
        setSelectedNode(nodeId);
        if (node?.isCore && node.coreSlug) {
          router.push(`/${locale}/domain/${node.coreSlug}`);
        }
      }
    }
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(4, Math.max(0.5, transformRef.current.scale * delta));

    // Zoom toward cursor
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

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      dragRef.current = {
        dragging: true,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        lastX: e.touches[0].clientX,
        lastY: e.touches[0].clientY,
      };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchRef.current = {
        dist: Math.sqrt(dx * dx + dy * dy),
        scale: transformRef.current.scale,
      };
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 1 && dragRef.current.dragging) {
      const dx = e.touches[0].clientX - dragRef.current.lastX;
      const dy = e.touches[0].clientY - dragRef.current.lastY;
      transformRef.current.offsetX += dx;
      transformRef.current.offsetY += dy;
      dragRef.current.lastX = e.touches[0].clientX;
      dragRef.current.lastY = e.touches[0].clientY;
    } else if (e.touches.length === 2 && pinchRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const newScale = Math.min(
        4,
        Math.max(0.5, pinchRef.current.scale * (newDist / pinchRef.current.dist))
      );
      transformRef.current.scale = newScale;
    }
  }

  function handleTouchEnd() {
    dragRef.current.dragging = false;
    pinchRef.current = null;
  }

  const selectedNodeData = selectedNode
    ? layoutNodesRef.current.find((n) => n.id === selectedNode)
    : null;

  return (
    <div className="relative w-full" style={{ touchAction: "none" }}>
      <canvas
        ref={canvasRef}
        className="w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          dragRef.current.dragging = false;
          setHoveredNode(null);
        }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      {/* Tooltip */}
      {selectedNodeData && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#18181b] border border-zinc-700 rounded-xl p-4 max-w-sm z-20">
          <h3 className="text-sm font-semibold text-zinc-200 mb-1">
            {selectedNodeData.name[locale as "zh" | "en"]}
          </h3>
          <p className="text-xs text-zinc-400">
            {selectedNodeData.description[locale as "zh" | "en"]}
          </p>
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 right-2 text-zinc-600 hover:text-zinc-400 text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
