import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import PanoramaMap from "../PanoramaMap";
import { panoramaNodes } from "@/data/panorama-domains";

// Mock Three.js modules
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="r3f-canvas">{children}</div>
  ),
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({
    camera: {},
    gl: { domElement: document.createElement("canvas") },
    size: { width: 800, height: 560 },
  })),
}));

vi.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  Html: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="html-label">{children}</div>,
  PerspectiveCamera: () => null,
}));

vi.mock("@react-three/postprocessing", () => ({
  EffectComposer: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  Bloom: () => null,
}));

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe("PanoramaMap (3D)", () => {
  it("renders the container and hint overlay", () => {
    const { container } = render(
      <PanoramaMap nodes={panoramaNodes} locale="zh" />,
    );

    // Container with touch-action style
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeTruthy();
    expect(wrapper.style.touchAction).toBe("none");

    // Hint text in Chinese
    expect(wrapper.textContent).toContain("拖拽旋转");
    expect(wrapper.textContent).toContain("连线表示学科间的概念关联");
  });

  it("renders the R3F canvas placeholder", () => {
    const { container } = render(
      <PanoramaMap nodes={panoramaNodes} locale="zh" />,
    );

    expect(
      container.querySelector('[data-testid="r3f-canvas"]'),
    ).toBeTruthy();
  });

  it("renders hints in English for en locale", () => {
    const { container } = render(
      <PanoramaMap nodes={panoramaNodes} locale="en" />,
    );

    expect(container.textContent).toContain("Drag to rotate");
    expect(container.textContent).toContain(
      "Lines connect disciplines",
    );
  });
});
