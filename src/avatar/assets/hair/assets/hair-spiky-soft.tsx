import type { HairAsset, HairLayerProps } from "../types";

export function HairSpikySoftFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 101 209
          C 98 179, 105 152, 121 130

          C 132 113, 147 102, 164 95
          C 165 78, 172 64, 184 52
          C 198 62, 208 75, 213 89

          C 222 70, 234 55, 249 43
          C 260 57, 267 72, 269 89

          C 282 71, 298 59, 316 52
          C 322 68, 324 82, 322 96

          C 339 84, 356 79, 371 81
          C 372 98, 369 113, 361 127

          C 381 145, 391 169, 391 197
          C 391 204, 390 210, 389 216

          C 365 202, 342 195, 317 192
          C 291 189, 267 193, 243 199
          C 217 206, 191 210, 165 211
          C 141 211, 120 210, 101 209
          Z
        "
      />
    </g>
  );
}

export const hairSpikySoft = {
  id: "hair-spiky-soft",
  front: HairSpikySoftFront,
} satisfies HairAsset;
