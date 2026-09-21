import { createGlassesLayout } from "./layout";
import { DEFAULT_FRAME_STROKE, GlassesBridge, GlassesTemples } from "./shared";
import type { GlassesAssetProps } from "./types";

export function GlassesCatEye({
  frameColor,
  anchors,
  ...groupProps
}: GlassesAssetProps) {
  const layout = createGlassesLayout(anchors, {
    padX: 28,
    padY: 16,
  });

  const left = layout.left;
  const right = layout.right;

  const leftPath = [
    `M ${left.x - 13} ${left.y + 3}`,
    `Q ${left.cx} ${left.y - 6} ${left.right} ${left.y + 10}`,
    `Q ${left.right + 5} ${left.cy} ${left.right - 3} ${left.bottom - 9}`,
    `Q ${left.cx} ${left.bottom + 5} ${left.x + 5} ${left.bottom - 7}`,
    `Q ${left.x - 3} ${left.cy} ${left.x - 13} ${left.y + 3}`,
    "Z",
  ].join(" ");

  const rightPath = [
    `M ${right.x} ${right.y + 10}`,
    `Q ${right.cx} ${right.y - 6} ${right.right + 13} ${right.y + 3}`,
    `Q ${right.right + 3} ${right.cy} ${right.right - 5} ${right.bottom - 7}`,
    `Q ${right.cx} ${right.bottom + 5} ${right.x + 3} ${right.bottom - 9}`,
    `Q ${right.x - 5} ${right.cy} ${right.x} ${right.y + 10}`,
    "Z",
  ].join(" ");

  return (
    <g {...groupProps}>
      <path
        d={leftPath}
        fill="none"
        stroke={frameColor}
        strokeWidth={DEFAULT_FRAME_STROKE}
        strokeLinejoin="round"
      />

      <path
        d={rightPath}
        fill="none"
        stroke={frameColor}
        strokeWidth={DEFAULT_FRAME_STROKE}
        strokeLinejoin="round"
      />

      <GlassesBridge layout={layout} frameColor={frameColor} />
      <GlassesTemples layout={layout} frameColor={frameColor} />
    </g>
  );
}
