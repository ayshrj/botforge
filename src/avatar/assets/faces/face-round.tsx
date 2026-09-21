import type { FaceAssetProps } from "./types";

/**
 * Rounded BotForge face silhouette.
 * Geometry is expressed directly in the shared 512×512 avatar coordinate system.
 * Rotation is intentionally owned by the outer head group.
 */
export function FaceRound({ skinColor }: FaceAssetProps) {
  return (
    <path
      d="M218 104C324 104 406 188 406 294C406 398 331 480 218 480C102 480 30 404 30 294C30 186 112 104 218 104Z"
      fill={skinColor}
    />
  );
}
