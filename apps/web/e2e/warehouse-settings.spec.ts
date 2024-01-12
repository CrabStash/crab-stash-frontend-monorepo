import { URLS } from "@app/constants/urls";
import test, { expect } from "@playwright/test";

export default function dashboardTest() {
  test("can update warehouse settings", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /settings/i }).click();

    await page.waitForURL("/warehouse/**/settings");

    await page.getByRole("textbox", { name: /name/i }).fill("Warehouse name edited");

    await page.getByRole("textbox", { name: /description/i }).fill("Warehouse description edited");

    await page.getByRole("button", { name: /update general settings/i }).click();

    await expect(
      page.getByText("Warehouse information updated successfully.", { exact: true }),
    ).toBeVisible();
  });

  test("can add user to warehouse", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /settings/i }).click();

    await page.waitForURL("/warehouse/**/settings");

    await page.getByRole("link", { name: /users/i }).click();

    await page.waitForURL("/warehouse/**/settings/users");

    await page.getByRole("textbox", { name: /email/i }).fill("testdummy1@test.com");

    await page.getByRole("button", { name: /add user/i }).click();

    await expect(
      page.getByText("User has been added to the warehouse", { exact: true }),
    ).toBeVisible();

    await page.getByRole("textbox", { name: /email/i }).fill("testdummy2@test.com");

    await page.getByRole("button", { name: /add user/i }).click();

    await expect(
      page.getByText("User has been added to the warehouse", { exact: true }),
    ).toBeVisible();
  });

  test("can change employee role", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /settings/i }).click();

    await page.waitForURL("/warehouse/**/settings");

    await page.getByRole("link", { name: /users/i }).click();

    await page.waitForURL("/warehouse/**/settings/users");

    await page.getByRole("button", { name: "Open testdummy1@test.com menu" }).click();

    await page.getByRole("menuitem", { name: /role/i }).click();

    await page.getByRole("menuitemradio", { name: /moderator/i }).click();

    await page.keyboard.press("Escape");

    await expect(page.getByRole("cell", { name: "Moderator", exact: true })).toBeVisible();
  });

  test("can remove employee from warehouse", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /settings/i }).click();

    await page.waitForURL("/warehouse/**/settings");

    await page.getByRole("link", { name: /users/i }).click();

    await page.waitForURL("/warehouse/**/settings/users");

    await page.getByRole("button", { name: "Open testdummy2@test.com menu" }).click();

    await page.getByRole("menuitem", { name: /remove/i }).click();

    await expect(page.getByText("Remove Test User", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: /remove/i }).click();

    await expect(
      page.getByText("User has been removed from the warehouse", { exact: true }),
    ).toBeVisible();

    await expect(page.getByRole("cell", { name: "testdummy2@test.com" })).not.toBeVisible();
  });
}
