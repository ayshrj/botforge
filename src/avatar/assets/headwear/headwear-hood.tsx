import type { HeadwearProps } from "./types";

export function HeadwearHood({
  primaryColor = "currentColor",
  secondaryColor,
}: HeadwearProps) {
  const secondary = secondaryColor ?? primaryColor;

  return (
    <g data-asset-id="headwear-hood" aria-hidden="true" pointerEvents="none">
      {/*
       * One even-odd perimeter shell.
       * The large transparent opening leaves the complete face and both
       * eyes untouched while allowing existing hair to remain visible.
       */}
      <path
        fill={primaryColor}
        fillRule="evenodd"
        d="
          M58 482
          C43 402 40 300 61 202
          C81 112 150 55 241 53
          C333 52 401 111 423 201
          C445 299 441 404 425 482
          Z

          M116 476
          C107 399 106 311 123 225
          C139 145 185 98 243 96
          C302 95 348 143 365 224
          C383 310 381 399 372 476
          Z
        "
      />

      {/* Broad inner edge accents; still outside the eye corridor */}
      <path
        fill={secondary}
        d="
          M104 224
          C114 165 145 117 191 91
          C165 124 145 169 135 227
          C124 292 124 377 131 447
          L105 462
          C95 379 95 296 104 224
          Z
        "
      />

      <path
        fill={secondary}
        d="
          M381 223
          C369 165 339 118 294 92
          C320 126 341 170 352 226
          C365 292 363 378 356 447
          L381 462
          C391 378 391 294 381 223
          Z
        "
      />
    </g>
  );
}
