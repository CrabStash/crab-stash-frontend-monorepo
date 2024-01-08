import { registerAndLogin } from "./auth.setup";

import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/firefox-user.json";

setup("authenticate", async ({ page, request }) => {
  await registerAndLogin(page, request, "firefox");

  await page.context().storageState({ path: authFile });
});
