import type { HeadwearProps } from "./types";

export function HeadwearHeadband({
  primaryColor = "currentColor",
  secondaryColor,
}: HeadwearProps) {
  const secondary = secondaryColor ?? primaryColor;

  return (
    <g
      data-asset-id="headwear-headband"
      aria-hidden="true"
      pointerEvents="none"
    >
      <path
        fill={primaryColor}
        d="
          M91 159
          C163 145 323 144 394 158
          L393 185
          C320 173 166 173 92 187
          Z
        "
      />

      {/* Minimal secondary fold */}
      <path
        fill={secondary}
        d="
          M91 178
          C166 165 320 165 393 177
          L393 190
          C320 179 165 179 92 192
          Z
        "
      />
    </g>
  );
}
