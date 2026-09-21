import { createGlassesLayout } from "./layout";
import { DEFAULT_FRAME_STROKE, GlassesBridge, GlassesTemples } from "./shared";
import type { GlassesAssetProps } from "./types";

export function GlassesRound({
  frameColor,
  anchors,
  ...groupProps
}: GlassesAssetProps) {
  const layout = createGlassesLayout(anchors, {
    padX: 23,
    padY: 16,
  });

  const leftRadius = Math.max(layout.left.width, layout.left.height) / 2;

  const rightRadius = Math.max(layout.right.width, layout.right.height) / 2;

  return (
    <g {...groupProps}>
      <circle
        cx={layout.left.cx}
        cy={layout.left.cy}
        r={leftRadius}
        fill="none"
        stroke={frameColor}
        strokeWidth={DEFAULT_FRAME_STROKE}
      />

      <circle
        cx={layout.right.cx}
        cy={layout.right.cy}
        r={rightRadius}
        fill="none"
        stroke={frameColor}
        strokeWidth={DEFAULT_FRAME_STROKE}
      />

      <GlassesBridge layout={layout} frameColor={frameColor} />
      <GlassesTemples layout={layout} frameColor={frameColor} />
    </g>
  );
}
