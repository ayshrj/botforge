import type { FaceShapeId } from "./assets/faces/types";
import type { AvatarConfig, HeadPose } from "./types";

export interface AvatarPoint { readonly x: number; readonly y: number }
export interface AvatarBounds { readonly x: number; readonly y: number; readonly width: number; readonly height: number }

export const AVATAR_DESIGN = {
  canvas: { width: 512, height: 512, viewBox: "0 0 512 512" },
  head: { pivot: { x: 256, y: 280 }, poses: {
    upright: 0, "tilt-left-soft": -8, "tilt-right-soft": 8,
    "tilt-left-strong": -17, "tilt-right-strong": 17,
  } satisfies Record<HeadPose, number> },
  colors: { background: "#E9DFF5", eyes: "#24212B" },
  eyes: { width: 25, height: 65, spacing: 98 },
  // Authored art bounds, not competing placement anchors. All fitting happens below.
  source: {
    hair: { x: 245, y: 80, width: 300 },
    headwear: { x: 244, y: 80, width: 310 },
    beard: { x: 79, y: 298, width: 278, height: 209 },
  },
  faces: {
    "face-round": { source: { x: 30, y: 104, width: 376, height: 376 }, width: 280, height: 294, top: 145, eyeSpread: 1 },
    "face-oval": { source: { x: 58, y: 96, width: 320, height: 392 }, width: 252, height: 310, top: 133, eyeSpread: .94 },
    "face-wide": { source: { x: 22, y: 118, width: 392, height: 348 }, width: 308, height: 278, top: 155, eyeSpread: 1.12 },
    "face-narrow": { source: { x: 84, y: 88, width: 268, height: 404 }, width: 225, height: 316, top: 128, eyeSpread: .88 },
    "face-soft-square": { source: { x: 48, y: 108, width: 340, height: 372 }, width: 278, height: 290, top: 147, eyeSpread: 1.02 },
  } satisfies Record<FaceShapeId, { source: AvatarBounds; width: number; height: number; top: number; eyeSpread: number }>,
} as const;

export function fitBounds(source: AvatarBounds, target: AvatarBounds): string {
  return `translate(${target.x} ${target.y}) scale(${target.width / source.width} ${target.height / source.height}) translate(${-source.x} ${-source.y})`;
}

export function getHeadTransform(pose: HeadPose): string {
  const { pivot, poses } = AVATAR_DESIGN.head;
  return `rotate(${poses[pose]} ${pivot.x} ${pivot.y})`;
}

export function getFaceGeometry(faceShape: FaceShapeId) {
  const spec = AVATAR_DESIGN.faces[faceShape];
  const centerX = AVATAR_DESIGN.head.pivot.x;
  const face = { x: centerX - spec.width / 2, y: spec.top, width: spec.width, height: spec.height };
  const eyeY = spec.top + spec.height * .43;
  const eyeSpacing = AVATAR_DESIGN.eyes.spacing * spec.eyeSpread;
  const eyeWidth = AVATAR_DESIGN.eyes.width * Math.min(1, spec.eyeSpread);
  const eyeHeight = AVATAR_DESIGN.eyes.height;
  const ears = {
    left: { x: face.x + 7, y: eyeY + 15 },
    right: { x: face.x + face.width - 7, y: eyeY + 15 },
  };
  const anchors = {
    faceCenter: { x: centerX, y: face.y + face.height / 2 },
    chin: { x: centerX, y: face.y + face.height },
    eyeLeft: { x: centerX - eyeSpacing / 2, y: eyeY },
    eyeRight: { x: centerX + eyeSpacing / 2, y: eyeY },
    ears,
    earrings: { left: { x: ears.left.x - 10, y: ears.left.y + 28 }, right: { x: ears.right.x + 10, y: ears.right.y + 28 } },
    headTop: { left: { x: centerX - spec.width * .28, y: face.y + 6 }, center: { x: centerX, y: face.y - 22 }, right: { x: centerX + spec.width * .28, y: face.y + 6 } },
    hairAccessory: { left: { x: centerX - spec.width * .31, y: face.y + 40 }, right: { x: centerX + spec.width * .31, y: face.y + 36 } },
    earpiece: ears,
    antenna: { x: centerX + spec.width * .17, y: face.y - 15 },
    halo: { x: centerX, y: face.y - 64 },
    beardTop: { x: centerX, y: eyeY + eyeHeight / 2 + 18 },
    cheeks: { left: { x: centerX - eyeSpacing * .85, y: eyeY + 57 }, right: { x: centerX + eyeSpacing * .85, y: eyeY + 57 } },
  };
  const hairSource = AVATAR_DESIGN.source.hair;
  const headwearSource = AVATAR_DESIGN.source.headwear;
  return {
    face, anchors, eyeWidth, eyeHeight,
    faceTransform: fitBounds(spec.source, face),
    hairTransform: `translate(${centerX} ${face.y - 28}) scale(${spec.width / hairSource.width} .88) translate(${-hairSource.x} ${-hairSource.y})`,
    headwearTransform: `translate(${centerX} ${face.y - 28}) scale(${spec.width / headwearSource.width} .88) translate(${-headwearSource.x} ${-headwearSource.y})`,
    beardTransform: fitBounds(
      AVATAR_DESIGN.source.beard,
      { x: face.x + spec.width * .035, y: anchors.beardTop.y, width: spec.width * .93, height: anchors.chin.y - anchors.beardTop.y + 12 },
    ),
    glasses: {
      leftEye: { cx: anchors.eyeLeft.x, cy: eyeY, width: eyeWidth, height: eyeHeight },
      rightEye: { cx: anchors.eyeRight.x, cy: eyeY, width: eyeWidth, height: eyeHeight },
      faceBounds: { left: face.x, top: face.y, right: face.x + face.width, bottom: face.y + face.height },
    },
  };
}
export type FaceGeometry = ReturnType<typeof getFaceGeometry>;

// Attach jewelry to the selected ear's actual lobe, including fantasy ears.
export function getAccessoryAnchors(config: Readonly<AvatarConfig>, geometry: FaceGeometry) {
  const anchors = geometry.anchors;
  if (config.ears === "ears-cat" || config.ears === "ears-bunny") {
    return { ...anchors, earrings: { left: anchors.headTop.left, right: anchors.headTop.right } };
  }
  const lobe = config.ears === "ears-large" ? 40 : config.ears === "ears-small" ? 23 : 28;
  return { ...anchors, earrings: {
    left: { x: anchors.ears.left.x - 10, y: anchors.ears.left.y + lobe },
    right: { x: anchors.ears.right.x + 10, y: anchors.ears.right.y + lobe },
  } };
}
