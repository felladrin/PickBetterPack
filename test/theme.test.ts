import { expect, test } from "@playwright/test";

test("dark mode", async ({ page, baseURL }) => {
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
  await page
    .locator("[data-test-id=logo-light-mode]")
    .waitFor({ state: "visible" });
  await page.locator("[data-shepherd-step-id='package-json-textarea'] .shepherd-footer .shepherd-button").click();
  await page.locator("[data-test-id=toggle-dark-mode-button]").click();
  await page
    .locator("[data-test-id=logo-dark-mode]")
    .waitFor({ state: "visible" });
  expect(page.locator("body")).toHaveClass("dark-mode");
});
