import { ImageResponse } from "next/og";
import { ownerName } from "@/lib/seo";

export const size = {
  width: 1200,
  height: 630,
};

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
          justifyContent: "center",
          gap: 28,
          padding: "72px 86px",
          color: "#f8fafc",
          background: "#101828",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1 }}>{ownerName}</div>
        <div style={{ fontSize: 46, fontWeight: 600, color: "#7dd3fc" }}>Full-Stack Developer</div>
        <div style={{ fontSize: 32, color: "#cbd5e1" }}>
          AI-enabled systems · Secure platforms · Practical web products
        </div>
      </div>
    ),
    size,
  );
}
