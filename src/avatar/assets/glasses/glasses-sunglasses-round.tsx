import { createGlassesLayout } from "./layout";
import { DEFAULT_FRAME_STROKE, GlassesBridge, GlassesTemples } from "./shared";
import type { GlassesAssetProps } from "./types";

export function GlassesSunglassesRound({
  frameColor,
  anchors,
  ...groupProps
}: GlassesAssetProps) {
  const layout = createGlassesLayout(anchors, {
    padX: 24,
    padY: 12,
    round: true,
  });

  return (
    <g {...groupProps}>
      <ellipse
        cx={layout.left.cx}
        cy={layout.left.cy}
        rx={layout.left.width / 2}
        ry={layout.left.height / 2}
        fill={frameColor}
        fillOpacity={0.14}
        stroke={frameColor}
        strokeWidth={DEFAULT_FRAME_STROKE}
      />

      <ellipse
        cx={layout.right.cx}
        cy={layout.right.cy}
        rx={layout.right.width / 2}
        ry={layout.right.height / 2}
        fill={frameColor}
        fillOpacity={0.14}
        stroke={frameColor}
        strokeWidth={DEFAULT_FRAME_STROKE}
      />

      <GlassesBridge layout={layout} frameColor={frameColor} />
      <GlassesTemples layout={layout} frameColor={frameColor} />
    </g>
  );
}
