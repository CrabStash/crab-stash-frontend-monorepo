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

const generateRegistrationData = (index: number) => {
  const registerData: RegisterForm = {
    email: `test${index}@test.com`,
    password: "testPassword123",
    confirmPassword: "testPassword123",
    firstName: "Test",
    lastName: "User",
  };

  return registerData;
};

export const e2eLogin = async (page: Page, workerIndex: number) => {
  const registerData = generateRegistrationData(workerIndex);

  await page.getByRole("textbox", { name: /Email/ }).fill(registerData.email);
  await page.getByLabel("Password", { exact: true }).fill(registerData.password);

  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("/");
};

export const e2eLogout = async (page: Page) => {
  await page.getByRole("button", { name: /user menu/i }).click();

  await page.getByRole("menuitem", { name: /log out/i }).click();

  await page.waitForURL("/login");
};

export default function authTest() {
  test("register and login user", async ({ page, storageState }, testInfo) => {
    const tempState = JSON.parse(JSON.stringify(storageState));

    storageState = undefined;

    await page.goto("/register");

    const registerData = generateRegistrationData(testInfo.workerIndex);

    await page.getByRole("textbox", { name: /Email/ }).fill(registerData.email);
    await page
      .getByLabel("Password", {
        exact: true,
      })
      .fill(registerData.password);
    await page
      .getByRole("textbox", { name: /Confirm Password/ })
      .fill(registerData.confirmPassword);
    await page.getByRole("textbox", { name: /First name/ }).fill(registerData.firstName);
    await page.getByRole("textbox", { name: /Last name/ }).fill(registerData.lastName);

    await page.getByRole("button", { name: "Register" }).click();

    await expect(page.getByText("Register successful", { exact: true })).toBeVisible();

    await page.waitForURL("/login");

    await e2eLogin(page, testInfo.workerIndex);

    await page.waitForURL("/");

    storageState = tempState;
  });

  test("login and logout user", async ({ page, storageState }, testInfo) => {
    const tempState = JSON.parse(JSON.stringify(storageState));

    storageState = undefined;

    await page.goto("/login");

    const registerData = generateRegistrationData(testInfo.workerIndex);

    await page.getByRole("textbox", { name: /Email/ }).fill(registerData.email);
    await page.getByLabel("Password", { exact: true }).fill(registerData.password);

    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("/");

    await e2eLogout(page);

    storageState = tempState;
  });
}
