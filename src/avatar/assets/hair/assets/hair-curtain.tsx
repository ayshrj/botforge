import type { HairAsset, HairLayerProps } from "../types";

export function HairCurtainBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 97 190
          C 97 150, 112 115, 139 91
          C 166 68, 201 58, 241 60
          C 283 61, 324 74, 353 98
          C 380 120, 394 152, 393 191

          L 390 310
          C 377 324, 360 330, 343 326
          C 327 322, 316 311, 311 296

          L 172 296

          C 168 312, 157 324, 141 329
          C 125 333, 110 326, 99 314
          Z
        "
      />
    </g>
  );
}

export function HairCurtainFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 100 208
          C 98 171, 110 138, 135 113
          C 161 88, 197 76, 234 76

          C 234 104, 226 130, 210 151
          C 195 171, 175 186, 151 197
          C 134 204, 117 207, 100 208
          Z
        "
      />

      <path
        fill="currentColor"
        d="
          M 238 76
          C 278 76, 319 88, 350 111
          C 376 131, 390 159, 391 192
          C 391 200, 390 207, 389 214

          C 370 206, 352 201, 334 197
          C 309 192, 288 182, 271 166
          C 251 148, 240 124, 238 97
          Z
        "
      />
    </g>
  );
}

export const hairCurtain = {
  id: "hair-curtain",
  back: HairCurtainBack,
  front: HairCurtainFront,
} satisfies HairAsset;
