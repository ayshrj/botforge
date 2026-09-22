import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairShortMessyFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={base} d="M98 218C87 181 99 144 131 120L123 93C150 88 173 93 185 104C195 77 226 62 250 65L248 93C274 66 310 62 334 75L319 101C347 89 372 102 382 122L365 139C391 160 399 188 389 222L362 207L368 222C344 217 323 199 305 185C291 202 272 210 254 215L263 193C235 213 213 221 192 221L199 201C171 217 129 225 98 218Z" />
<path fill={shadow} d="M100 202C139 207 172 183 196 166L192 189C222 180 245 156 264 134C252 169 228 199 192 221L199 201C171 217 129 225 98 218Z" />
<path fill={light} d="M128 155C155 115 179 113 201 125C219 93 244 86 264 97C240 106 225 130 213 147C184 130 158 147 128 155Z" />
<path fill={light} d="M278 134C297 110 324 105 344 117C316 118 304 136 286 152Z" />
    </g>
  );
}

export const hairShortMessy = {
  id: "hair-short-messy",
  front: HairShortMessyFront,
} satisfies HairAsset;
