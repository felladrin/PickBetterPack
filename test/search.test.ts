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
  await page.locator(".introjs-donebutton").click();
  await page.locator("strong >> text=npm").first().waitFor();
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
  await page.locator('button >> text="Show More"').click();
  await page.waitForFunction(
    () =>
      document.querySelectorAll("[data-test-id=package-details]").length === 11
  );
});
