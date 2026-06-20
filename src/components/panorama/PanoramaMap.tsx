"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { PanoramaNode } from "@/data/types";
import { computeLayout3D } from "@/lib/panorama-layout-3d";
import { getTourSteps, type TourStep } from "@/lib/tour-steps";
import PanoramaScene from "./PanoramaScene";

interface PanoramaMapProps {
  nodes: PanoramaNode[];
  locale: string;
}

export default function PanoramaMap({ nodes, locale }: PanoramaMapProps) {
  const router = useRouter();
  const t = useTranslations("tour");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const entranceStartRef = useRef<number>(Date.now());

  // Tour state
  const [tourActive, setTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const tourStepsRef = useRef<TourStep[]>(getTourSteps());
  const tourPauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isZh = locale === "zh";

  // Compute 3D layout once on mount (seeded PRNG ensures SSR/CSR match)
  const positionedNodes = useMemo(() => computeLayout3D(nodes), [nodes]);

  // Get the current tour step's node position
  const tourNodePosition = useMemo<[number, number, number] | null>(() => {
    if (!tourActive) return null;
    const step = tourStepsRef.current[tourStepIndex];
    if (!step) return null;
    const node = positionedNodes.find((n) => n.id === step.nodeId);
    if (!node) return null;
    return [node.x ?? 500, node.y ?? 500, node.z ?? 0];
  }, [tourActive, tourStepIndex, positionedNodes]);

  const startTour = useCallback(() => {
    setTourActive(true);
    setTourStepIndex(0);
    setSelectedNodeId(null);
  }, []);

  const exitTour = useCallback(() => {
    if (tourPauseTimerRef.current) {
      clearTimeout(tourPauseTimerRef.current);
      tourPauseTimerRef.current = null;
    }
    setTourActive(false);
    setTourStepIndex(0);
  }, []);

  // Called when camera arrives at a node — pause, then advance
  const handleTourArrived = useCallback(() => {
    const steps = tourStepsRef.current;
    const currentStep = steps[tourStepIndex];
    if (!currentStep) {
      exitTour();
      return;
    }

    // Highlight the current node
    setSelectedNodeId(currentStep.nodeId);

    // Pause at this node, then advance to next
    tourPauseTimerRef.current = setTimeout(() => {
      const nextIndex = tourStepIndex + 1;
      if (nextIndex >= steps.length) {
        // Tour complete
        setSelectedNodeId(null);
        exitTour();
      } else {
        setTourStepIndex(nextIndex);
        // Camera will animate to the new tourNodePosition
      }
    }, currentStep.pauseDuration * 1000);
  }, [tourStepIndex, exitTour]);

  const handleNodeSelect = (id: string | null) => {
    if (tourActive) return; // Disable manual selection during tour
    if (id) {
      const node = positionedNodes.find((n) => n.id === id);
      if (node?.isCore && node.coreSlug) {
        setSelectedNodeId(id);
        setHoveredNodeId(null);
        router.push(`/${locale}/domain/${node.coreSlug}`);
        return;
      }
    }
    setSelectedNodeId(id);
    if (id) setHoveredNodeId(null);
  };

  const selectedNodeData = selectedNodeId
    ? positionedNodes.find((n) => n.id === selectedNodeId)
    : null;

  const currentTourStep = tourActive ? tourStepsRef.current[tourStepIndex] : null;
  const totalTourSteps = tourStepsRef.current.length;

  return (
    <div className="relative w-full" style={{ touchAction: "none" }}>
      {/* Tour caption overlay */}
      {currentTourStep && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-[min(90vw,420px)] pointer-events-none">
          <div className="rounded-2xl p-[1px] bg-amber-400/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="rounded-[calc(1.5rem-1px)] p-4 bg-[#0c0c0f]/95 border border-amber-400/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-amber-400">
                  {t("stepOf", { current: tourStepIndex + 1, total: totalTourSteps })}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {t(currentTourStep.captionKey as any)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tour button (top-right, when not active) */}
      {!tourActive && (
        <button
          onClick={startTour}
          className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-amber-400/20 bg-amber-400/[0.06] text-amber-400 hover:bg-amber-400/[0.12] hover:border-amber-400/40 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="opacity-80">
            <polygon points="2,1 11,6 2,11" />
          </svg>
          {t("startTour")}
        </button>
      )}

      {/* Exit tour button */}
      {tourActive && (
        <button
          onClick={exitTour}
          className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium border border-white/[0.08] bg-[#0c0c0f]/90 text-zinc-400 hover:text-zinc-200 hover:border-white/[0.14] transition-all duration-300 active:scale-[0.97]"
        >
          <span>✕</span>
          {t("exitTour")}
        </button>
      )}

      {/* Instruction overlay (hidden during tour) */}
      {!tourActive && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          id="panorama-hints"
        >
          <p className="text-zinc-500 text-xs mb-1">
            {isZh
              ? "拖拽旋转  ·  滚轮缩放  ·  右键平移  ·  点击金色节点进入详情"
              : "Drag to rotate  ·  Scroll to zoom  ·  Right-drag to pan  ·  Click golden nodes to enter"}
          </p>
          <p className="text-zinc-600 text-[10px]">
            {isZh
              ? "连线表示学科间的概念关联"
              : "Lines connect disciplines sharing conceptual bridges"}
          </p>
        </div>
      )}

      {/* Three.js canvas */}
      <div className="w-full" style={{ height: 560 }}>
        <PanoramaScene
          positionedNodes={positionedNodes}
          hoveredNodeId={hoveredNodeId}
          selectedNodeId={selectedNodeId}
          entranceStartTime={entranceStartRef.current}
          locale={locale}
          tourActive={tourActive}
          tourNodePosition={tourNodePosition}
          onTourComplete={handleTourArrived}
          onNodeHover={setHoveredNodeId}
          onNodeSelect={handleNodeSelect}
        />
      </div>

      {/* Selected node detail panel (hidden during tour) */}
      {selectedNodeData && !tourActive && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[min(90vw,360px)]">
          <div className="rounded-2xl p-[1px] bg-white/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
            <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.05]">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span
                    className={`inline-block text-[10px] uppercase tracking-[0.15em] font-medium mb-1.5 px-2 py-0.5 rounded-full ${
                      selectedNodeData.isCore
                        ? "text-[#38bdf8] bg-[#38bdf8]/10"
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
                  className="w-6 h-6 rounded-full bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0"
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
                    router.push(
                      `/${locale}/domain/${selectedNodeData.coreSlug}`,
                    )
                  }
                  className="w-full py-2 rounded-full text-xs font-medium text-[#38bdf8] border border-[#38bdf8]/20 bg-[#38bdf8]/[0.04] hover:bg-[#38bdf8]/[0.08] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
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
