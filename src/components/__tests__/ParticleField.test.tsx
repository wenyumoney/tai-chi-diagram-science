import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ParticleField from "../ParticleField";

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
