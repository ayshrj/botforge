import type { HairAsset, HairLayerProps } from "../types";

export function HairShortBasicFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 102 206
          C 100 172, 110 139, 134 116
          C 160 91, 199 79, 239 80
          C 282 80, 325 92, 354 116
          C 377 135, 391 162, 391 193
          C 391 200, 390 207, 389 213
          C 365 201, 342 194, 318 192
          C 294 190, 271 193, 249 199
          C 223 206, 197 210, 171 209
          C 145 209, 122 207, 102 206
          Z
        "
      />
    </g>
  );
}

export const hairShortBasic = {
  id: "hair-short-basic",
  front: HairShortBasicFront,
} satisfies HairAsset;
