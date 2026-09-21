import type { HairAsset, HairLayerProps } from "../types";

export function HairTopKnotBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 104 201
          C 101 164, 113 132, 137 108
          C 161 85, 194 74, 231 73

          C 230 62, 234 51, 242 43
          C 251 34, 263 30, 276 32
          C 292 34, 305 43, 311 57
          C 317 71, 314 86, 305 97

          C 326 101, 344 110, 358 123
          C 379 143, 389 168, 389 196
          L 388 213

          C 365 202, 342 195, 318 192
          C 292 189, 268 193, 244 199
          C 218 205, 192 208, 166 208
          C 143 208, 122 206, 104 201
          Z
        "
      />
    </g>
  );
}

export function HairTopKnotFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 103 204
          C 101 169, 112 138, 136 114
          C 160 90, 194 79, 232 79
          C 271 79, 309 90, 338 112
          C 364 132, 379 159, 381 190

          C 358 197, 335 198, 312 195
          C 286 192, 263 194, 240 199
          C 215 205, 190 208, 164 208
          C 141 208, 121 207, 103 204
          Z
        "
      />
    </g>
  );
}

export const hairTopKnot = {
  id: "hair-top-knot",
  back: HairTopKnotBack,
  front: HairTopKnotFront,
} satisfies HairAsset;
