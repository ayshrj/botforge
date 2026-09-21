import type { HairAsset, HairLayerProps } from "../types";

export function HairBuzzFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 105 198
          C 105 163, 119 134, 143 113
          C 168 91, 203 81, 240 82
          C 279 82, 316 93, 344 113
          C 370 132, 385 158, 388 188
          C 389 196, 389 203, 388 209

          C 365 198, 342 191, 318 188
          C 292 185, 267 187, 243 191
          C 216 196, 192 199, 167 199
          C 143 200, 122 199, 105 198
          Z
        "
      />
    </g>
  );
}

export const hairBuzz = {
  id: "hair-buzz",
  front: HairBuzzFront,
} satisfies HairAsset;
