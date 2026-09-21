import type { PropsWithChildren, SVGProps } from "react";

import { AVATAR_DESIGN } from "../design-system";

export type HeadRotationGroupProps = PropsWithChildren<
  Omit<SVGProps<SVGGElement>, "children" | "transform">
>;

export function HeadRotationGroup({
  children,
  ...groupProps
}: HeadRotationGroupProps) {
  const { pivot, rotationDegrees } = AVATAR_DESIGN.head;

  const transform = `rotate(${rotationDegrees} ${pivot.x} ${pivot.y})`;

  return (
    <g {...groupProps} data-avatar-head-group transform={transform}>
      {children}
    </g>
  );
}
