import { registerAndLogin } from "./auth.setup";

import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/chromium-user.json";

setup("authenticate", async ({ page, request }) => {
  await registerAndLogin(page, request, "chromium");

  await page.context().storageState({ path: authFile });
});
