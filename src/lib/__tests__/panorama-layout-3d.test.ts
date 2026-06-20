import { describe, it, expect } from "vitest";
import { computeLayout3D } from "../panorama-layout-3d";
import type { PanoramaNode } from "@/data/types";

const sampleNodes: PanoramaNode[] = [
  {
    id: "n1",
    name: { zh: "测试1", en: "Test 1" },
    description: { zh: "", en: "" },
    category: "math",
    connections: ["n2"],
    isCore: true,
  },
  {
    id: "n2",
    name: { zh: "测试2", en: "Test 2" },
    description: { zh: "", en: "" },
    category: "physics",
    connections: ["n1"],
    isCore: false,
  },
];

describe("computeLayout3D", () => {
  it("assigns x, y, z to all nodes", () => {
    const result = computeLayout3D(sampleNodes);
    for (const node of result) {
      expect(typeof node.x).toBe("number");
      expect(typeof node.y).toBe("number");
      expect(typeof node.z).toBe("number");
    }
  });

  it("keeps node z within expected bounds", () => {
    const result = computeLayout3D(sampleNodes);
    const coreZ = Math.abs(result.find((n) => n.isCore)!.z);
    const extZ = Math.abs(result.find((n) => !n.isCore)!.z);
    expect(coreZ).toBeLessThanOrEqual(20);
    expect(extZ).toBeLessThanOrEqual(50);
  });

  it("produces deterministic z coordinates (seeded PRNG)", () => {
    const a = computeLayout3D(sampleNodes);
    const b = computeLayout3D(sampleNodes);
    for (let i = 0; i < a.length; i++) {
      // Only z is seeded; x/y come from the 2D force layout which uses Math.random()
      expect(a[i].z).toBe(b[i].z);
    }
  });
});
