import { createGlassesLayout } from "./layout";
import { DEFAULT_FRAME_STROKE, GlassesBridge, GlassesTemples } from "./shared";
import type { GlassesAssetProps } from "./types";

export function GlassesSunglassesSquare({
  frameColor,
  anchors,
  ...groupProps
}: GlassesAssetProps) {
  const layout = createGlassesLayout(anchors, {
    padX: 27,
    padY: 17,
  });

  const leftSize = Math.max(layout.left.width, layout.left.height);

  const rightSize = Math.max(layout.right.width, layout.right.height);

  return (
    <g {...groupProps}>
      <rect
        x={layout.left.cx - leftSize / 2}
        y={layout.left.cy - leftSize / 2}
        width={leftSize}
        height={leftSize}
        rx={13}
        fill={frameColor}
        fillOpacity={0.14}
        stroke={frameColor}
        strokeWidth={DEFAULT_FRAME_STROKE}
      />

      <rect
        x={layout.right.cx - rightSize / 2}
        y={layout.right.cy - rightSize / 2}
        width={rightSize}
        height={rightSize}
        rx={13}
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
