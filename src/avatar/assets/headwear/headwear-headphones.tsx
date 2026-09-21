import type { HeadwearProps } from "./types";

export function HeadwearHeadphones({
  primaryColor = "currentColor",
  secondaryColor,
  accentColor,
}: HeadwearProps) {
  const secondary = secondaryColor ?? primaryColor;
  const accent = accentColor ?? secondary;

  return (
    <g
      data-asset-id="headwear-headphones"
      aria-hidden="true"
      pointerEvents="none"
    >
      {/*
       * Filled arch instead of a heavy stroked outline.
       * The central portion remains far above the eyes.
       */}
      <path
        fill={primaryColor}
        fillRule="evenodd"
        d="
          M76 249
          C77 129 148 64 244 64
          C340 64 411 129 412 249
          L387 249
          C387 145 327 89 244 89
          C161 89 101 145 101 249
          Z
        "
      />

      {/* Left cup */}
      <rect
        x="62"
        y="230"
        width="58"
        height="126"
        rx="28"
        fill={primaryColor}
      />
      <rect x="76" y="247" width="31" height="92" rx="15.5" fill={secondary} />

      {/* Right cup */}
      <rect
        x="369"
        y="230"
        width="58"
        height="126"
        rx="28"
        fill={primaryColor}
      />
      <rect x="382" y="247" width="31" height="92" rx="15.5" fill={secondary} />

      {/* Tiny flat exterior accents */}
      <circle cx="91" cy="293" r="7" fill={accent} />
      <circle cx="398" cy="293" r="7" fill={accent} />
    </g>
  );
}
