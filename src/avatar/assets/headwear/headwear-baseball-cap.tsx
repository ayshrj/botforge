import type { HeadwearProps } from "./types";

export function HeadwearBaseballCap({
  primaryColor = "currentColor",
  secondaryColor,
}: HeadwearProps) {
  const secondary = secondaryColor ?? primaryColor;

  return (
    <g
      data-asset-id="headwear-baseball-cap"
      aria-hidden="true"
      pointerEvents="none"
    >
      {/* Crown */}
      <path
        fill={primaryColor}
        d="
          M82 178
          C88 116 137 72 215 67
          C292 62 354 86 386 137
          C395 151 400 166 401 181
          C327 171 247 169 173 177
          C136 181 105 183 82 178
          Z
        "
      />

      {/* Broad side panel shade */}
      <path
        fill={secondary}
        d="
          M215 67
          C287 63 351 85 386 137
          C391 145 395 154 398 164
          C344 157 293 157 247 161
          C246 121 235 90 215 67
          Z
        "
      />

      {/* Brim */}
      <path
        fill={primaryColor}
        d="
          M170 176
          C234 163 310 163 381 177
          C405 182 422 191 430 200
          C386 207 334 209 279 206
          C230 203 190 195 155 185
          C156 181 162 178 170 176
          Z
        "
      />
    </g>
  );
}
