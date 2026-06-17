import { describe, it, expect, vi, beforeAll } from "vitest";
import { render } from "@testing-library/react";
import ParticleField from "../ParticleField";

// Mock ResizeObserver (not available in jsdom)
beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// Mock canvas context
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  fillStyle: "",
  canvas: { width: 0, height: 0 },
}));

describe("ParticleField", () => {
  it("renders a wrapper div and a pointer-events-none canvas", () => {
    const { container } = render(<ParticleField />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    const canvas = wrapper.querySelector("canvas");
    expect(canvas).toBeTruthy();
    expect(canvas!.style.pointerEvents).toBe("none");
  });
});
