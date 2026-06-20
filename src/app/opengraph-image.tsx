import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Taiji Diagram × Modern Science — 3D Universe Map";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #0c0c0f 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Subtle background decoration */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            right: 60,
            bottom: 60,
            borderRadius: "50%",
            border: "1px solid rgba(251, 191, 36, 0.08)",
            background: "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.03) 0%, transparent 70%)",
          }}
        />

        {/* Taiji SVG */}
        <div style={{ display: "flex", marginBottom: 40, opacity: 0.5 }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(251,191,36,0.6)" strokeWidth="1.5" />
            <path
              d="M50,2 A48,48 0 0,1 50,98 A24,24 0 0,1 50,50 A24,24 0 0,0 50,2"
              fill="rgba(251,191,36,0.4)"
            />
            <circle cx="50" cy="26" r="6" fill="rgba(251,191,36,0.8)" />
            <circle cx="50" cy="74" r="6" fill="rgba(9,9,11,0.8)" stroke="rgba(251,191,36,0.4)" strokeWidth="1" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#fbbf24",
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: 16,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Taiji Diagram × Modern Science
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          11 scientific disciplines. 21 interactive 3D nodes. One ancient diagram.
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
