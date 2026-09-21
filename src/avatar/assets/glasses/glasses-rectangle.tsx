import { createGlassesLayout } from "./layout";
import { DEFAULT_FRAME_STROKE, GlassesBridge, GlassesTemples } from "./shared";
import type { GlassesAssetProps } from "./types";

export function GlassesRectangle({
  frameColor,
  anchors,
  ...groupProps
}: GlassesAssetProps) {
  const layout = createGlassesLayout(anchors, {
    padX: 30,
    padY: 13,
  });

  return (
    <g {...groupProps}>
      <rect
        x={layout.left.x}
        y={layout.left.y}
        width={layout.left.width}
        height={layout.left.height}
        rx={12}
        fill="none"
        stroke={frameColor}
        strokeWidth={DEFAULT_FRAME_STROKE}
      />

      <rect
        x={layout.right.x}
        y={layout.right.y}
        width={layout.right.width}
        height={layout.right.height}
        rx={12}
        fill="none"
        stroke={frameColor}
        strokeWidth={DEFAULT_FRAME_STROKE}
      />

      <GlassesBridge layout={layout} frameColor={frameColor} />
      <GlassesTemples layout={layout} frameColor={frameColor} />
    </g>
  );
}
