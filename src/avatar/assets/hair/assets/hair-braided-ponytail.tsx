import type { HairAsset, HairLayerProps } from "../types";

export function HairBraidedPonytailBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 103 195
          C 101 156, 115 123, 141 100
          C 167 77, 202 67, 241 68
          C 282 69, 321 82, 349 104
          C 370 122, 383 145, 387 171

          C 405 166, 420 172, 428 184
          C 438 199, 434 216, 421 226

          C 437 234, 444 249, 438 263
          C 432 278, 418 286, 403 283

          C 416 294, 419 310, 411 323
          C 402 337, 386 341, 373 334

          C 384 347, 383 363, 373 374
          C 361 386, 343 385, 333 373

          C 323 360, 325 344, 337 333
          C 325 324, 320 309, 326 295
          C 332 282, 345 274, 359 275
          C 346 264, 342 249, 348 236
          C 354 224, 365 217, 378 216

          C 357 207, 334 201, 310 198
          C 281 194, 254 196, 230 201
          C 203 206, 177 209, 153 209
          C 133 209, 116 205, 103 195
          Z
        "
      />
    </g>
  );
}

export function HairBraidedPonytailFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 102 204
          C 100 168, 112 136, 137 111
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

export const hairBraidedPonytail = {
  id: "hair-braided-ponytail",
  back: HairBraidedPonytailBack,
  front: HairBraidedPonytailFront,
} satisfies HairAsset;
