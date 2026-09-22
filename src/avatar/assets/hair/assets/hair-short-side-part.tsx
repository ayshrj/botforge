import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairShortSidePartFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={shadow} d="M103 215C96 158 124 111 171 91C214 73 290 78 335 103C377 126 394 164 389 225L371 208C345 185 319 176 296 174L292 103C239 146 210 185 163 203Z" />
<path fill={base} d="M98 202C91 164 105 128 137 102C171 75 219 64 263 77L292 91C284 125 259 155 220 178C184 200 136 212 98 202Z" />
<path fill={light} d="M127 159C158 111 218 88 265 96C230 102 214 126 184 138C164 146 145 149 127 159Z" />
<path fill={base} d="M307 108C346 115 376 145 378 186C365 161 347 148 313 142Z" />
    </g>
  );
}

export const hairShortSidePart = {
  id: "hair-short-side-part",
  front: HairShortSidePartFront,
} satisfies HairAsset;
