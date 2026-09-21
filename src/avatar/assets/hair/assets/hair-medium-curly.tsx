import type { HairAsset, HairLayerProps } from "../types";

export function HairMediumCurlyBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 91 192
          C 87 169, 92 147, 104 130
          C 102 111, 113 95, 131 89
          C 139 71, 157 61, 176 65
          C 190 51, 211 47, 228 58
          C 245 46, 266 48, 281 61
          C 300 54, 320 61, 330 77
          C 350 76, 367 88, 372 106
          C 390 114, 399 132, 394 150

          C 402 168, 400 190, 391 204
          C 398 222, 393 241, 380 253
          C 390 271, 386 291, 372 304
          C 363 321, 346 329, 328 324
          C 325 344, 309 357, 290 356

          C 273 357, 260 348, 254 335

          L 205 335

          C 198 351, 183 359, 165 356
          C 147 352, 136 340, 136 324
          C 117 328, 99 317, 94 298
          C 79 287, 76 267, 87 251
          C 77 234, 79 212, 91 192
          Z
        "
      />
    </g>
  );
}

export function HairMediumCurlyFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 98 207
          C 94 186, 98 166, 109 151
          C 107 133, 116 118, 132 111
          C 137 94, 151 83, 168 84
          C 178 69, 196 63, 212 70
          C 226 57, 246 57, 260 70
          C 277 62, 296 67, 307 81
          C 325 78, 342 87, 348 103
          C 368 108, 381 124, 380 143
          C 391 156, 395 175, 391 195
          C 391 202, 390 209, 388 215

          C 365 203, 341 196, 318 193
          C 292 190, 268 193, 244 199
          C 219 205, 193 209, 167 210
          C 141 211, 118 210, 98 207
          Z
        "
      />
    </g>
  );
}

export const hairMediumCurly = {
  id: "hair-medium-curly",
  back: HairMediumCurlyBack,
  front: HairMediumCurlyFront,
} satisfies HairAsset;
