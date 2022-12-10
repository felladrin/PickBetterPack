import { expect, test } from "@playwright/test";

test("similar packages", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.locator("[data-test-id=package-json-textarea]").fill(
    JSON.stringify(
      {
        name: "my-awesome-package",
        version: "1.0.0",
        dependencies: {
          npm: "^8.1.2",
        },
      },
      null,
      2
    )
  );
  await page.locator("[data-shepherd-step-id='package-json-textarea'] .shepherd-footer .shepherd-button").click();
  await page.locator("strong", { hasText: "npm" }).first().waitFor();
  await page.locator("[data-test-id=package-details]").first().click();
  await page
    .locator("[data-test-id=package-details]")
    .first()
    .locator("img")
    .last()
    .waitFor({ state: "visible" });
  expect(
    await page
      .locator("[data-test-id=package-details]")
      .first()
      .locator("img")
      .count()
  ).toBe(5);
  await page.waitForFunction(
    () =>
      document.querySelectorAll("[data-test-id=package-details]").length === 6
  );
  await page.locator("button", { hasText: "Show More" }).click();
  await page.waitForFunction(
    () =>
      document.querySelectorAll("[data-test-id=package-details]").length === 11
  );
});
