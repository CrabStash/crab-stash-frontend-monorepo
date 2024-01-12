import type { Page } from "@playwright/test";
import test, { expect } from "@playwright/test";

export default function profilesTest() {
  test("opens user profile", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /user menu/i }).click();
    await page.getByRole("menuitem", { name: /profile/i }).click();

    await page.waitForURL("/profile/**");

    await expect(page.getByText("Test User", { exact: true })).toBeVisible();
  });

  test("can update profile info", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /user menu/i }).click();
    await page.getByRole("menuitem", { name: /settings/i }).click();

    await page.getByRole("textbox", { name: /first name/i }).fill("First name edited");
    await page.getByRole("textbox", { name: /last name/i }).fill("Last name edited");

    await page.getByRole("button", { name: /update profile info/i }).click();

    await page.getByRole("button", { name: /user menu/i }).click();

    await expect(page.getByText("First name edited Last name edited")).toBeVisible();
  });

  const changePassword = async (page: Page, current: string, newPassword: string) => {
    await page.goto("/");

    await page.getByRole("button", { name: /user menu/i }).click();
    await page.getByRole("menuitem", { name: /settings/i }).click();

    await page.getByRole("link", { name: /security/i }).click();

    await page.getByRole("textbox", { name: /old password/i }).fill(current);
    await page.getByRole("textbox", { name: "Password", exact: true }).fill(newPassword);
    await page.getByRole("textbox", { name: "Confirm password", exact: true }).fill(newPassword);

    await page.getByRole("button", { name: /update security settings/i }).click();

    await expect(page.getByText("Password changed successfully", { exact: true })).toBeVisible();
  };

  test("can update password", async ({ page }) => {
    await changePassword(page, "testPassword123", "newTestPassword123");

    await changePassword(page, "newTestPassword123", "testPassword123");
  });
}
