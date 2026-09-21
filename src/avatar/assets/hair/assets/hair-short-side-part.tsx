import type { HairAsset, HairLayerProps } from "../types";

export function HairShortSidePartFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 101 207
          C 100 169, 113 136, 139 112
          C 166 88, 203 78, 242 80
          C 285 81, 326 94, 355 119
          C 378 139, 390 165, 390 195
          C 390 201, 390 207, 389 213
          C 368 201, 346 194, 323 191
          C 298 187, 277 188, 256 192
          C 237 196, 218 199, 198 199
          C 182 199, 168 197, 153 193
          C 137 199, 119 204, 101 207
          Z
        "
      />

      <path
        fill="currentColor"
        d="
          M 153 193
          C 169 169, 190 148, 216 134
          C 242 119, 272 111, 304 111
          C 326 111, 345 115, 360 123
          C 337 118, 314 121, 291 130
          C 265 140, 240 155, 218 172
          C 199 186, 180 195, 160 200
          Z
        "
      />
    </g>
  );
}

export const hairShortSidePart = {
  id: "hair-short-side-part",
  front: HairShortSidePartFront,
} satisfies HairAsset;
