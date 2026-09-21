import type { GlassesLayout } from "./layout";

export const DEFAULT_FRAME_STROKE = 8;

interface SharedFrameProps {
  layout: GlassesLayout;
  frameColor: string;
  strokeWidth?: number;
}

export function GlassesBridge({
  layout,
  frameColor,
  strokeWidth = DEFAULT_FRAME_STROKE,
}: SharedFrameProps) {
  const { left, right, bridgeCenterX } = layout;

  const clearance = Math.min(left.height, right.height) * 0.24;

  const leftY = left.cy - clearance;
  const rightY = right.cy - clearance;
  const controlY = Math.min(leftY, rightY) - 10;

  return (
    <path
      d={[
        `M ${left.right} ${leftY}`,
        `Q ${bridgeCenterX} ${controlY} ${right.x} ${rightY}`,
      ].join(" ")}
      fill="none"
      stroke={frameColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function GlassesTemples({
  layout,
  frameColor,
  strokeWidth = DEFAULT_FRAME_STROKE,
}: SharedFrameProps) {
  const { left, right, faceBounds } = layout;

  const leftStartY = left.cy - left.height * 0.18;
  const rightStartY = right.cy - right.height * 0.18;

  const leftEndX = Math.max(faceBounds.left + 10, left.x - 34);
  const rightEndX = Math.min(faceBounds.right - 10, right.right + 34);

  return (
    <>
      <path
        d={`M ${left.x} ${leftStartY} L ${leftEndX} ${leftStartY - 5}`}
        fill="none"
        stroke={frameColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <path
        d={`M ${right.right} ${rightStartY} L ${rightEndX} ${rightStartY - 5}`}
        fill="none"
        stroke={frameColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </>
  );
}
