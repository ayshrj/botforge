import type { HeadwearProps } from "./types";

export function HeadwearBucketHat({
  primaryColor = "currentColor",
  secondaryColor,
}: HeadwearProps) {
  const secondary = secondaryColor ?? primaryColor;

  return (
    <g
      data-asset-id="headwear-bucket-hat"
      aria-hidden="true"
      pointerEvents="none"
    >
      {/* Soft bucket crown */}
      <path
        fill={primaryColor}
        d="
          M119 91
          C176 70 304 69 361 91
          L380 169
          C305 156 174 157 99 170
          Z
        "
      />

      {/* One broad shade panel */}
      <path
        fill={secondary}
        d="
          M259 75
          C304 76 340 81 361 91
          L380 169
          C340 162 300 159 261 158
          Z
        "
      />

      {/* Brim */}
      <path
        fill={primaryColor}
        d="
          M99 163
          C166 152 316 151 382 163
          C405 168 423 179 435 193
          C391 207 326 210 249 208
          C171 207 105 203 57 192
          C68 179 81 169 99 163
          Z
        "
      />
    </g>
  );
}
