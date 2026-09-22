import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairLongWavyBack({ hairColor }: HairLayerProps) {
  const { base, shadow } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={shadow} d="M90 193C86 108 151 64 242 63C332 63 400 118 397 199C396 231 403 251 386 275C408 303 393 331 382 344C399 376 379 402 366 414C381 439 354 459 331 440C309 458 289 448 279 433L202 433C183 457 161 450 151 439C124 460 98 441 105 416C79 398 87 369 98 351C78 327 82 302 97 281C77 254 84 225 90 193Z" />
<path fill={base} d="M124 178C103 228 136 245 115 281C101 309 119 330 114 352C105 379 110 401 134 419C119 389 134 374 137 351C142 319 119 308 139 277C159 242 135 220 152 194Z" />
<path fill={base} d="M352 174C388 214 358 244 376 274C395 301 367 323 374 348C383 380 372 406 349 420C365 391 352 375 352 349C350 322 374 304 351 277C332 252 357 219 332 197Z" />
    </g>
  );
}

export function HairLongWavyFront({ hairColor }: HairLayerProps) {
  const { base, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={base} d="M243 78C215 57 177 64 155 86C116 89 91 129 96 171C85 201 92 225 108 247C120 220 139 207 160 200C183 204 208 188 218 169C232 144 238 113 243 78Z" />
<path fill={base} d="M247 78C278 58 311 68 331 90C372 96 397 132 391 173C405 204 394 230 378 250C368 225 350 209 329 201C303 201 282 184 268 160C255 136 251 108 247 78Z" />
<path fill={light} d="M120 168C123 115 160 92 198 98C166 116 156 145 120 168Z" />
<path fill={light} d="M273 101C319 98 355 124 365 168C341 151 325 130 301 125Z" />
    </g>
  );
}

export const hairLongWavy = {
  id: "hair-long-wavy",
  back: HairLongWavyBack,
  front: HairLongWavyFront,
} satisfies HairAsset;
