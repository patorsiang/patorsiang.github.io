import { profile } from "@patorsiang/content";
import { ImageResponse } from "next/og";

import { BRAND_COLORS, MARK_PATH, MARK_STROKE_WIDTH, MARK_VIEW_BOX } from "@/lib/brand";
import { ownerName } from "@/lib/seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/**
 * Rendered by Satori, outside the CSS pipeline: no custom properties, no
 * Tailwind, and no access to the Geist webfont without shipping the file. The
 * colours come from @/lib/brand so they are at least duplicated once rather
 * than reinvented here.
 *
 * SiteMark is not reused for the same reason - Satori takes a restricted
 * subset of SVG and it is safer to inline the path than to rely on a component
 * rendering identically under a different engine.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 86px",
        background: BRAND_COLORS.pageLight,
        fontFamily: "sans-serif",
      }}
    >
      <svg
        viewBox={MARK_VIEW_BOX}
        width={96}
        height={96}
        fill="none"
        stroke={BRAND_COLORS.accentLight}
        strokeWidth={MARK_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={MARK_PATH} />
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: BRAND_COLORS.textStrongLight,
            lineHeight: 1.05,
          }}
        >
          {ownerName}
        </div>
        <div
          style={{
            fontSize: 46,
            color: BRAND_COLORS.textMutedLight,
            lineHeight: 1.2,
          }}
        >
          {profile.role.en}
        </div>
        <div
          style={{
            fontSize: 34,
            color: BRAND_COLORS.textMutedLight,
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          {profile.headline.en}
        </div>
      </div>
    </div>,
    size,
  );
}
