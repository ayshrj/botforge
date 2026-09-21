import {
  FaceNarrow,
  FaceOval,
  FaceRound,
  FaceSoftSquare,
  FaceWide,
  type FaceAssetDefinition,
  type FaceShapeId,
} from ".";

export const faceAssetRegistry = {
  "face-round": {
    id: "face-round",
    Component: FaceRound,
  },
  "face-oval": {
    id: "face-oval",
    Component: FaceOval,
  },
  "face-wide": {
    id: "face-wide",
    Component: FaceWide,
  },
  "face-narrow": {
    id: "face-narrow",
    Component: FaceNarrow,
  },
  "face-soft-square": {
    id: "face-soft-square",
    Component: FaceSoftSquare,
  },
} satisfies Record<FaceShapeId, FaceAssetDefinition>;

export function getFaceAsset(id: FaceShapeId): FaceAssetDefinition {
  return faceAssetRegistry[id];
}
