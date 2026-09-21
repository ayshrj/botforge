export interface SvgPoint {
  readonly x: number;
  readonly y: number;
}

/**
 * Feature attachment points in the canonical 512×512 BotForge coordinate space.
 * These are placement anchors only; face, eye, blush, and head-rotation geometry
 * remain owned by the core renderer geometry module.
 */
export const BOTFORGE_FEATURE_ANCHORS = {
  ears: {
    left: { x: 92, y: 292 },
    right: { x: 398, y: 292 },
  },
  earrings: {
    left: { x: 67, y: 318 },
    right: { x: 423, y: 318 },
  },
  headTop: {
    left: { x: 176, y: 144 },
    center: { x: 250, y: 110 },
    right: { x: 324, y: 144 },
  },
  hairAccessory: {
    left: { x: 150, y: 168 },
    right: { x: 342, y: 164 },
  },
  earpiece: {
    left: { x: 76, y: 286 },
    right: { x: 414, y: 286 },
  },
  antenna: { x: 302, y: 114 },
  halo: { x: 250, y: 68 },
} as const satisfies Record<string, SvgPoint | Record<string, SvgPoint>>;
