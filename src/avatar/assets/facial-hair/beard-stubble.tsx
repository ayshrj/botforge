import type { FacialHairLayerProps } from "./types";

export function BeardStubble({ color }: FacialHairLayerProps) {
  return (
    <g fill={color} fillOpacity={0.32} aria-hidden="true" pointerEvents="none">
      <path
        d="
        M118 333
        C136 349 154 360 177 367
        C199 374 226 376 250 371
        C275 366 297 354 315 335
        C320 350 321 367 318 383
        C312 410 291 432 263 443
        C234 455 199 456 168 447
        C138 438 115 420 103 396
        C94 377 96 353 103 339
        C108 337 113 335 118 333
        Z
      "
      />
    </g>
  );
}
