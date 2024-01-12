import { generateRegistrationData, register, registerAndLogin } from "./auth.setup";

import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/chromium-user.json";

setup("authenticate", async ({ page, request }) => {
  await registerAndLogin(page, request, "chromium");

  const registerData1 = generateRegistrationData("dummy1");
  const registerData2 = generateRegistrationData("dummy2");

  await register(request, registerData1);
  await register(request, registerData2);

  await page.context().storageState({ path: authFile });
});
