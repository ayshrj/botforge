import type { HairAsset, HairLayerProps } from "../types";

export function HairPompadourBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 106 207
          C 101 173, 112 141, 135 118
          C 161 92, 198 80, 239 81
          C 283 81, 324 93, 353 116
          C 378 136, 391 163, 390 196
          L 388 216

          C 366 205, 343 199, 320 196
          C 291 193, 264 195, 239 200
          C 210 206, 183 210, 157 210
          C 138 210, 120 209, 106 207
          Z
        "
      />
    </g>
  );
}

export function HairPompadourFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 126 170
          C 127 143, 138 120, 158 104

          C 177 89, 199 84, 220 87
          C 227 66, 243 52, 264 48
          C 284 45, 303 50, 317 61

          C 335 60, 351 67, 361 80
          C 371 92, 375 108, 371 123

          C 366 141, 352 153, 333 158
          C 308 164, 282 161, 257 158
          C 230 155, 205 157, 182 164
          C 163 170, 145 173, 126 170
          Z
        "
      />
    </g>
  );
}

export const hairPompadour = {
  id: "hair-pompadour",
  back: HairPompadourBack,
  front: HairPompadourFront,
} satisfies HairAsset;
