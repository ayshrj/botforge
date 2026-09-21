import type { HairAsset, HairLayerProps } from "../types";

export function HairLongStraightBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 94 187
          C 94 147, 109 112, 137 88
          C 165 65, 202 55, 243 57
          C 286 58, 327 71, 357 96
          C 383 119, 397 152, 396 191

          L 394 412
          C 378 425, 357 430, 337 422
          C 320 415, 309 400, 307 381

          L 179 381

          C 176 400, 165 415, 148 422
          C 128 430, 108 424, 94 410
          Z
        "
      />
    </g>
  );
}

export function HairLongStraightFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 100 205
          C 98 168, 110 135, 135 110
          C 162 84, 199 73, 241 74
          C 284 75, 325 88, 355 112
          C 379 132, 392 160, 392 192
          C 392 200, 391 207, 390 214

          C 366 202, 342 195, 317 192
          C 291 189, 266 193, 242 199
          C 216 205, 190 208, 164 208
          C 141 208, 120 207, 100 205
          Z
        "
      />
    </g>
  );
}

export const hairLongStraight = {
  id: "hair-long-straight",
  back: HairLongStraightBack,
  front: HairLongStraightFront,
} satisfies HairAsset;
