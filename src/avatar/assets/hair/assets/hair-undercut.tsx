import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairUndercutBack({ hairColor }: HairLayerProps) {
  const { shadow } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={shadow} d="M110 214C98 179 110 143 137 122C167 96 206 90 244 92C325 88 382 130 385 192L382 260L358 239L349 175L142 180L130 254L109 260Z" />
    </g>
  );
}

export function HairUndercutFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={base} d="M114 171C119 123 151 84 194 72C224 64 241 72 257 79C296 54 336 72 357 98L376 128C350 119 331 123 308 140C276 165 245 177 207 176L218 159C181 177 143 185 114 171Z" />
<path fill={shadow} d="M114 171C153 169 185 148 217 133C200 157 180 171 155 179Z" />
<path fill={light} d="M149 132C180 86 221 88 249 103C276 82 305 83 330 98C300 93 279 113 260 128C229 112 195 107 149 132Z" />
<path fill={light} d="M364 180L378 190L376 226L365 216Z" />
    </g>
  );
}

export const hairUndercut = {
  id: "hair-undercut",
  back: HairUndercutBack,
  front: HairUndercutFront,
} satisfies HairAsset;
