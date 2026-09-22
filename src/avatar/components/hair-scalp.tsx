import { useId } from "react";
import type { AvatarAssetProps } from "../asset-registry";
import { FaceSilhouetteMask } from "./face-silhouette-mask";

/** Fill forehead corners under the authored cut, including broad faces. */
export function HairScalp({ config, geometry }: AvatarAssetProps) {
  const id = useId().replace(/:/g, "") + "-scalp";
  return <g data-hair-scalp>
    <defs><FaceSilhouetteMask id={id} faceShape={config.faceShape} geometry={geometry} /></defs>
    <path d={geometry.scalpPath} fill={config.hairColor} mask={`url(#${id})`} />
  </g>;
}
