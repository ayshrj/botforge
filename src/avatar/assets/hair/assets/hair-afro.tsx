import { getHairPalette } from "../../../color-utils";
import type { HairAsset, HairLayerProps } from "../types";

export function HairAfroBack({ hairColor }: HairLayerProps) {
  const { shadow } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={shadow} d="M78 190C58 172 61 145 77 130C61 106 76 78 97 74C97 49 120 29 145 34C158 10 184 4 205 18C225 0 254 2 269 19C295 5 324 18 330 37C359 26 384 45 386 67C416 69 435 97 422 121C445 139 447 168 429 188C441 216 421 241 396 241C382 268 354 267 333 253L155 251C136 269 105 259 100 239C75 239 61 213 78 190Z" />
    </g>
  );
}

export function HairAfroFront({ hairColor }: HairLayerProps) {
  const { base, light } = getHairPalette(hairColor);
  return (
    <g>
      <path fill={base} d="M95 211C73 191 84 165 102 156C90 132 104 110 127 108C125 81 153 66 174 80C189 54 219 53 237 76C259 55 288 63 297 85C325 71 350 87 353 110C379 107 399 130 388 154C411 172 402 201 383 209C369 233 341 230 330 209C311 227 286 220 275 202C257 224 229 222 217 204C200 228 172 230 156 211C137 230 109 232 95 211Z" />
<path fill={light} d="M116 137C108 113 132 96 149 109C152 85 182 77 197 98C171 93 166 112 164 126C144 115 130 126 116 137Z" />
<path fill={light} d="M222 109C231 81 258 81 269 101C287 96 303 104 308 120C287 109 274 118 265 131C250 113 240 109 222 109Z" />
    </g>
  );
}

export const hairAfro = {
  id: "hair-afro",
  back: HairAfroBack,
  front: HairAfroFront,
} satisfies HairAsset;
