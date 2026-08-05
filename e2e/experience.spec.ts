import { expect, test } from "@playwright/test";

test("guided story exposes the scientific controls", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /This box has no brain/i }),
  ).toBeVisible();
  await page.getByRole("link", { name: /Begin the experiment/i }).click();
  await expect(
    page.getByRole("heading", { name: /A memory is a past/i }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: /Right.*Left/i })
    .first()
    .click();
  await page.getByRole("button", { name: /Shuffle locations/i }).click();
  await expect(page.getByText("50.0%", { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("lab controls update and reset the reconstruction", async ({ page }) => {
  await page.goto("/lab");
  await page.getByRole("button", { name: "Interaction pressure" }).click();
  await expect(page.getByText(/Interaction pressure estimates/i)).toBeVisible();
  await page.getByRole("button", { name: /Shuffle cells/i }).click();
  await page.getByRole("button", { name: /Reset to paper preset/i }).click();
  await expect(page.getByText(/History:/i)).toContainText("Left → Right");
});

test("evidence and paper routes refresh directly", async ({ page }) => {
  await page.goto("/evidence");
  await expect(
    page.getByRole("heading", { name: /The claim survives/i }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: /Show accessible table/i }).click();
  await expect(page.getByRole("table").first()).toBeVisible();
  await page.goto("/paper");
  await expect(
    page.getByRole("heading", { name: /Dimensional Memory Encoding/i }),
  ).toBeVisible();
});

test("mobile layout has no horizontal page overflow", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-specific navigation");
  await page.goto("/");
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await page.getByRole("button", { name: /Toggle navigation/i }).click();
  await expect(
    page.getByRole("link", { name: "Lab", exact: true }),
  ).toBeVisible();
});

test("laptop hero keeps the kinetic type and particle instrument in frame", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop viewport regression");
  await page.setViewportSize({ width: 990, height: 620 });
  await page.goto("/");

  const title = await page.locator(".hero h1").boundingBox();
  const instrument = await page.locator(".hero-instrument").boundingBox();
  const protocol = await page.locator(".protocol-switch").boundingBox();
  const scrollCue = await page.locator(".hero-whisper").boundingBox();

  expect(title).not.toBeNull();
  expect(instrument).not.toBeNull();
  expect(protocol).not.toBeNull();
  expect(scrollCue).not.toBeNull();
  expect(title!.x + title!.width).toBeLessThan(instrument!.x);
  expect(protocol!.x).toBeGreaterThanOrEqual(instrument!.x);
  expect(protocol!.x + protocol!.width).toBeLessThanOrEqual(
    instrument!.x + instrument!.width,
  );
  expect(instrument!.y + instrument!.height).toBeLessThanOrEqual(570);
  expect(scrollCue!.y + scrollCue!.height).toBeLessThanOrEqual(620);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(
    await page.locator(".title-line-four").evaluate((element) => {
      const style = getComputedStyle(element);
      return style.overflow === "visible" && style.clipPath.includes("-18%");
    }),
  ).toBe(true);
});

test("every route receives the shared motion system", async ({ page }) => {
  for (const route of ["/", "/lab", "/evidence", "/paper", "/history"]) {
    await page.goto(route);
    const blocks = page.locator(".motion-block");
    expect(await blocks.count()).toBeGreaterThan(0);
    const firstBlock = blocks.first();
    await firstBlock.scrollIntoViewIfNeeded();
    await expect(firstBlock).toHaveClass(/motion-in/);
  }
});

test("paper resources and unknown routes are explicit", async ({ page }) => {
  await page.goto("/paper");
  await expect(page.getByText(/Download exploratory PDF/i)).toBeVisible();
  await expect(page.getByText(/View Version 3 release/i)).toBeVisible();
  await expect(
    page.locator('a[href="https://doi.org/10.5281/zenodo.17943112"]'),
  ).toHaveCount(1);
  expect(await page.title()).toContain("DME Version 3 Paper");
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(
    "https://dimensional-memory-encoding.vercel.app/paper",
  );

  await page.goto("/not-a-real-route");
  await expect(
    page.getByRole("heading", { name: /page not found/i }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Research surfaces").getByRole("link", { name: "Paper" }),
  ).toBeVisible();
  expect(
    await page.locator('meta[name="robots"]').getAttribute("content"),
  ).toBe("noindex,nofollow");
});
