import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairPompadourBack({ hairColor }: HairLayerProps) {
  const { shadow } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={shadow} d="M101 222C94 171 115 131 151 111C194 88 276 86 326 105C373 123 395 166 387 235L367 217C346 198 319 190 292 190L162 198L124 237Z" />
    </g>
  );
}

export function HairPompadourFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={base} d="M107 176C102 142 117 111 147 96C165 87 185 85 200 92C210 52 244 32 280 35C298 36 311 45 320 53C354 49 382 67 388 95C399 133 370 158 335 166C297 176 266 155 234 160C190 166 154 199 119 197Z" />
<path fill={shadow} d="M119 174C165 180 200 137 237 138C274 138 307 157 342 142C330 168 302 172 273 165C232 150 204 172 169 188C148 198 130 202 119 197Z" />
<path fill={light} d="M153 128C173 106 193 111 215 117C222 84 245 59 275 60C307 60 322 89 351 84C333 108 304 103 279 91C257 99 245 117 238 134C209 122 184 121 153 128Z" />
    </g>
  );
}

export const hairPompadour = {
  id: "hair-pompadour",
  back: HairPompadourBack,
  front: HairPompadourFront,
} satisfies HairAsset;
