import { vi } from "vitest";

// Mock ResizeObserver
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;

// Mock canvas context — handles both "2d" (old PanoramaMap) and "webgl2" (Three.js)
HTMLCanvasElement.prototype.getContext = vi.fn(
  (contextType: string, _attrs?: unknown) => {
    if (contextType === "webgl2" || contextType === "webgl") {
      return {
        createShader: vi.fn(() => ({})),
        createProgram: vi.fn(() => ({})),
        shaderSource: vi.fn(),
        compileShader: vi.fn(),
        attachShader: vi.fn(),
        linkProgram: vi.fn(),
        useProgram: vi.fn(),
        getShaderParameter: vi.fn(() => true),
        getProgramParameter: vi.fn(() => true),
        getShaderInfoLog: vi.fn(() => ""),
        getProgramInfoLog: vi.fn(() => ""),
        createBuffer: vi.fn(() => ({})),
        bindBuffer: vi.fn(),
        bufferData: vi.fn(),
        getAttribLocation: vi.fn(() => 0),
        getUniformLocation: vi.fn(() => ({})),
        enableVertexAttribArray: vi.fn(),
        vertexAttribPointer: vi.fn(),
        uniformMatrix4fv: vi.fn(),
        uniform1f: vi.fn(),
        uniform2f: vi.fn(),
        uniform3f: vi.fn(),
        uniform4f: vi.fn(),
        viewport: vi.fn(),
        clearColor: vi.fn(),
        clear: vi.fn(),
        enable: vi.fn(),
        disable: vi.fn(),
        blendFunc: vi.fn(),
        drawArrays: vi.fn(),
        drawElements: vi.fn(),
        getExtension: vi.fn(() => ({})),
        getParameter: vi.fn(() => 4096),
        getError: vi.fn(() => 0),
        canvas: { width: 0, height: 0 },
        createTexture: vi.fn(() => ({})),
        bindTexture: vi.fn(),
        texImage2D: vi.fn(),
        texParameteri: vi.fn(),
        activeTexture: vi.fn(),
        createFramebuffer: vi.fn(() => ({})),
        bindFramebuffer: vi.fn(),
        framebufferTexture2D: vi.fn(),
        checkFramebufferStatus: vi.fn(() => 36053),
        createRenderbuffer: vi.fn(() => ({})),
        bindRenderbuffer: vi.fn(),
        renderbufferStorage: vi.fn(),
        framebufferRenderbuffer: vi.fn(),
        scissor: vi.fn(),
        depthMask: vi.fn(),
        colorMask: vi.fn(),
        readPixels: vi.fn(),
        isContextLost: vi.fn(() => false),
        getContextAttributes: vi.fn(() => ({
          alpha: true,
          antialias: true,
          depth: true,
          stencil: false,
        })),
      };
    }
    // Default: 2D context mock
    return {
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      fillStyle: "",
      strokeStyle: "",
      globalAlpha: 1,
      save: vi.fn(),
      restore: vi.fn(),
      createRadialGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
      })),
      canvas: { width: 0, height: 0 },
      font: "",
      textAlign: "",
      textBaseline: "",
      fillText: vi.fn(),
      measureText: vi.fn(() => ({ width: 0 })),
      clip: vi.fn(),
    };
  },
) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// Mock IntersectionObserver
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver;
