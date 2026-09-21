import type { HairAsset, HairLayerProps } from "../types";

export function HairMediumWavyBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 94 188
          C 94 149, 109 115, 136 91
          C 162 68, 199 58, 240 60
          C 283 61, 325 74, 355 99
          C 382 122, 395 154, 394 194

          C 396 220, 390 238, 378 252
          C 390 270, 388 292, 377 307
          C 367 321, 351 327, 335 324
          C 332 344, 317 357, 299 359

          C 282 361, 268 353, 261 340

          L 204 340

          C 197 355, 181 363, 163 359
          C 146 355, 136 343, 135 327
          C 117 328, 102 319, 94 304
          C 86 288, 87 268, 99 252

          C 91 234, 90 214, 94 188
          Z
        "
      />
    </g>
  );
}

export function HairMediumWavyFront({ hairColor }: HairLayerProps) {
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

export const hairMediumWavy = {
  id: "hair-medium-wavy",
  back: HairMediumWavyBack,
  front: HairMediumWavyFront,
} satisfies HairAsset;
