import type { FacialHairLayerProps } from "./types";

export function BeardMedium({ color }: FacialHairLayerProps) {
  return (
    <g fill={color} aria-hidden="true" pointerEvents="none">
      <path
        d="
        M103 314
        C120 332 139 345 160 354
        C180 362 202 367 224 367
        C248 367 271 361 293 350
        C310 341 324 329 335 315
        L336 361
        C336 391 327 420 310 443
        C292 468 264 483 232 487
        C198 490 164 480 140 460
        C115 440 99 410 95 377
        C92 356 94 335 103 314
        Z
      "
      />
    </g>
  );
}
