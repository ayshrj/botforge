import type { FaceAssetProps } from "./types";

/**
 * Soft-square BotForge face silhouette.
 * Keeps broad upper sides and a rounded lower jaw without introducing hard corners.
 */
export function FaceSoftSquare({ skinColor }: FaceAssetProps) {
  return (
    <path
      d="M126 108C78 108 48 145 48 192V360C48 434 104 480 174 480H262C332 480 388 434 388 360V192C388 145 358 108 310 108H126Z"
      fill={skinColor}
    />
  );
}
