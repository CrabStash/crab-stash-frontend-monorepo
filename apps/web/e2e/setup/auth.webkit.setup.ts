import { registerAndLogin } from "./auth.setup";

import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/webkit-user.json";

setup("authenticate", async ({ page, request }) => {
  await registerAndLogin(page, request, "webkit");
  await page.context().storageState({ path: authFile });
});
