import type { FaceAssetProps } from "./types";

/**
 * Narrow BotForge face silhouette with additional vertical length.
 */
export function FaceNarrow({ skinColor }: FaceAssetProps) {
  return (
    <path
      d="M218 88C295 88 352 176 352 296C352 420 298 492 218 492C138 492 84 420 84 296C84 176 141 88 218 88Z"
      fill={skinColor}
    />
  );
}
