import type {
  GlassesAnchors,
  GlassesEyeAnchor,
  GlassesFaceBounds,
} from "./types";

export interface GlassesLensBox {
  cx: number;
  cy: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface GlassesLayout {
  left: GlassesLensBox;
  right: GlassesLensBox;
  faceBounds: GlassesFaceBounds;
  bridgeCenterX: number;
}

export interface GlassesLayoutOptions {
  padX?: number;
  padY?: number;
}

function createLensBox(
  eye: GlassesEyeAnchor,
  padX: number,
  padY: number,
): GlassesLensBox {
  const width = eye.width + padX * 2;
  const height = eye.height + padY * 2;

  const x = eye.cx - width / 2;
  const y = eye.cy - height / 2;

  return {
    cx: eye.cx,
    cy: eye.cy,
    x,
    y,
    right: x + width,
    bottom: y + height,
    width,
    height,
  };
}

export function createGlassesLayout(
  anchors: GlassesAnchors,
  options: GlassesLayoutOptions = {},
): GlassesLayout {
  const padX = options.padX ?? 20;
  const padY = options.padY ?? 15;

  const gap = anchors.rightEye.cx - anchors.leftEye.cx;
  const maxSize = gap - 12;
  const fitEye = (eye: GlassesEyeAnchor) => ({
    ...eye,
    width: Math.min(eye.width, maxSize - padX * 2),
    height: Math.min(eye.height, maxSize - padY * 2),
  });
  const left = createLensBox(fitEye(anchors.leftEye), padX, padY);
  const right = createLensBox(fitEye(anchors.rightEye), padX, padY);

  return {
    left,
    right,
    faceBounds: anchors.faceBounds,
    bridgeCenterX: (anchors.leftEye.cx + anchors.rightEye.cx) / 2,
  };
}
