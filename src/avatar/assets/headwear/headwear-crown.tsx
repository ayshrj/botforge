import type { HeadwearProps } from "./types";

export function HeadwearCrown({
  primaryColor = "currentColor",
  secondaryColor,
  accentColor,
}: HeadwearProps) {
  const secondary = secondaryColor ?? primaryColor;
  const accent = accentColor ?? secondary;

  return (
    <g data-asset-id="headwear-crown" aria-hidden="true" pointerEvents="none">
      {/* Softened crown silhouette */}
      <path
        fill={primaryColor}
        d="
          M108 171
          C106 151 103 128 101 109
          C100 101 105 99 112 105
          L163 141
          L199 88
          C204 79 210 79 215 89
          L245 145
          L291 92
          C298 84 304 85 308 96
          L333 146
          L382 114
          C391 108 395 112 391 122
          L379 172
          Z
        "
      />

      {/* Base band */}
      <path
        fill={secondary}
        d="
          M108 165
          C174 157 314 157 380 165
          L377 194
          C311 187 176 187 111 195
          Z
        "
      />

      {/* Three minimal flat jewels */}
      <circle cx="174" cy="176" r="6" fill={accent} />
      <circle cx="244" cy="171" r="7" fill={accent} />
      <circle cx="314" cy="176" r="6" fill={accent} />
    </g>
  );
}
