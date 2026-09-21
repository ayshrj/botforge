import type { FacialHairLayerProps } from "./types";

export function BeardFull({ color }: FacialHairLayerProps) {
  return (
    <g fill={color} aria-hidden="true" pointerEvents="none">
      <path
        d="
        M94 298
        C109 316 129 333 153 344
        C174 354 198 360 223 361
        C250 361 277 354 299 341
        C320 329 336 314 347 297
        C351 317 353 339 352 362
        C351 401 340 435 317 462
        C294 489 262 504 226 507
        C189 509 153 498 127 475
        C100 452 83 417 79 378
        C76 347 81 320 94 298
        Z
      "
      />
    </g>
  );
}
