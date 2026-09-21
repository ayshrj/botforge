import type { HairAsset, HairLayerProps } from "../types";

export function HairThickLocksBack({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 93 190
          C 92 151, 107 116, 134 91
          C 161 67, 198 57, 239 58
          C 282 59, 324 72, 355 98
          C 382 121, 396 154, 395 194

          C 396 225, 392 256, 385 286

          C 394 308, 390 335, 373 349
          C 358 362, 337 360, 325 346

          C 326 369, 312 387, 292 390
          C 274 393, 260 384, 254 368

          C 246 385, 229 394, 211 390
          C 193 386, 183 371, 184 353

          C 174 370, 155 378, 138 371
          C 120 364, 111 344, 117 326

          C 97 320, 85 301, 89 281
          C 92 265, 101 253, 113 245

          C 99 227, 92 208, 93 190
          Z
        "
      />
    </g>
  );
}

export function HairThickLocksFront({ hairColor }: HairLayerProps) {
  return (
    <g color={hairColor}>
      <path
        fill="currentColor"
        d="
          M 99 207
          C 96 174, 105 145, 125 121
          C 140 104, 158 94, 178 91
          C 189 77, 205 70, 222 73
          C 235 66, 250 66, 263 74
          C 279 68, 297 72, 309 83
          C 326 82, 342 91, 350 105
          C 368 109, 381 124, 381 143
          C 392 157, 395 176, 391 195
          C 391 202, 390 209, 388 215

          C 366 203, 343 196, 319 193
          C 293 190, 269 193, 245 199
          C 220 205, 194 209, 168 210
          C 142 211, 119 210, 99 207
          Z
        "
      />
    </g>
  );
}

export const hairThickLocks = {
  id: "hair-thick-locks",
  back: HairThickLocksBack,
  front: HairThickLocksFront,
} satisfies HairAsset;
