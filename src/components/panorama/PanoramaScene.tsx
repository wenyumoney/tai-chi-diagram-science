"use client";

import { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Vector3 } from "three";
import PanoramaStarfield from "./PanoramaStarfield";
import PanoramaConnections from "./PanoramaConnections";
import PanoramaNodes from "./PanoramaNodes";
import type { PositionedNode } from "./types";

interface PanoramaSceneProps {
  positionedNodes: PositionedNode[];
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  entranceStartTime: number;
  locale: string;
  tourActive: boolean;
  tourNodePosition: [number, number, number] | null;
  onTourComplete: () => void;
  onNodeHover: (id: string | null) => void;
  onNodeSelect: (id: string | null) => void;
}

/** Inner component that receives tour props and animates the camera via GSAP */
function TourAnimator({
  tourActive,
  targetPos,
  onArrived,
}: {
  tourActive: boolean;
  targetPos: [number, number, number] | null;
  onArrived: () => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!tourActive || !targetPos) return;

    const controls = controlsRef.current;
    if (!controls) return;

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;

      const tl = gsap.timeline({
        onComplete: () => {
          // Small delay then signal arrival
          setTimeout(onArrived, 300);
        },
      });

      // Animate camera position (offset from the node for a nice viewing angle)
      const camTarget = new Vector3(
        targetPos[0] + 200,
        targetPos[1] + 100,
        targetPos[2] + 400
      );
      const lookTarget = new Vector3(targetPos[0], targetPos[1], targetPos[2]);

      tl.to(
        camera.position,
        {
          x: camTarget.x,
          y: camTarget.y,
          z: camTarget.z,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        controls.target,
        {
          x: lookTarget.x,
          y: lookTarget.y,
          z: lookTarget.z,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0
      );

      // Also update the controls
      controls.update();
    });
  }, [tourActive, targetPos, camera, onArrived]);

  // Expose controls ref to the JSX OrbitControls
  // We handle this by using the controlsRef on the OrbitControls element
  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={200}
      maxDistance={1500}
      maxPolarAngle={Math.PI * 0.75}
      target={[500, 500, 0]}
    />
  );
}

export default function PanoramaScene({
  positionedNodes,
  hoveredNodeId,
  selectedNodeId,
  entranceStartTime,
  locale,
  tourActive,
  tourNodePosition,
  onTourComplete,
  onNodeHover,
  onNodeSelect,
}: PanoramaSceneProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: 3, // ACESFilmicToneMapping — tames neon
      }}
      dpr={[1, 1.5]}
      style={{ background: COLORS_BG }}
      camera={{ position: [500, 500, 800], fov: 50, near: 10, far: 2000 }}
    >
      {/* Controls + Tour animator */}
      <TourAnimator
        tourActive={tourActive}
        targetPos={tourNodePosition}
        onArrived={onTourComplete}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[500, 500, 300]} intensity={0.6} color="#ffffff" />
      <pointLight
        position={[100, 900, -200]}
        intensity={0.3}
        color="#38bdf8"
      />

      {/* Scene content */}
      <PanoramaStarfield />
      <PanoramaConnections
        nodes={positionedNodes}
        hoveredNodeId={hoveredNodeId}
        selectedNodeId={selectedNodeId}
      />
      <PanoramaNodes
        nodes={positionedNodes}
        hoveredNodeId={hoveredNodeId}
        selectedNodeId={selectedNodeId}
        entranceStartTime={entranceStartTime}
        locale={locale}
        onNodeHover={onNodeHover}
        onNodeSelect={onNodeSelect}
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}

const COLORS_BG = "#09090b";
