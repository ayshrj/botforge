import type { HairAsset, HairLayerProps } from "../types";

export function HairHighPonytailBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 104 194
          C 103 155, 117 123, 142 101
          C 168 78, 203 68, 241 69
          C 282 70, 320 82, 347 104
          C 369 122, 382 145, 387 171

          C 406 158, 426 155, 443 164
          C 463 175, 474 196, 469 218
          C 465 237, 451 251, 433 256
          C 451 270, 459 291, 452 310
          C 445 330, 425 342, 404 338
          C 383 334, 368 316, 369 294
          C 369 277, 378 262, 390 251
          C 378 237, 373 221, 376 204

          C 351 204, 327 200, 304 197
          C 270 193, 239 196, 211 201
          C 169 208, 133 207, 104 202
          Z
        "
      />
    </g>
  );
}

export function HairHighPonytailFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 102 204
          C 100 167, 112 135, 137 111
          C 163 86, 199 75, 240 76
          C 281 77, 320 89, 349 112
          C 372 131, 385 157, 387 187

          C 361 196, 336 198, 312 195
          C 286 192, 263 194, 240 199
          C 214 205, 189 208, 163 208
          C 140 208, 120 206, 102 204
          Z
        "
      />
    </g>
  );
}

export const hairHighPonytail = {
  id: "hair-high-ponytail",
  back: HairHighPonytailBack,
  front: HairHighPonytailFront,
} satisfies HairAsset;
