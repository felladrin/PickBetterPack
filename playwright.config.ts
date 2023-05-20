import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

export default {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: "on-first-retry",
    screenshot: "on",
    video: "on-first-retry",
  },
  webServer: {
    command: "npm run build-and-preview -- --port 3000",
    port: 3000,
    timeout: 120 * 1000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    // Temporarily disabled due to CI issues on https://github.com/felladrin/PickBetterPack/pull/354
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
} as PlaywrightTestConfig;
