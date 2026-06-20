/**
 * Panorama guided tour — camera animation sequence through core domains.
 * Each step targets a core node in order (Math → Quantum → ... → Computer Science).
 */

export interface TourStep {
  /** Node ID in panorama-domains.ts */
  nodeId: string;
  /** i18n message key for the caption text */
  captionKey: string;
  /** Pause duration at this node in seconds */
  pauseDuration: number;
}

// Tour path: 6 core domains in narrative order
export function getTourSteps(): TourStep[] {
  return [
    {
      nodeId: "core-math",
      captionKey: "stepMath",
      pauseDuration: 5,
    },
    {
      nodeId: "core-quantum",
      captionKey: "stepQuantum",
      pauseDuration: 5,
    },
    {
      nodeId: "core-symmetry",
      captionKey: "stepSymmetry",
      pauseDuration: 5,
    },
    {
      nodeId: "core-info",
      captionKey: "stepInfo",
      pauseDuration: 5,
    },
    {
      nodeId: "core-chaos",
      captionKey: "stepChaos",
      pauseDuration: 5,
    },
    {
      nodeId: "core-systems",
      captionKey: "stepSystems",
      pauseDuration: 5,
    },
  ];
}
