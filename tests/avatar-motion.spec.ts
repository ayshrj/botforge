import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("blinking uses PNGs and exporting mid-blink retains open capsule eyes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const hero = page.locator(".portrait-artwork");
  const open = hero.getByRole("img", { name: "Avatar preview" });
  const closed = hero.locator(".blink-closed");
  await expect(open).toBeVisible();
  await expect(closed).toHaveCount(1);
  await expect(page.locator("svg[data-botforge-avatar]:not(.avatar-source svg)")).toHaveCount(0);

  // Inspect decoded pixels, rather than just trusting the file extension.
  const point = await hero.locator('[data-avatar-layer="eyes"] rect').first().evaluate((eye) => {
    const head = eye.closest("[data-avatar-head-group]") as SVGGElement;
    const matrix = head.transform.baseVal.consolidate()!.matrix;
    const position = new DOMPoint(
      Number(eye.getAttribute("x")) + Number(eye.getAttribute("width")) / 2,
      Number(eye.getAttribute("y")) + 16,
    ).matrixTransform(matrix);
    return { x: Math.round(position.x), y: Math.round(position.y) };
  });
  const openUrl = (await open.getAttribute("src"))!;
  const closedUrl = (await closed.getAttribute("src"))!;
  const pixelAt = async (src: string) => page.evaluate(async ({ src, point }) => {
    const image = new Image();
    image.src = src;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const context = canvas.getContext("2d")!;
    context.drawImage(image, 0, 0, 512, 512);
    return Array.from(context.getImageData(point.x, point.y, 1, 1).data);
  }, { src, point });
  expect(await pixelAt(openUrl)).toEqual([36, 33, 43, 255]);
  expect(await pixelAt(closedUrl)).not.toEqual([36, 33, 43, 255]);

  await closed.evaluate((image) => {
    const animation = image.getAnimations()[0];
    animation.pause();
    animation.currentTime = 4200;
  });
  await expect(closed).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: "Export", exact: true }).click();
  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "PNG · 512 × 512", exact: true }).click();
  const file = await (await downloaded).path();
  const bytes = await readFile(file!);
  expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(await pixelAt(`data:image/png;base64,${bytes.toString("base64")}`)).toEqual([36, 33, 43, 255]);

  await page.getByRole("button", { name: "Animate preview" }).click();
  await expect(closed).toHaveCount(0);
  await expect(hero).toHaveCSS("animation-name", "none");
});

test("reduced motion suppresses blink frames and breathing", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator(".portrait-artwork");
  await expect(hero.getByRole("img", { name: "Avatar preview" })).toBeVisible();
  await expect(hero.locator(".blink-closed")).toHaveCSS("display", "none");
  await expect(hero).toHaveCSS("animation-name", "none");
});

test("hair families filter the catalog and preserve selections across categories", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Hair", exact: true }).click();
  await page.getByRole("button", { name: "Flowing", exact: true }).click();
  const wolf = page.getByRole("button", { name: "Wolf Cut", exact: true });
  await wolf.click();
  await expect(wolf).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Pixie Sweep", exact: true })).toHaveCount(0);
  await page.getByRole("tab", { name: "Face", exact: true }).click();
  await page.getByRole("tab", { name: "Hair", exact: true }).click();
  await expect(wolf).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "None", exact: true }).click();
  await expect(page.locator(".portrait-artwork [data-avatar-layer='hair-front']")).toBeEmpty();
});
