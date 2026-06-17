import { describe, it, expect } from "vitest";
import type { LocaleString, DomainContent, PanoramaNode } from "../types";

describe("LocaleString", () => {
  it("requires zh and en string fields", () => {
    const valid: LocaleString = { zh: "测试", en: "test" };
    expect(valid.zh).toBe("测试");
    expect(valid.en).toBe("test");
  });
});

describe("DomainContent", () => {
  it("has all required fields", () => {
    const d: DomainContent = {
      slug: "test",
      order: 1,
      icon: "<svg/>",
      title: { zh: "标题", en: "Title" },
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
      color: "#d4a853",
    };
    expect(d.slug).toBe("test");
  });
});

describe("PanoramaNode", () => {
  it("x and y are optional", () => {
    const node: PanoramaNode = {
      id: "n1",
      name: { zh: "节点", en: "Node" },
      description: { zh: "描述", en: "Desc" },
      category: "physics",
      connections: ["n2"],
      isCore: false,
    };
    expect(node.x).toBeUndefined();
    expect(node.y).toBeUndefined();
  });
});
