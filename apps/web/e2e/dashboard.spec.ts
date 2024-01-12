import test, { expect } from "@playwright/test";

export default function dashboardTest() {
  test("shows valid dashboard info", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("$250.00")).toBeVisible();
    await expect(page.getByText("10")).toBeVisible();
    await expect(page.getByText("1", { exact: true }).nth(0)).toBeVisible();
    await expect(page.getByText("1", { exact: true }).nth(1)).toBeVisible();
    await expect(page.getByText(/test subcategory product name/i)).toBeVisible();
  });
}
