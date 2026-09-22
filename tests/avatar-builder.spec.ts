import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem("botforge-test-ready")) return;
    localStorage.clear();
    sessionStorage.setItem("botforge-test-ready", "true");
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Build your bot" })).toBeVisible();
});

test("renders the canonical avatar and persists valid selections", async ({ page }) => {
  const avatar = page.locator("svg[data-botforge-avatar]").first();
  await expect(page.getByRole("img", { name: "Avatar preview" })).toBeVisible();
  await expect(avatar).toBeAttached();
  await expect(avatar.locator('[data-avatar-layer="eyes"] rect')).toHaveCount(2);
  await expect(avatar.locator('[data-avatar-head-group]')).toHaveAttribute("transform", "rotate(8 256 280)");

  await page.getByRole("tab", { name: /pose/i }).click();
  await page.getByRole("button", { name: "Upright" }).click();
  await expect(avatar.locator('[data-avatar-head-group]')).toHaveAttribute("transform", "rotate(0 256 280)");

  await expect.poll(async () => page.evaluate(() => JSON.parse(localStorage.getItem("botforge.avatar.v1") ?? "null")?.avatar?.headPose)).toBe("upright");
  await page.reload();
  await expect(page.getByRole("img", { name: "Avatar preview" })).toBeVisible();
  await expect(page.locator("svg[data-botforge-avatar]").first().locator('[data-avatar-head-group]')).toHaveAttribute("transform", "rotate(0 256 280)");
});

test("face geometry refits features and history restores the prior state", async ({ page }) => {
  const avatar = page.locator("svg[data-botforge-avatar]").first();
  const preview = page.getByRole("img", { name: "Avatar preview" });
  const initialPreviewSource = await preview.getAttribute("src");
  const eyes = avatar.locator('[data-avatar-layer="eyes"] rect');
  const roundLeftX = Number(await eyes.first().getAttribute("x"));

  await page.getByRole("tab", { name: /face/i }).click();
  await page.getByRole("button", { name: "Narrow" }).click();
  await expect.poll(async () => Number(await eyes.first().getAttribute("x"))).not.toBe(roundLeftX);
  await expect
    .poll(async () => preview.getAttribute("src"))
    .not.toBe(initialPreviewSource);
  const narrowLeftX = Number(await eyes.first().getAttribute("x"));
  expect(narrowLeftX).toBeGreaterThan(roundLeftX);

  await page.getByRole("button", { name: "Undo" }).click();
  await expect.poll(async () => Number(await eyes.first().getAttribute("x"))).toBe(roundLeftX);
});

test("randomize keeps a valid serialized config and PNG export downloads", async ({ page }) => {
  await page.getByRole("button", { name: "Randomize" }).click();
  await expect.poll(async () => page.evaluate(() => Boolean(localStorage.getItem("botforge.avatar.v1")))).toBe(true);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("botforge.avatar.v1") ?? "null"));
  expect(stored.version).toBe(1);
  expect(stored.avatar).toMatchObject({
    headPose: expect.any(String),
    faceShape: expect.stringMatching(/^face-/),
    hairStyle: expect.stringMatching(/^hair-/),
    glasses: expect.stringMatching(/^glasses-/),
  });

  await page.getByRole("button", { name: "Export" }).click();
  const pngDownloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "PNG · 512 × 512" }).click();
  const pngDownload = await pngDownloadPromise;
  expect(pngDownload.suggestedFilename()).toMatch(
    /^botforge-avatar-\d{4}-\d{2}-\d{2}-512\.png$/,
  );
});

test("category tabs support arrow-key navigation", async ({ page }) => {
  const faceTab = page.getByRole("tab", { name: /face/i });
  await faceTab.focus();
  await faceTab.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /skin/i })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tab", { name: /skin/i })).toBeFocused();
});

test("every registered visual option renders without breaking the avatar", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "mobile-chrome", "Catalog sweep runs once on desktop.");

  const avatar = page.locator("svg[data-botforge-avatar]").first();
  const categories = ["Pose", "Face", "Hair", "Glasses", "Beard", "Hats", "Ears", "Extras"];

  for (const category of categories) {
    await page.getByRole("tab", { name: category, exact: true }).click();
    const optionButtons = page
      .getByRole("tabpanel")
      .getByRole("group")
      .first()
      .getByRole("button");
    const optionCount = await optionButtons.count();

    for (let index = 0; index < optionCount; index += 1) {
      await optionButtons.nth(index).click();
      await expect(avatar.locator('[data-avatar-layer="eyes"] rect')).toHaveCount(2);
      await expect(avatar.locator('[data-avatar-head-group]')).toBeAttached();
    }
  }
});
