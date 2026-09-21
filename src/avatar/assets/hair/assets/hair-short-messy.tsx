import type { HairAsset, HairLayerProps } from "../types";

export function HairShortMessyFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 100 210
          C 97 178, 105 150, 123 127

          C 135 111, 149 101, 164 94
          C 170 82, 181 72, 195 67
          C 205 75, 212 84, 215 94

          C 226 76, 241 64, 258 61
          C 267 72, 272 84, 273 96

          C 287 78, 302 70, 318 70
          C 324 81, 327 92, 326 103

          C 340 93, 354 91, 366 96
          C 369 107, 368 118, 364 128

          C 383 147, 392 171, 391 198
          C 391 204, 390 210, 389 216

          C 366 202, 343 194, 319 192
          C 292 189, 268 194, 245 200
          C 218 207, 191 211, 164 211
          C 141 211, 119 210, 100 210
          Z
        "
      />
    </g>
  );
}

export const hairShortMessy = {
  id: "hair-short-messy",
  front: HairShortMessyFront,
} satisfies HairAsset;
