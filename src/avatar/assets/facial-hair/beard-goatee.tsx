import type { FacialHairLayerProps } from "./types";

export function BeardGoatee({ color }: FacialHairLayerProps) {
  return (
    <g fill={color} aria-hidden="true" pointerEvents="none">
      <path
        d="
        M195 361
        C205 365 216 367 226 367
        C238 367 249 365 259 361
        L264 391
        C267 412 260 431 247 444
        C238 453 228 459 217 461
        C205 458 195 452 186 442
        C175 429 170 412 174 393
        L180 363
        C185 363 190 362 195 361
        Z
      "
      />
    </g>
  );
}
