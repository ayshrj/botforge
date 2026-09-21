import type { FacialHairLayerProps } from "./types";

export function MoustacheHandlebarSoft({ color }: FacialHairLayerProps) {
  return (
    <g fill={color} aria-hidden="true" pointerEvents="none">
      <path
        d="
        M143 334
        C155 326 168 321 182 321
        C196 321 209 324 220 330
        C232 323 246 320 260 321
        C277 323 292 330 304 341
        C310 346 317 349 325 349
        C320 359 310 365 298 365
        C282 365 267 358 256 349
        C245 353 233 354 220 348
        C208 354 195 354 183 350
        C170 358 157 362 143 360
        C132 358 123 351 119 341
        C128 341 136 339 143 334
        Z
      "
      />
    </g>
  );
}
