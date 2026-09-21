import type { FacialHairLayerProps } from "./types";

export function MoustacheBasic({ color }: FacialHairLayerProps) {
  return (
    <g fill={color} aria-hidden="true" pointerEvents="none">
      <path
        d="
        M165 329
        C182 320 201 317 220 321
        C238 316 258 318 276 327
        C283 331 289 337 293 344
        C284 349 274 352 264 353
        C247 355 231 351 220 344
        C207 352 191 355 175 352
        C164 350 154 346 146 340
        C151 335 157 332 165 329
        Z
      "
      />
    </g>
  );
}
