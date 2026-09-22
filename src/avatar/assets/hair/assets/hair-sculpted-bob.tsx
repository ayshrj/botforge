import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairSculptedBobBack({ hairColor }: HairLayerProps) {
  const { shadow } = getHairPalette(hairColor);
  return <path fill={shadow} d="M94 186C90 109 149 67 241 67C333 67 396 113 394 191L391 318C356 343 313 345 285 329L199 329C170 347 124 340 95 318Z" />;
}

export function HairSculptedBobFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return <g>
    <path fill={base} d="M236 76C157 71 100 116 98 189L99 316C113 323 129 326 142 326L150 219C194 191 224 145 236 76ZM246 76C329 69 388 120 391 186L389 317C374 325 359 328 344 326L335 219C289 188 257 145 246 76Z" />
    <path fill={light} d="M120 202C120 146 150 111 195 103C167 130 149 177 140 235L134 302L121 298ZM274 104C326 116 361 155 369 211L366 296L355 302L352 224C338 169 312 130 274 104Z" />
    <path fill={shadow} d="M100 304L142 309L142 326C129 326 113 323 99 316ZM344 309L389 304L389 317C374 325 359 328 344 326Z" />
  </g>;
}

export const hairSculptedBob = {
  id: "hair-sculpted-bob",
  back: HairSculptedBobBack,
  front: HairSculptedBobFront,
} satisfies HairAsset;
