import { test } from "./e2e-utils";

import type { RegisterForm } from "@app/screens/register";
import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

const generateRegistrationData = (workerIndex: number) => {
  const registerData: RegisterForm = {
    email: `test${workerIndex}@test.com`,
    password: "testPassword123",
    confirmPassword: "testPassword123",
    firstName: "Test",
    lastName: "User",
  };

  return registerData;
};

test.describe("auth", () => {
  test("register and login user", async ({ page }, testInfo) => {
    await page.goto("/register");

    const registerData = generateRegistrationData(testInfo.workerIndex);

    await page.getByLabel(/Email/).fill(registerData.email);
    await page
      .getByLabel("Password", {
        exact: true,
      })
      .fill(registerData.password);
    await page.getByLabel(/Confirm Password/).fill(registerData.confirmPassword);
    await page.getByLabel(/First name/).fill(registerData.firstName);
    await page.getByLabel(/Last name/).fill(registerData.lastName);

    await page.getByRole("button", { name: "Register" }).click();

    await expect(page.getByText("Register successful", { exact: true })).toBeVisible();

    await page.waitForURL("/login");

    await page.getByLabel(/Email/).fill(registerData.email);
    await page.getByLabel("Password", { exact: true }).fill(registerData.password);

    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("/");
  });

  test("login and logout user", async ({ page }, testInfo) => {
    await page.goto("/login");

    const registerData = generateRegistrationData(testInfo.workerIndex);

    await page.getByLabel(/Email/).fill(registerData.email);
    await page.getByLabel("Password", { exact: true }).fill(registerData.password);

    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("/");

    await page.getByRole("button", { name: /user menu/i }).click();

    await page.getByRole("menuitem", { name: /log out/i }).click();

    await page.waitForURL("/login");
  });
});
