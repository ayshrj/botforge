import type { FacialHairLayerProps } from "./types";

export function BeardShort({ color }: FacialHairLayerProps) {
  return (
    <g fill={color} aria-hidden="true" pointerEvents="none">
      <path
        d="
        M109 323
        C123 336 139 346 158 353
        C178 361 199 366 221 366
        C247 366 274 358 296 345
        C307 339 317 331 325 322
        L326 359
        C326 387 314 411 293 429
        C272 447 245 456 216 457
        C185 457 157 448 136 431
        C115 414 102 391 100 364
        L100 341
        C102 334 105 328 109 323
        Z
      "
      />
    </g>
  );
}
