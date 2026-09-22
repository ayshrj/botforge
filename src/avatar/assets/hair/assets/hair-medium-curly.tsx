import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairMediumCurlyBack({ hairColor }: HairLayerProps) {
  const { shadow } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={shadow} d="M93 196C69 174 76 142 92 128C87 99 108 80 132 80C139 54 166 48 187 58C206 39 231 39 251 53C275 38 301 48 311 67C342 56 365 73 369 95C397 98 413 122 401 148C420 176 404 198 393 210C414 233 401 257 384 268C403 297 380 322 358 320C350 342 324 346 306 329L174 328C149 346 122 335 118 316C86 319 71 294 86 270C62 249 72 216 93 196Z" />
    </g>
  );
}

export function HairMediumCurlyFront({ hairColor }: HairLayerProps) {
  const { base, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={base} d="M99 218C79 199 82 178 100 165C90 144 100 121 119 115C113 91 139 76 160 83C177 61 200 62 215 77C232 54 264 57 275 76C299 63 322 73 328 91C354 81 376 101 373 122C399 130 406 154 390 173C404 193 397 215 377 222C359 227 342 217 338 202C320 219 296 214 287 197C269 218 244 215 233 199C217 222 189 223 174 206C155 224 135 222 123 210C117 219 107 224 99 218Z" />
<path fill={light} d="M122 142C112 115 132 99 151 109C159 88 185 85 199 101C179 101 171 113 169 127C147 117 133 124 122 142Z" />
<path fill={light} d="M218 110C224 80 253 76 269 97C286 88 307 95 311 112C290 103 276 113 269 126C254 111 241 102 218 110Z" />
    </g>
  );
}

export const hairMediumCurly = {
  id: "hair-medium-curly",
  back: HairMediumCurlyBack,
  front: HairMediumCurlyFront,
} satisfies HairAsset;
