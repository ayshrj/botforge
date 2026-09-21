import type { FaceAssetProps } from "./types";

/**
 * Taller, softly tapered BotForge face silhouette.
 * Uses the same center/feature-anchor system as every other face asset.
 */
export function FaceOval({ skinColor }: FaceAssetProps) {
  return (
    <path
      d="M218 96C314 96 378 177 378 292C378 412 318 488 218 488C117 488 58 414 58 292C58 176 123 96 218 96Z"
      fill={skinColor}
    />
  );
}
