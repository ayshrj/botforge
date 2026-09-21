import type { HairAsset, HairLayerProps } from "../types";

export function HairAfroBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 82 197
          C 69 181, 67 160, 77 143
          C 70 123, 78 102, 95 91
          C 96 70, 110 53, 130 48
          C 139 29, 159 19, 179 24
          C 194 8, 218 3, 237 14
          C 256 2, 281 6, 296 22
          C 317 15, 340 24, 351 43
          C 372 43, 390 57, 395 77
          C 414 85, 425 105, 421 125
          C 437 140, 440 163, 429 181
          C 437 201, 431 225, 413 238

          C 397 250, 378 251, 363 244
          C 341 231, 319 224, 294 221
          C 268 218, 245 220, 223 225
          C 196 231, 171 234, 145 232
          C 119 231, 97 220, 82 197
          Z
        "
      />
    </g>
  );
}

export function HairAfroFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 93 203
          C 85 185, 88 166, 99 151
          C 95 133, 104 117, 119 109
          C 122 91, 136 79, 153 78
          C 164 63, 182 57, 198 64
          C 213 51, 234 51, 249 64
          C 267 55, 287 60, 299 75
          C 317 72, 334 81, 341 98
          C 359 101, 372 115, 373 133
          C 388 145, 394 164, 390 183
          C 392 194, 391 205, 388 215

          C 365 203, 342 196, 318 193
          C 292 190, 268 193, 244 199
          C 219 205, 193 209, 167 210
          C 139 211, 115 209, 93 203
          Z
        "
      />
    </g>
  );
}

export const hairAfro = {
  id: "hair-afro",
  back: HairAfroBack,
  front: HairAfroFront,
} satisfies HairAsset;
