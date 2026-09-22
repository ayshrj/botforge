import { expect, test } from "@playwright/test";

import { HEAD_POSES, DEFAULT_AVATAR_CONFIG } from "../src/avatar/types";
import { getFaceGeometry, getHeadTransform } from "../src/avatar/design-system";
import { assetCatalog } from "../src/avatar/renderer-registry";
import { parseAvatarConfig } from "../src/avatar/editor/avatar-storage";

test("registries have unique stable IDs and contain every default", () => {
  for (const registry of Object.values(assetCatalog)) {
    const ids = Object.keys(registry);
    expect(new Set(ids).size).toBe(ids.length);
  }

  expect(assetCatalog.face[DEFAULT_AVATAR_CONFIG.faceShape]).toBeTruthy();
  expect(assetCatalog.hair[DEFAULT_AVATAR_CONFIG.hairStyle]).toBeTruthy();
  expect(DEFAULT_AVATAR_CONFIG.glasses).toBe("glasses-none");
  expect(DEFAULT_AVATAR_CONFIG.facialHair).toBe("facial-hair-none");
  expect(DEFAULT_AVATAR_CONFIG.headwear).toBe("headwear-none");
  expect(assetCatalog.ears[DEFAULT_AVATAR_CONFIG.ears]).toBeTruthy();
  expect(DEFAULT_AVATAR_CONFIG.accessory).toBe("accessory-none");
});

test("configuration validation accepts canonical values and rejects unknown IDs", () => {
  expect(parseAvatarConfig(DEFAULT_AVATAR_CONFIG)).toEqual(DEFAULT_AVATAR_CONFIG);
  expect(parseAvatarConfig({ ...DEFAULT_AVATAR_CONFIG, glasses: "glasses-imaginary" })).toBeNull();
  expect(parseAvatarConfig({ ...DEFAULT_AVATAR_CONFIG, background: "purple" })).toBeNull();
});

test("all poses rotate around one pivot and face shapes produce distinct geometry", () => {
  expect(HEAD_POSES.map(getHeadTransform)).toEqual([
    "rotate(0 256 280)",
    "rotate(-8 256 280)",
    "rotate(8 256 280)",
    "rotate(-17 256 280)",
    "rotate(17 256 280)",
  ]);

  const narrow = getFaceGeometry("face-narrow");
  const wide = getFaceGeometry("face-wide");
  expect(narrow.face.width).toBeLessThan(wide.face.width);
  expect(narrow.anchors.eyeRight.x - narrow.anchors.eyeLeft.x).toBeLessThan(
    wide.anchors.eyeRight.x - wide.anchors.eyeLeft.x,
  );
  expect(narrow.anchors.ears.left.x).toBeGreaterThan(wide.anchors.ears.left.x);
});
