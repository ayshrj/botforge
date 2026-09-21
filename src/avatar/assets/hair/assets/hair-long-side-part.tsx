import type { HairAsset, HairLayerProps } from "../types";

export function HairLongSidePartBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 94 188
          C 94 147, 109 112, 137 88
          C 165 65, 202 55, 243 57
          C 286 58, 328 71, 358 97
          C 384 120, 397 153, 396 193

          L 394 414
          C 378 427, 358 432, 338 424
          C 321 417, 310 402, 307 383

          L 178 383

          C 175 402, 164 417, 147 424
          C 127 432, 107 426, 94 411
          Z
        "
      />
    </g>
  );
}

export function HairLongSidePartFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 100 207
          C 98 169, 111 135, 138 110
          C 167 84, 207 74, 248 77
          C 289 80, 328 93, 356 117
          C 379 136, 391 162, 391 193
          C 391 201, 390 208, 389 214

          C 367 202, 344 195, 320 192
          C 294 189, 271 190, 249 193

          C 222 197, 198 196, 179 190
          C 161 184, 149 174, 143 163

          C 132 183, 117 198, 100 207
          Z
        "
      />

      <path
        fill="currentColor"
        d="
          M 143 163
          C 164 138, 189 120, 219 108
          C 250 96, 283 94, 316 99
          C 334 102, 350 108, 362 117

          C 338 112, 314 114, 292 121
          C 267 129, 243 141, 221 154
          C 198 168, 177 177, 158 178
          Z
        "
      />
    </g>
  );
}

export const hairLongSidePart = {
  id: "hair-long-side-part",
  back: HairLongSidePartBack,
  front: HairLongSidePartFront,
} satisfies HairAsset;
