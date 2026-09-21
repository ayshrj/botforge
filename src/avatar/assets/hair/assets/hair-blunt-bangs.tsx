import type { HairAsset, HairLayerProps } from "../types";

export function HairBluntBangsBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 96 190
          C 96 150, 111 115, 138 92
          C 165 69, 201 58, 241 60
          C 284 61, 325 74, 354 99
          C 381 122, 394 154, 393 193

          L 391 329
          C 376 341, 357 345, 339 339
          C 321 333, 309 320, 306 303

          L 178 303

          C 173 321, 161 334, 145 339
          C 126 345, 109 339, 97 326
          Z
        "
      />
    </g>
  );
}

export function HairBluntBangsFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 100 205
          C 98 169, 110 137, 135 112
          C 161 87, 198 75, 239 76
          C 282 76, 323 89, 353 113
          C 377 133, 390 160, 391 191

          L 390 194

          C 365 196, 340 197, 314 198
          C 289 199, 264 200, 239 201
          C 212 202, 186 203, 160 204
          C 138 205, 118 205, 100 205
          Z
        "
      />
    </g>
  );
}

export const hairBluntBangs = {
  id: "hair-blunt-bangs",
  back: HairBluntBangsBack,
  front: HairBluntBangsFront,
} satisfies HairAsset;
