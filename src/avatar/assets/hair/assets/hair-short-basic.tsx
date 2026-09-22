import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairShortBasicFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={base} d="M100 214C92 176 105 140 132 113C154 91 182 81 204 84C231 63 268 65 286 79C329 77 370 109 384 143C395 170 395 201 388 227L370 205C345 182 318 174 287 182C252 195 229 208 197 210L206 192C169 211 132 219 100 214Z" />
<path fill={shadow} d="M104 191C139 205 176 187 206 171C230 159 245 157 258 160C241 186 221 201 197 210L206 192C169 211 132 219 100 214Z" />
<path fill={light} d="M133 149C156 106 190 96 220 104C250 84 285 86 314 109C273 98 249 123 222 132C189 143 168 133 133 149Z" />
    </g>
  );
}

export const hairShortBasic = {
  id: "hair-short-basic",
  front: HairShortBasicFront,
} satisfies HairAsset;
