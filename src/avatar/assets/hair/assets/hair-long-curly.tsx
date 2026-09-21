import type { HairAsset, HairLayerProps } from "../types";

export function HairLongCurlyBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 88 192
          C 84 169, 89 147, 101 130
          C 99 111, 110 95, 128 89
          C 136 71, 154 61, 174 65
          C 188 51, 209 47, 227 58
          C 244 46, 265 48, 281 61
          C 300 54, 320 61, 331 77
          C 351 76, 368 88, 373 106
          C 391 114, 400 132, 395 151

          C 404 169, 402 191, 392 205
          C 400 225, 395 245, 382 257
          C 394 276, 390 298, 376 312
          C 389 331, 385 354, 369 368
          C 380 390, 369 413, 350 422
          C 334 430, 318 426, 307 414

          C 297 430, 279 437, 261 432
          C 246 439, 228 438, 214 430
          C 197 439, 178 434, 168 420
          C 155 433, 136 437, 120 426
          C 102 415, 95 393, 105 375

          C 89 360, 84 338, 96 319
          C 80 304, 78 282, 89 264
          C 77 247, 77 224, 88 207
          C 83 203, 83 198, 88 192
          Z
        "
      />
    </g>
  );
}

export function HairLongCurlyFront({ hairColor }: HairLayerProps) {
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

export const hairLongCurly = {
  id: "hair-long-curly",
  back: HairLongCurlyBack,
  front: HairLongCurlyFront,
} satisfies HairAsset;
