import type { HeadwearProps } from "./types";

export function HeadwearBeanie({
  primaryColor = "currentColor",
  secondaryColor,
}: HeadwearProps) {
  const secondary = secondaryColor ?? primaryColor;

  return (
    <g data-asset-id="headwear-beanie" aria-hidden="true" pointerEvents="none">
      {/* Dome */}
      <path
        fill={primaryColor}
        d="
          M91 169
          C94 103 151 60 239 58
          C327 56 387 99 394 169
          C326 160 160 160 91 169
          Z
        "
      />

      {/* Folded cuff */}
      <path
        fill={secondary}
        d="
          M86 164
          C158 153 326 153 399 164
          L400 194
          C323 184 164 184 86 195
          Z
        "
      />
    </g>
  );
}
