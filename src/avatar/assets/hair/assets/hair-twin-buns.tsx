import type { HairAsset, HairLayerProps } from "../types";

export function HairTwinBunsBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 110 181
          C 90 174, 77 157, 78 137
          C 79 113, 98 95, 121 94
          C 139 93, 154 102, 163 115

          C 181 87, 209 74, 241 75
          C 272 76, 301 87, 322 108

          C 331 92, 348 82, 367 83
          C 391 84, 410 103, 411 127
          C 412 150, 396 169, 374 174

          C 381 188, 385 203, 383 218

          C 358 207, 334 200, 310 197
          C 281 193, 255 195, 231 200
          C 204 206, 179 209, 154 209
          C 135 209, 119 205, 107 198
          Z
        "
      />
    </g>
  );
}

export function HairTwinBunsFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 103 204
          C 101 169, 112 138, 136 114
          C 161 89, 197 78, 237 78
          C 277 78, 315 90, 344 113
          C 368 132, 381 158, 383 189

          C 359 197, 336 199, 312 196
          C 286 193, 262 195, 239 200
          C 214 205, 189 208, 164 208
          C 141 208, 121 207, 103 204
          Z
        "
      />
    </g>
  );
}

export const hairTwinBuns = {
  id: "hair-twin-buns",
  back: HairTwinBunsBack,
  front: HairTwinBunsFront,
} satisfies HairAsset;
