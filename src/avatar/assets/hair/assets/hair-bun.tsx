import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairBunBack({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={shadow} d="M327 143C338 123 360 112 384 119C396 90 432 84 456 102C483 106 497 134 486 156C502 181 483 209 459 211C445 236 410 234 394 214C374 222 353 207 352 190Z" />
<path fill={base} d="M389 143C390 119 414 105 435 115C465 116 478 140 463 159C475 183 451 203 432 195C407 203 383 180 389 161Z" />
<path fill={light} d="M407 141C414 118 447 125 451 143C431 133 418 147 418 168C407 164 402 153 407 141Z" />
    </g>
  );
}

export function HairBunFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={base} d="M103 220C90 168 118 119 157 94C203 63 263 70 304 90C356 108 384 150 390 204L370 226C352 192 335 179 307 167C270 150 242 151 215 168C183 190 155 219 127 226L136 209Z" />
<path fill={shadow} d="M130 212C177 192 202 143 250 135C291 129 333 146 362 170C305 148 268 161 239 174C195 192 174 221 127 226Z" />
<path fill={light} d="M133 162C150 110 198 90 240 94C267 97 288 112 314 121C254 111 209 105 181 133C164 148 150 157 133 162Z" />
    </g>
  );
}

export const hairBun = {
  id: "hair-bun",
  back: HairBunBack,
  front: HairBunFront,
} satisfies HairAsset;
