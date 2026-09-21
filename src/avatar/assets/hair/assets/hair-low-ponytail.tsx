import type { HairAsset, HairLayerProps } from "../types";

export function HairLowPonytailBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 96 191
          C 96 151, 111 116, 138 92
          C 165 69, 201 59, 241 60
          C 283 61, 323 74, 352 98
          C 378 120, 392 152, 392 191

          C 393 229, 388 264, 379 296

          C 398 291, 418 296, 432 310
          C 449 327, 454 352, 443 373
          C 432 394, 408 404, 385 396
          C 364 389, 351 369, 354 347
          C 356 333, 363 321, 374 313

          C 355 320, 336 319, 321 310

          L 177 310

          C 173 325, 161 337, 145 342
          C 126 348, 108 341, 97 328
          Z
        "
      />
    </g>
  );
}

export function HairLowPonytailFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 100 205
          C 98 168, 110 136, 135 111
          C 162 85, 199 74, 240 75
          C 283 76, 324 89, 354 113
          C 378 133, 391 160, 391 192
          C 391 200, 390 207, 389 214

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

export const hairLowPonytail = {
  id: "hair-low-ponytail",
  back: HairLowPonytailBack,
  front: HairLowPonytailFront,
} satisfies HairAsset;
