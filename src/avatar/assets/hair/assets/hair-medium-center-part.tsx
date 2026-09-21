import type { HairAsset, HairLayerProps } from "../types";

export function HairMediumCenterPartBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 96 191
          C 96 151, 111 116, 138 92
          C 164 69, 200 58, 240 60
          C 282 61, 323 73, 352 97
          C 379 119, 393 152, 393 191

          L 391 329
          C 375 341, 357 345, 339 339
          C 321 333, 309 320, 306 303

          L 177 303

          C 173 320, 161 333, 145 339
          C 126 345, 109 339, 97 326
          Z
        "
      />
    </g>
  );
}

export function HairMediumCenterPartFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 101 207
          C 99 170, 111 137, 136 112
          C 162 87, 198 76, 235 76

          C 235 102, 229 124, 216 143
          C 202 164, 182 180, 156 191
          C 138 199, 119 204, 101 207
          Z
        "
      />

      <path
        fill="currentColor"
        d="
          M 235 76
          C 276 75, 318 87, 350 110
          C 377 130, 391 159, 391 193
          C 391 201, 390 208, 389 214

          C 370 204, 351 198, 333 194
          C 307 188, 285 178, 268 162
          C 249 145, 239 122, 235 97
          Z
        "
      />
    </g>
  );
}

export const hairMediumCenterPart = {
  id: "hair-medium-center-part",
  back: HairMediumCenterPartBack,
  front: HairMediumCenterPartFront,
} satisfies HairAsset;
