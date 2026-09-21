import type { HeadwearProps } from "./types";

export function HeadwearWideBrimHat({
  primaryColor = "currentColor",
  secondaryColor,
}: HeadwearProps) {
  const secondary = secondaryColor ?? primaryColor;

  return (
    <g
      data-asset-id="headwear-wide-brim-hat"
      aria-hidden="true"
      pointerEvents="none"
    >
      {/* Crown */}
      <path
        fill={primaryColor}
        d="
          M135 72
          C187 59 292 59 343 73
          C351 101 357 130 359 162
          C301 154 184 154 125 163
          C127 130 130 101 135 72
          Z
        "
      />

      {/* Hat band */}
      <path
        fill={secondary}
        d="
          M126 145
          C187 137 299 137 358 145
          L360 166
          C300 158 184 158 124 167
          Z
        "
      />

      {/* Wide brim */}
      <path
        fill={primaryColor}
        d="
          M73 163
          C159 149 331 149 410 162
          C437 167 456 177 466 188
          C419 202 345 207 251 205
          C153 204 77 199 27 185
          C39 175 54 168 73 163
          Z
        "
      />
    </g>
  );
}
