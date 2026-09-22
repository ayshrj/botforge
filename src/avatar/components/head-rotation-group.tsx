import type { PropsWithChildren, SVGProps } from "react";
import { getHeadTransform } from "../design-system";
import type { HeadPose } from "../types";

export type HeadRotationGroupProps = PropsWithChildren<
  Omit<SVGProps<SVGGElement>, "children" | "transform"> & { pose: HeadPose }
>;

export function HeadRotationGroup({
  children,
  pose,
  className,
  ...groupProps
}: HeadRotationGroupProps) {
  return (
    <g
      {...groupProps}
      className={["avatar-head-group", className].filter(Boolean).join(" ")}
      data-avatar-head-group
      transform={getHeadTransform(pose)}
    >
      {children}
    </g>
  );
}
