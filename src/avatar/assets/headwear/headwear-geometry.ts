/**
 * Headwear-specific values inside BotForge's canonical 512 × 512
 * unrotated head coordinate system.
 *
 * Headwear components are rendered inside the same outer 17° head
 * rotation group as the face, eyes, hair, glasses, etc.
 *
 * They must NOT apply their own 17° transform.
 */
export const HEADWEAR_GEOMETRY = {
  canvasSize: 512,

  /**
   * Common usable upper-head envelope.
   * Cap-style assets intentionally cover this envelope so existing
   * hairstyles do not need hat-specific variants.
   */
  upperHairLeft: 72,
  upperHairRight: 414,
  upperHairTop: 54,

  foreheadTop: 154,
  foreheadBottom: 200,

  /**
   * Central geometry must finish above this line.
   *
   * Lower geometry is allowed only in the peripheral corridors,
   * as used by hoods and headphones.
   */
  eyeSafeTop: 218,

  peripheralLeftMax: 116,
  peripheralRightMin: 364,
} as const;
