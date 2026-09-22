import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairWolfCutBack({ hairColor }: HairLayerProps) {
  const { base, shadow } = getHairPalette(hairColor);
  return <g>
    <path fill={shadow} d="M93 199C85 121 146 65 241 65C334 65 402 116 398 198L395 265L412 293L380 286L400 334L366 323L374 362C346 356 326 339 314 319L173 319C159 342 139 356 112 363L118 326L91 337L104 291L79 298L96 263Z" />
    <path fill={base} d="M116 194L151 202C141 234 137 257 141 280L126 271L140 312L122 302L125 333C115 314 115 291 119 270C111 245 111 219 116 194ZM352 202L375 190C383 222 376 250 365 271L372 305L356 297L360 331C344 302 346 278 351 255Z" />
  </g>;
}

export function HairWolfCutFront({ hairColor }: HairLayerProps) {
  const { base, shadow, light } = getHairPalette(hairColor);
  return <g>
    <path fill={base} d="M100 226C87 188 92 151 119 125L109 107L143 104C157 81 184 66 207 73L230 62L249 74C282 61 311 74 330 93L359 95L350 112C381 132 397 171 391 215L376 255L357 216L345 231C325 211 314 188 296 172C280 188 265 200 248 207L252 184L225 207L218 187C196 208 176 216 151 217L132 251L124 223L112 237Z" />
    <path fill={shadow} d="M111 198C156 204 188 174 221 140C210 176 187 204 151 217L132 251L134 223L112 237Z" />
    <path fill={light} d="M124 157C147 105 190 91 226 103C195 113 177 134 160 150ZM258 101C297 96 335 119 351 154C325 133 303 133 281 127Z" />
  </g>;
}

export const hairWolfCut = {
  id: "hair-wolf-cut",
  back: HairWolfCutBack,
  front: HairWolfCutFront,
} satisfies HairAsset;
