import type { HairAsset, HairLayerProps } from "../types";

export function HairMediumStraightBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 97 184
          C 97 145, 112 113, 140 91
          C 168 69, 204 59, 243 61
          C 286 62, 326 75, 354 99
          C 380 121, 393 153, 392 192

          L 390 326
          C 374 339, 354 344, 334 338
          C 320 334, 309 325, 304 312

          L 181 312

          C 175 326, 164 336, 149 340
          C 129 345, 111 337, 99 324
          Z
        "
      />
    </g>
  );
}

export function HairMediumStraightFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 101 204
          C 99 168, 110 137, 134 113
          C 160 87, 198 75, 239 76
          C 282 77, 324 89, 354 113
          C 378 133, 391 160, 391 191
          C 391 199, 390 207, 389 214

          C 365 201, 340 194, 316 192
          C 289 190, 264 194, 240 199
          C 213 205, 188 208, 162 208
          C 139 208, 119 206, 101 204
          Z
        "
      />
    </g>
  );
}

export const hairMediumStraight = {
  id: "hair-medium-straight",
  back: HairMediumStraightBack,
  front: HairMediumStraightFront,
} satisfies HairAsset;
