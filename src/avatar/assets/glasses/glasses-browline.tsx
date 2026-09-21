import { createGlassesLayout } from "./layout";
import { GlassesBridge, GlassesTemples } from "./shared";
import type { GlassesAssetProps } from "./types";

export function GlassesBrowline({
  frameColor,
  anchors,
  ...groupProps
}: GlassesAssetProps) {
  const layout = createGlassesLayout(anchors, {
    padX: 27,
    padY: 16,
  });

  return (
    <g {...groupProps}>
      <rect
        x={layout.left.x}
        y={layout.left.y}
        width={layout.left.width}
        height={layout.left.height}
        rx={15}
        fill="none"
        stroke={frameColor}
        strokeWidth={5}
      />

      <rect
        x={layout.right.x}
        y={layout.right.y}
        width={layout.right.width}
        height={layout.right.height}
        rx={15}
        fill="none"
        stroke={frameColor}
        strokeWidth={5}
      />

      <path
        d={`M ${layout.left.x + 4} ${layout.left.y + 5}
            Q ${layout.left.cx} ${layout.left.y - 3}
              ${layout.left.right - 4} ${layout.left.y + 5}`}
        fill="none"
        stroke={frameColor}
        strokeWidth={12}
        strokeLinecap="round"
      />

      <path
        d={`M ${layout.right.x + 4} ${layout.right.y + 5}
            Q ${layout.right.cx} ${layout.right.y - 3}
              ${layout.right.right - 4} ${layout.right.y + 5}`}
        fill="none"
        stroke={frameColor}
        strokeWidth={12}
        strokeLinecap="round"
      />

      <GlassesBridge layout={layout} frameColor={frameColor} strokeWidth={7} />

      <GlassesTemples layout={layout} frameColor={frameColor} strokeWidth={9} />
    </g>
  );
}
