import { describe, it, expect } from "vitest";
import { validateDomains, validatePanoramaNodes } from "../check-data";
import type { DomainContent, PanoramaNode } from "@/data/types";

function makeDomain(overrides: Partial<DomainContent> = {}): DomainContent {
  const slug = overrides.slug ?? "test";
  return {
    slug,
    order: overrides.order ?? 1,
    icon: "<svg/>",
    title: { zh: "标题" + slug, en: "Title" + slug },
    tagline: { zh: "简介", en: "Tagline" },
    overview: { zh: "概述", en: "Overview" },
    taijiConnections: [{ point: { zh: "要点", en: "Point" } }],
    keyExamples: [
      {
        title: { zh: "实例", en: "Example" },
        description: { zh: "描述", en: "Desc" },
      },
    ],
    taijiComparison: [
      {
        taijiAspect: { zh: "太极", en: "Taiji" },
        scienceAspect: { zh: "科学", en: "Science" },
      },
    ],
    references: [
      { title: "Ref", url: "https://example.com", type: "article" },
    ],
    color: "#000000",
    ...overrides,
  };
}

describe("validateDomains", () => {
  it("passes for valid data", () => {
    const domains: DomainContent[] = [
      makeDomain({ slug: "a", order: 1 }),
      makeDomain({ slug: "b", order: 2 }),
      makeDomain({ slug: "c", order: 3 }),
      makeDomain({ slug: "d", order: 4 }),
      makeDomain({ slug: "e", order: 5 }),
      makeDomain({ slug: "f", order: 6 }),
    ];
    expect(() => validateDomains(domains)).not.toThrow();
  });

  it("throws if less than 6 domains", () => {
    expect(() => validateDomains([])).toThrow("Expected at least 6 domains");
  });

  it("throws on duplicate order", () => {
    const domains = [
      makeDomain({ slug: "a", order: 1 }),
      makeDomain({ slug: "b", order: 1 }),
      makeDomain({ slug: "c", order: 3 }),
      makeDomain({ slug: "d", order: 4 }),
      makeDomain({ slug: "e", order: 5 }),
      makeDomain({ slug: "f", order: 6 }),
    ];
    expect(() => validateDomains(domains)).toThrow("Duplicate order");
  });

  it("throws on duplicate slug", () => {
    const domains = [
      makeDomain({ slug: "a", order: 1 }),
      makeDomain({ slug: "a", order: 2 }),
      makeDomain({ slug: "c", order: 3 }),
      makeDomain({ slug: "d", order: 4 }),
      makeDomain({ slug: "e", order: 5 }),
      makeDomain({ slug: "f", order: 6 }),
    ];
    expect(() => validateDomains(domains)).toThrow("Duplicate slug");
  });

  it("throws on empty zh field", () => {
    const domains = [
      makeDomain({ slug: "a", order: 1, title: { zh: "", en: "Title" } }),
      makeDomain({ slug: "b", order: 2 }),
      makeDomain({ slug: "c", order: 3 }),
      makeDomain({ slug: "d", order: 4 }),
      makeDomain({ slug: "e", order: 5 }),
      makeDomain({ slug: "f", order: 6 }),
    ];
    expect(() => validateDomains(domains)).toThrow("empty zh");
  });

  it("throws on empty en field", () => {
    const domains = [
      makeDomain({ slug: "a", order: 1, title: { zh: "标题", en: "" } }),
      makeDomain({ slug: "b", order: 2 }),
      makeDomain({ slug: "c", order: 3 }),
      makeDomain({ slug: "d", order: 4 }),
      makeDomain({ slug: "e", order: 5 }),
      makeDomain({ slug: "f", order: 6 }),
    ];
    expect(() => validateDomains(domains)).toThrow("empty en");
  });
});

describe("validatePanoramaNodes", () => {
  it("passes for valid data", () => {
    const nodes: PanoramaNode[] = [
      {
        id: "n1",
        name: { zh: "节点1", en: "Node 1" },
        description: { zh: "描述", en: "Desc" },
        category: "physics",
        connections: ["n2"],
        isCore: true,
      },
      {
        id: "n2",
        name: { zh: "节点2", en: "Node 2" },
        description: { zh: "描述", en: "Desc" },
        category: "math",
        connections: ["n1"],
        isCore: false,
      },
    ];
    expect(() => validatePanoramaNodes(nodes)).not.toThrow();
  });

  it("throws on invalid connection reference", () => {
    const nodes: PanoramaNode[] = [
      {
        id: "n1",
        name: { zh: "节点1", en: "Node 1" },
        description: { zh: "描述", en: "Desc" },
        category: "physics",
        connections: ["n2"],
        isCore: true,
      },
      {
        id: "n2",
        name: { zh: "节点2", en: "Node 2" },
        description: { zh: "描述", en: "Desc" },
        category: "math",
        connections: ["n3"],
        isCore: false,
      },
    ];
    expect(() => validatePanoramaNodes(nodes)).toThrow(
      "references non-existent node"
    );
  });
});
