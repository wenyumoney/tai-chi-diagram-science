import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import TaijiDiagram from "../TaijiDiagram";

// Mock GSAP
vi.mock("gsap", () => ({
  default: {
    to: vi.fn(() => ({ repeat: vi.fn(), timeScale: vi.fn() })),
    context: vi.fn((fn: () => void) => {
      fn();
      return { revert: vi.fn(), add: vi.fn() };
    }),
  },
}));

const mockDomains = [
  { slug: "taiji-math", title: { zh: "数学", en: "Math" }, color: "#d4a853" },
  {
    slug: "quantum-entanglement",
    title: { zh: "量子", en: "Quantum" },
    color: "#60a5fa",
  },
  {
    slug: "symmetry-breaking",
    title: { zh: "对称", en: "Symmetry" },
    color: "#a78bfa",
  },
  {
    slug: "information-theory",
    title: { zh: "信息", en: "Info" },
    color: "#34d399",
  },
  {
    slug: "chaos-fractal",
    title: { zh: "混沌", en: "Chaos" },
    color: "#f472b6",
  },
  {
    slug: "systems-science",
    title: { zh: "系统", en: "Systems" },
    color: "#fb923c",
  },
];

describe("TaijiDiagram", () => {
  it("renders 6 orbit buttons", () => {
    const onClick = vi.fn();
    const { container } = render(
      <TaijiDiagram
        domains={mockDomains}
        onSectorClick={onClick}
        locale="zh"
      />
    );
    const buttons = container.querySelectorAll("button[data-slug]");
    expect(buttons.length).toBe(6);
  });

  it("calls onSectorClick when an orbit button is clicked", () => {
    const onClick = vi.fn();
    const { container } = render(
      <TaijiDiagram
        domains={mockDomains}
        onSectorClick={onClick}
        locale="zh"
      />
    );
    const btn = container.querySelector("button[data-slug='taiji-math']")!;
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledWith("taiji-math");
  });
});
