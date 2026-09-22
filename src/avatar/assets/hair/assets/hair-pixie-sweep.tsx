import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairPixieSweepFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return <g>
    <path fill={shadow} d="M103 237C95 193 102 149 134 119C170 84 223 74 271 82C343 89 390 134 388 196L381 256L359 234L356 186L142 187L126 253Z" />
    <path fill={base} d="M99 193C96 147 124 99 168 79C195 64 232 59 258 72L285 61L279 83C316 79 346 99 364 126C334 121 318 136 303 156C277 186 252 209 216 217L224 196C183 218 142 217 108 207Z" />
    <path fill={light} d="M130 153C159 100 215 80 262 99C218 97 193 137 163 146Z" />
    <path fill={shadow} d="M115 197C157 207 206 179 243 157C226 186 205 202 178 211C151 216 128 212 108 207Z" />
  </g>;
}

export const hairPixieSweep = {
  id: "hair-pixie-sweep",
  front: HairPixieSweepFront,
} satisfies HairAsset;
