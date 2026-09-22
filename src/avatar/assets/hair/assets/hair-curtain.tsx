import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairCurtainBack({ hairColor }: HairLayerProps) {
  const { shadow } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={shadow} d="M96 199C89 121 146 71 242 69C330 69 397 120 397 200L395 306C382 331 354 340 333 313L150 313C132 339 109 332 94 313Z" />
    </g>
  );
}

export function HairCurtainFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={base} d="M238 76C159 63 96 120 94 190C92 230 100 257 119 276C132 250 144 225 162 208C206 173 230 133 238 76Z" />
<path fill={base} d="M244 76C319 61 389 117 395 187C399 226 390 254 369 277C359 243 345 222 322 203C279 168 253 126 244 76Z" />
<path fill={light} d="M123 209C120 152 157 108 205 103C171 126 153 167 123 209Z" />
<path fill={light} d="M275 104C322 113 354 146 369 204C341 174 319 143 287 131Z" />
<path fill={shadow} d="M223 117C213 158 191 190 162 208C147 222 129 250 119 276L121 244C158 196 193 171 223 117Z" />
    </g>
  );
}

export const hairCurtain = {
  id: "hair-curtain",
  back: HairCurtainBack,
  front: HairCurtainFront,
} satisfies HairAsset;
