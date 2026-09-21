import type { HairAsset, HairLayerProps } from "../types";

export function HairSlickedBackBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 105 205
          C 100 169, 110 137, 134 113
          C 160 86, 198 74, 241 76

          C 285 77, 329 87, 365 103
          C 384 112, 399 125, 407 143
          C 400 155, 389 165, 376 171

          C 380 185, 382 200, 380 216

          C 354 205, 330 199, 306 197
          C 276 194, 247 197, 220 202
          C 177 210, 139 211, 105 205
          Z
        "
      />
    </g>
  );
}

export function HairSlickedBackFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 118 186
          C 129 153, 151 126, 180 107
          C 210 87, 246 77, 284 79
          C 317 81, 345 91, 365 105

          C 335 101, 305 105, 277 115
          C 250 125, 225 138, 202 151
          C 177 165, 153 178, 128 187

          C 124 188, 121 187, 118 186
          Z
        "
      />
    </g>
  );
}

export const hairSlickedBack = {
  id: "hair-slicked-back",
  back: HairSlickedBackBack,
  front: HairSlickedBackFront,
} satisfies HairAsset;
