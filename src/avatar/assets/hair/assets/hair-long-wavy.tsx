import type { HairAsset, HairLayerProps } from "../types";

export function HairLongWavyBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 91 190
          C 91 150, 106 115, 134 90
          C 162 66, 199 56, 241 58
          C 284 59, 326 72, 357 98
          C 384 121, 398 154, 397 194

          C 399 220, 393 242, 381 258
          C 394 277, 392 300, 380 317
          C 393 338, 388 363, 373 378
          C 382 401, 369 423, 350 431
          C 332 439, 315 433, 305 419

          C 295 432, 279 439, 262 435

          L 217 435

          C 201 440, 184 433, 175 420
          C 163 435, 145 441, 127 432
          C 108 423, 97 401, 106 380
          C 90 364, 86 340, 99 320
          C 86 301, 85 278, 98 260
          C 88 239, 87 215, 91 190
          Z
        "
      />
    </g>
  );
}

export function HairLongWavyFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 99 207
          C 96 174, 104 146, 124 122

          C 138 105, 155 95, 174 91
          C 184 78, 199 71, 216 72
          C 229 72, 240 77, 248 86

          C 261 76, 277 72, 293 75
          C 310 78, 323 86, 331 98

          C 347 99, 361 106, 371 118
          C 386 137, 393 162, 391 191
          C 391 200, 390 208, 389 215

          C 366 203, 344 196, 321 193
          C 296 190, 272 192, 248 198
          C 223 204, 198 208, 171 209
          C 144 210, 120 209, 99 207
          Z
        "
      />
    </g>
  );
}

export const hairLongWavy = {
  id: "hair-long-wavy",
  back: HairLongWavyBack,
  front: HairLongWavyFront,
} satisfies HairAsset;
