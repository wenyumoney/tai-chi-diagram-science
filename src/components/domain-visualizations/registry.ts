import type { ComponentType } from "react";

export interface DomainVizProps {
  locale: string;
}

import TaijiMathViz from "./TaijiMathViz";
import QuantumEntanglementViz from "./QuantumEntanglementViz";
import SymmetryBreakingViz from "./SymmetryBreakingViz";
import InformationTheoryViz from "./InformationTheoryViz";
import ChaosFractalViz from "./ChaosFractalViz";
import SystemsScienceViz from "./SystemsScienceViz";

const registry = new Map<string, ComponentType<DomainVizProps>>([
  ["taiji-math", TaijiMathViz],
  ["quantum-entanglement", QuantumEntanglementViz],
  ["symmetry-breaking", SymmetryBreakingViz],
  ["information-theory", InformationTheoryViz],
  ["chaos-fractal", ChaosFractalViz],
  ["systems-science", SystemsScienceViz],
]);

export function getVisualization(
  slug: string
): ComponentType<DomainVizProps> | null {
  return registry.get(slug) ?? null;
}
