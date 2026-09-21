import type { HairAsset, HairLayerProps } from "../types";

export function HairUndercutBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 102 191
          C 102 158, 115 131, 138 111
          C 163 90, 197 80, 234 81
          C 274 81, 313 91, 343 111
          C 369 129, 386 155, 390 185
          L 390 218
          C 367 207, 345 201, 323 198
          C 288 194, 252 196, 217 202
          C 174 209, 136 207, 102 202
          Z
        "
      />
    </g>
  );
}

export function HairUndercutFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 139 171
          C 147 134, 168 103, 199 86
          C 226 72, 258 68, 289 73
          C 318 77, 343 89, 361 108

          C 337 103, 314 103, 290 108
          C 265 113, 241 123, 218 137
          C 196 150, 174 163, 151 172

          C 147 173, 143 172, 139 171
          Z
        "
      />
    </g>
  );
}

export const hairUndercut = {
  id: "hair-undercut",
  back: HairUndercutBack,
  front: HairUndercutFront,
} satisfies HairAsset;
