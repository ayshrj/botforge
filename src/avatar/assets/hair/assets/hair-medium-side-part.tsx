import type { HairAsset, HairLayerProps } from "../types";

export function HairMediumSidePartBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 96 190
          C 96 149, 111 114, 139 91
          C 166 68, 202 58, 242 60
          C 285 61, 326 74, 355 99
          C 381 122, 394 154, 393 193

          L 391 330
          C 376 342, 357 346, 338 339
          C 320 333, 308 319, 305 302

          L 180 306

          C 175 323, 163 336, 146 341
          C 128 346, 110 340, 98 326
          Z
        "
      />
    </g>
  );
}

export function HairMediumSidePartFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 100 207
          C 98 169, 111 135, 138 110
          C 167 84, 207 74, 248 77
          C 289 80, 328 93, 356 117
          C 378 136, 390 162, 390 193
          C 390 201, 390 208, 389 214

          C 367 202, 344 195, 320 192
          C 294 189, 271 190, 249 193

          C 222 196, 199 196, 180 190
          C 162 185, 150 175, 143 164

          C 132 183, 118 198, 100 207
          Z
        "
      />

      <path
        fill="currentColor"
        d="
          M 143 164
          C 163 139, 188 121, 218 109
          C 249 97, 282 94, 315 99
          C 333 102, 349 108, 361 117

          C 337 112, 314 114, 291 121
          C 266 129, 243 141, 221 154
          C 198 168, 177 177, 158 178
          Z
        "
      />
    </g>
  );
}

export const hairMediumSidePart = {
  id: "hair-medium-side-part",
  back: HairMediumSidePartBack,
  front: HairMediumSidePartFront,
} satisfies HairAsset;
