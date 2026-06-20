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
import ArtificialIntelligenceViz from "./ArtificialIntelligenceViz";
import CosmologyViz from "./CosmologyViz";
import PsychologyViz from "./PsychologyViz";
import BiologyViz from "./BiologyViz";
import ComputerScienceViz from "./ComputerScienceViz";

const registry = new Map<string, ComponentType<DomainVizProps>>([
  ["taiji-math", TaijiMathViz],
  ["quantum-entanglement", QuantumEntanglementViz],
  ["symmetry-breaking", SymmetryBreakingViz],
  ["information-theory", InformationTheoryViz],
  ["chaos-fractal", ChaosFractalViz],
  ["systems-science", SystemsScienceViz],
  ["artificial-intelligence", ArtificialIntelligenceViz],
  ["cosmology", CosmologyViz],
  ["psychology", PsychologyViz],
  ["biology", BiologyViz],
  ["computer-science", ComputerScienceViz],
]);

export function getVisualization(
  slug: string
): ComponentType<DomainVizProps> | null {
  return registry.get(slug) ?? null;
}

// ── Comparison (inline) visualizations ──

import TaijiMathComparison from "./TaijiMathComparison";
import QuantumComparison from "./QuantumComparison";
import SymmetryBreakingComparison from "./SymmetryBreakingComparison";
import InformationTheoryComparison from "./InformationTheoryComparison";
import ChaosFractalComparison from "./ChaosFractalComparison";
import SystemsScienceComparison from "./SystemsScienceComparison";
import AIComparison from "./AIComparison";
import CosmologyComparison from "./CosmologyComparison";
import PsychologyComparison from "./PsychologyComparison";
import BiologyComparison from "./BiologyComparison";
import ComputerScienceComparison from "./ComputerScienceComparison";

const comparisonRegistry = new Map<string, ComponentType<DomainVizProps>>([
  ["taiji-math", TaijiMathComparison],
  ["quantum-entanglement", QuantumComparison],
  ["symmetry-breaking", SymmetryBreakingComparison],
  ["information-theory", InformationTheoryComparison],
  ["chaos-fractal", ChaosFractalComparison],
  ["systems-science", SystemsScienceComparison],
  ["artificial-intelligence", AIComparison],
  ["cosmology", CosmologyComparison],
  ["psychology", PsychologyComparison],
  ["biology", BiologyComparison],
  ["computer-science", ComputerScienceComparison],
]);

export function getComparisonVisualization(
  slug: string
): ComponentType<DomainVizProps> | null {
  return comparisonRegistry.get(slug) ?? null;
}
