import type { HairAsset, HairLayerProps } from "../types";

export function HairMohawkSoftBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 116 201
          C 113 174, 118 150, 132 130
          C 149 105, 172 91, 199 85

          C 202 67, 211 51, 225 41
          C 238 48, 247 59, 252 73

          C 258 52, 271 35, 287 25
          C 299 38, 306 54, 306 71

          C 318 55, 334 45, 351 43
          C 356 59, 355 75, 348 89

          C 364 98, 376 111, 382 128
          C 391 149, 393 172, 389 196
          L 387 213

          C 364 202, 341 195, 317 192
          C 292 189, 268 193, 244 199
          C 219 205, 193 208, 168 208
          C 146 208, 128 206, 116 201
          Z
        "
      />
    </g>
  );
}

export function HairMohawkSoftFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 133 181
          C 138 154, 150 132, 168 116
          C 185 101, 205 93, 226 91

          C 230 76, 239 64, 251 57
          C 261 67, 268 79, 270 92

          C 281 76, 294 67, 309 65
          C 315 79, 315 92, 310 104

          C 328 106, 344 115, 355 129
          C 366 143, 372 160, 371 178

          C 350 181, 331 185, 313 190
          C 289 196, 267 197, 246 196
          C 220 194, 198 193, 178 190
          C 161 188, 146 185, 133 181
          Z
        "
      />
    </g>
  );
}

export const hairMohawkSoft = {
  id: "hair-mohawk-soft",
  back: HairMohawkSoftBack,
  front: HairMohawkSoftFront,
} satisfies HairAsset;
