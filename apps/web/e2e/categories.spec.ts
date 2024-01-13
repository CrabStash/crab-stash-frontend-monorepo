import { URLS } from "@app/constants/urls";
import type { Page } from "@playwright/test";
import test, { expect } from "@playwright/test";

const createSubcategory = async (page: Page) => {
  await page.goto(URLS.dashboard);

  await page.getByRole("link", { name: /categories/i }).click();

  await page.waitForURL("/warehouse/**/categories");

  await page.getByRole("link", { name: /create category/i }).click();

  await page.waitForURL("/warehouse/**/categories/create");

  await page.getByRole("textbox", { name: /category name/i }).fill("Test subcategory");
  await page
    .getByRole("textbox", { name: /category description/i })
    .fill("Test description for subcategory");

  await page.getByRole("button", { name: "Test root category", exact: true }).click();

  await page.getByRole("button", { name: /add field/i }).click();

  await page.getByRole("checkbox", { name: "Test Field Date", exact: true }).click();

  await page.getByRole("checkbox", { name: /test field datetime/i }).click();

  await page.getByRole("button", { name: "Close", exact: true }).nth(1).click();

  await page.getByRole("button", { name: /submit/i }).click();

  await page.waitForURL("/warehouse/**/categories");

  await page.getByRole("button", { name: /open test root category/i }).click();

  await expect(page.getByText("Test subcategory")).toBeVisible();
};

export default function categoriesTest() {
  test("can create root level category", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /categories/i }).click();

    await page.waitForURL("/warehouse/**/categories");

    await page.getByRole("link", { name: /create category/i }).click();

    await page.waitForURL("/warehouse/**/categories/create");

    await page.getByRole("textbox", { name: /category name/i }).fill("Test root category");
    await page
      .getByRole("textbox", { name: /category description/i })
      .fill("Test description for root category");

    await page.getByRole("button", { name: /add field/i }).click();

    await page.getByRole("checkbox", { name: /test field string/i }).click();
    await page.getByRole("checkbox", { name: /test field integer/i }).click();

    await page.getByRole("button", { name: "Close", exact: true }).nth(1).click();

    await page.getByRole("button", { name: /submit/i }).click();

    await page.waitForURL("/warehouse/**/categories");

    await expect(page.getByText("Test root category")).toBeVisible();
  });

  test("can create subcategory", async ({ page }) => {
    await createSubcategory(page);
  });

  test("displays good information about category", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /categories/i }).click();

    await page.waitForURL("/warehouse/**/categories");

    await page.getByRole("button", { name: /open test root category/i }).click();

    await page.getByText("Test subcategory").click();

    await page.waitForURL("/warehouse/**/categories/**");

    await expect(page.getByText("Test root category")).toBeVisible();
    await expect(page.getByText("Test Field Date", { exact: true })).toBeVisible();
    await expect(page.getByText("Test Field DateTime")).toBeVisible();
  });

  test("can edit category", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /categories/i }).click();

    await page.waitForURL("/warehouse/**/categories");

    await page.getByRole("button", { name: /open test root category/i }).click();

    await page.getByText("Test subcategory").click();

    await page.waitForURL("/warehouse/**/categories/**");

    await page.getByRole("link", { name: /edit/i }).click();

    await page.waitForURL("/warehouse/**/categories/**/edit");

    await page.getByRole("textbox", { name: /category name/i }).fill("Test subcategory edited");

    await page.getByRole("button", { name: /submit/i }).click();

    await page.waitForURL("/warehouse/**/categories");

    await page.getByRole("button", { name: /open test root category/i }).click();

    await expect(page.getByText("Test subcategory edited")).toBeVisible();
  });

  test("can delete category", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /categories/i }).click();

    await page.waitForURL("/warehouse/**/categories");

    await page.getByRole("button", { name: /open test root category/i }).click();

    await page.getByText("Test subcategory").click();

    await page.waitForURL("/warehouse/**/categories/**");

    await page.getByRole("button", { name: /delete/i }).click();

    await expect(
      page.getByText(
        "Are you sure you want to delete this category? This action cannot be undone.",
      ),
    ).toBeVisible();

    await page.getByRole("button", { name: "Delete" }).click();

    await page.waitForURL("/warehouse/**/categories");

    await expect(
      page.getByRole("button", { name: /open test subcategory edited/i }),
    ).not.toBeVisible();

    await createSubcategory(page);
  });
}
