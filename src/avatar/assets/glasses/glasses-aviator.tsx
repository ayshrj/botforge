import { createGlassesLayout } from "./layout";
import { DEFAULT_FRAME_STROKE, GlassesBridge, GlassesTemples } from "./shared";
import type { GlassesAssetProps } from "./types";

export function GlassesAviator({
  frameColor,
  anchors,
  ...groupProps
}: GlassesAssetProps) {
  const layout = createGlassesLayout(anchors, {
    padX: 28,
    padY: 18,
  });

  const left = layout.left;
  const right = layout.right;

  const leftPath = [
    `M ${left.right} ${left.y + 8}`,
    `C ${left.cx + 12} ${left.y - 3}`,
    `${left.x + 2} ${left.y}`,
    `${left.x - 4} ${left.y + 15}`,
    `C ${left.x - 7} ${left.cy + 18}`,
    `${left.cx - 18} ${left.bottom}`,
    `${left.cx} ${left.bottom + 3}`,
    `C ${left.cx + 22} ${left.bottom + 2}`,
    `${left.right + 5} ${left.cy + 16}`,
    `${left.right} ${left.y + 8}`,
    "Z",
  ].join(" ");

  const rightPath = [
    `M ${right.x} ${right.y + 8}`,
    `C ${right.cx - 12} ${right.y - 3}`,
    `${right.right - 2} ${right.y}`,
    `${right.right + 4} ${right.y + 15}`,
    `C ${right.right + 7} ${right.cy + 18}`,
    `${right.cx + 18} ${right.bottom}`,
    `${right.cx} ${right.bottom + 3}`,
    `C ${right.cx - 22} ${right.bottom + 2}`,
    `${right.x - 5} ${right.cy + 16}`,
    `${right.x} ${right.y + 8}`,
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
