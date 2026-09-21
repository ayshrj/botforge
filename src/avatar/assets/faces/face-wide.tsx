import type { FaceAssetProps } from "./types";

/**
 * Broad BotForge face silhouette with a lower, wider cheek profile.
 */
export function FaceWide({ skinColor }: FaceAssetProps) {
  return (
    <path
      d="M218 118C336 118 414 188 414 292C414 395 337 466 218 466C97 466 22 397 22 292C22 188 98 118 218 118Z"
      fill={skinColor}
    />
  );
}
