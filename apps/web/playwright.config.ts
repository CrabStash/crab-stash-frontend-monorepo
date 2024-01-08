import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    baseURL: "http://localhost:3000",
    ignoreHTTPSErrors: true,
  },
  testMatch: "e2e/setup/test.list.ts",

  timeout: 30 * 1000,
  /* Configure projects for major browsers */
  projects: [
    { name: "setup-chromium", testMatch: /auth.chromium.setup\.ts/ },
    { name: "setup-firefox", testMatch: /auth.firefox.setup\.ts/ },
    { name: "setup-webkit", testMatch: /auth.webkit.setup\.ts/ },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"], // Use prepared auth state.
        storageState: "playwright/.auth/chromium-user.json",
      },
      dependencies: ["setup-chromium"],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], storageState: "playwright/.auth/firefox-user.json" },
      dependencies: ["setup-firefox"],
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/webkit-user.json",
      },
      dependencies: ["setup-webkit"],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
