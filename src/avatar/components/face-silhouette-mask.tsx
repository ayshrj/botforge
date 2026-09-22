import { getFaceAsset } from "../assets/faces/registry";
import type { FaceShapeId } from "../asset-ids";
import type { FaceGeometry } from "../design-system";

/** Reuse the authored face path, never a rounded-rectangle approximation. */
export function FaceSilhouetteMask({ id, faceShape, geometry }: {
  id: string;
  faceShape: FaceShapeId;
  geometry: FaceGeometry;
}) {
  const Face = getFaceAsset(faceShape).Component;
  return <mask id={id} maskUnits="userSpaceOnUse" {...geometry.face}>
    <g transform={geometry.faceTransform}><Face skinColor="#ffffff" /></g>
  </mask>;
}
