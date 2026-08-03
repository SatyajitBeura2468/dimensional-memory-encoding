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
