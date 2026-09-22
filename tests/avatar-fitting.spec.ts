import { expect, test, type Page } from "@playwright/test";
import { getFaceGeometry } from "../src/avatar/design-system";
import { HAIR_STYLE_IDS } from "../src/avatar/assets/hair/types";
import { DEFAULT_AVATAR_CONFIG, type AvatarConfig } from "../src/avatar/types";
import type { FaceShapeId } from "../src/avatar/asset-ids";
import { humanizeAssetId } from "../src/avatar/editor/editor-options";

const faces: FaceShapeId[] = ["face-round", "face-oval", "face-wide", "face-narrow", "face-soft-square"];

async function inspectCoverage(page: Page, configs: AvatarConfig[], kind: "beard" | "hair") {
  await page.goto("/");
  const cases = [];
  for (const config of configs) {
    await page.evaluate(config => localStorage.setItem("botforge.avatar.v1", JSON.stringify({ version: 1, avatar: config })), config);
    await page.reload();
    const geometry = getFaceGeometry(config.faceShape);
    await expect(page.locator(".portrait-style")).toHaveText(humanizeAssetId(config.hairStyle));
    const svg = page.locator(".portrait-artwork svg");
    await expect(svg.locator('[data-avatar-layer="eyes"] rect').first()).toHaveAttribute("x", String(geometry.anchors.eyeLeft.x - geometry.eyeWidth / 2));
    await expect(svg.locator("[data-avatar-head-group]")).toHaveAttribute("transform", "rotate(0 256 280)");
    cases.push({
      label: `${config.faceShape}/${config.hairStyle}/${config.facialHair}`,
      svg: await svg.evaluate(svg => new XMLSerializer().serializeToString(svg)),
      face: geometry.face,
    });
  }
  return page.evaluate(async ({ cases, kind }) => {
    const failures: string[] = [];
    async function pixels(source: string, layers: string[]) {
      const svg = new DOMParser().parseFromString(source, "image/svg+xml").documentElement;
      svg.querySelectorAll("[data-avatar-layer]").forEach(layer => {
        if (!layers.includes(layer.getAttribute("data-avatar-layer")!)) layer.remove();
      });
      const img = new Image();
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 512;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, 512, 512);
      return ctx.getImageData(0, 0, 512, 512).data;
    }
    for (const item of cases) {
      const face = await pixels(item.svg, ["face"]);
      const feature = await pixels(item.svg, kind === "beard" ? ["facial-hair"] : ["hair-back", "hair-front"]);
      const alpha = (data: Uint8ClampedArray, x: number, y: number) => data[(y * 512 + x) * 4 + 3];
      let missing = 0;
      if (kind === "beard") {
        // Every interior jaw pixel must be covered, not only the chin center.
        for (let y = Math.ceil(item.face.y + item.face.height * .9); y < item.face.y + item.face.height - 2; y++) {
          for (let x = 0; x < 512; x++) {
            if (alpha(face, x, y) > 250 && alpha(feature, x, y) < 70) missing++;
          }
        }
        // Coverage may overscan, but must never leak beyond the true face mask.
        let leaks = 0;
        for (let i = 3; i < face.length; i += 4) if (face[i] === 0 && feature[i] > 4) leaks++;
        if (leaks) failures.push(`${item.label}: ${leaks} pixels outside face`);
      } else {
        // The upper forehead perimeter must connect to the cut, on both sides.
        for (let y = Math.ceil(item.face.y + item.face.height * .05); y < item.face.y + item.face.height * .24; y++) {
          const inside = [];
          for (let x = 0; x < 512; x++) if (alpha(face, x, y) > 250) inside.push(x);
          for (const x of [inside[2], inside[inside.length - 3]]) {
            if (x !== undefined && alpha(feature, x, y) < 240) missing++;
          }
        }
      }
      if (missing) failures.push(`${item.label}: ${missing} uncovered pixels`);
    }
    return failures;
  }, { cases, kind });
}

test("full-width beards meet every face's real jaw edge without spilling outside", async ({ page }) => {
  test.setTimeout(90_000);
  const beards = ["beard-stubble", "beard-short", "beard-medium", "beard-full", "beard-moustache-short", "beard-moustache-full"] as const;
  const configs = faces.flatMap(faceShape => beards.map(facialHair => ({
    ...DEFAULT_AVATAR_CONFIG, faceShape, facialHair, hairStyle: "hair-none" as const, headPose: "upright" as const,
  })));
  expect(await inspectCoverage(page, configs, "beard")).toEqual([]);
});

test("every hairstyle covers the soft-square forehead corners", async ({ page }) => {
  test.setTimeout(90_000);
  const configs = HAIR_STYLE_IDS.map(hairStyle => ({
    ...DEFAULT_AVATAR_CONFIG, hairStyle, faceShape: "face-soft-square" as const, headPose: "upright" as const,
  }));
  expect(await inspectCoverage(page, configs, "hair")).toEqual([]);
});

test("none remains bald and scalp coverage stops above both eyes on every face", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Hair", exact: true }).click();
  await page.getByRole("button", { name: "None", exact: true }).click();
  await expect(page.locator(".portrait-artwork [data-hair-scalp]")).toHaveCount(0);
  for (const faceShape of faces) {
    const geometry = getFaceGeometry(faceShape);
    expect(geometry.face.y + geometry.face.height * .28).toBeLessThan(geometry.anchors.eyeLeft.y - geometry.eyeHeight / 2);
  }
});
