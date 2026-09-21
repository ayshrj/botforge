import type { HairAsset, HairLayerProps } from "../types";

export function HairBunBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 103 196
          C 101 157, 115 124, 141 101
          C 167 78, 202 68, 241 69
          C 281 70, 319 82, 347 104
          C 368 121, 381 143, 386 169

          C 399 151, 421 140, 444 143
          C 469 147, 486 166, 487 191
          C 488 215, 472 236, 449 242
          C 427 248, 404 239, 393 219
          C 385 207, 382 195, 384 182

          C 358 200, 331 202, 305 198
          C 272 194, 241 196, 212 201
          C 170 208, 133 207, 103 202
          Z
        "
      />
    </g>
  );
}

export function HairBunFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 101 204
          C 99 168, 111 136, 136 111
          C 162 86, 199 75, 240 76
          C 281 77, 320 89, 349 112
          C 372 131, 384 157, 386 187

          C 362 196, 337 198, 313 195
          C 287 192, 263 194, 240 199
          C 214 205, 189 208, 163 208
          C 140 208, 119 206, 101 204
          Z
        "
      />
    </g>
  );
}

export const hairBun = {
  id: "hair-bun",
  back: HairBunBack,
  front: HairBunFront,
} satisfies HairAsset;
