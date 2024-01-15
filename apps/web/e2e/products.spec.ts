import { URLS } from "@app/constants/urls";
import test, { expect } from "@playwright/test";

export default function productsTest() {
  test("can create product with root level category", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /products/i }).click();

    await page.waitForURL("/warehouse/**/products");

    await page.getByRole("link", { name: /add product/i }).click();

    await page.waitForURL("/warehouse/**/products/add");

    await page.getByRole("button", { name: "Test root category", exact: true }).click();

    await page.getByRole("button", { name: /next/i }).click();

    await page.getByRole("textbox", { name: /description/i }).fill("Test description");

    await page.getByRole("textbox", { name: /test field string/i }).fill("Test description");

    await page.getByRole("spinbutton", { name: /test field integer/i }).fill("2");

    await page.getByRole("textbox", { name: /name/i }).fill("Test product name");

    await page.getByRole("spinbutton", { name: /price/i }).fill("25");

    await page.getByRole("spinbutton", { name: /quantity/i }).fill("10");

    await page.getByRole("button", { name: /submit/i }).click();

    await page.waitForURL("/warehouse/**/products");

    await expect(page.getByRole("cell", { name: "Test product name", exact: true })).toBeVisible();
  });

  test("can create product with in subcategory", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /products/i }).click();

    await page.waitForURL("/warehouse/**/products");

    await page.getByRole("link", { name: /add product/i }).click();

    await page.waitForURL("/warehouse/**/products/add");

    await page.getByRole("button", { name: /open Test root category/ }).click();

    await page.getByRole("button", { name: "Test subcategory", exact: true }).click();

    await page.getByRole("button", { name: /next/i }).click();

    await page.getByRole("textbox", { name: /description/i }).fill("Test description");

    await page.getByRole("textbox", { name: /test field string/i }).fill("Test description");

    await page.getByRole("spinbutton", { name: /test field integer/i }).fill("2");

    await page.getByRole("textbox", { name: /name/i }).fill("Test subcategory product name");

    await page
      .getByRole("button", { name: /calendar/i })
      .nth(0)
      .click();

    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    await page.getByRole("button", { name: tomorrow }).nth(0).click();

    await page.getByRole("spinbutton", { name: /quantity/i }).fill("10");

    await page
      .getByRole("button", { name: /calendar/i })
      .nth(1)
      .click();

    const dayAfterTomorrow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );

    await page.getByRole("button", { name: dayAfterTomorrow }).nth(0).click();

    await page.getByRole("spinbutton", { name: /price/i }).fill("25");

    await page.getByRole("button", { name: /submit/i }).click();

    await page.waitForURL("/warehouse/**/products");

    await expect(
      page.getByRole("cell", { name: "Test subcategory product name", exact: true }),
    ).toBeVisible();
  });

  test("can edit product", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /products/i }).click();

    await page.waitForURL("/warehouse/**/products");

    await page.getByRole("button", { name: /open test product name menu/i }).click();

    await page.getByRole("menuitem", { name: /edit/i }).click();

    await page.waitForURL("/warehouse/**/products/**/edit");

    await page.getByRole("textbox", { name: /name/i }).fill("Test product name edited");

    await page.getByRole("button", { name: /submit/i }).click();

    await page.waitForURL("/warehouse/**/products");

    await expect(
      page.getByRole("cell", { name: "Test product name edited", exact: true }),
    ).toBeVisible();
  });

  test("can delete product", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /products/i }).click();

    await page.waitForURL("/warehouse/**/products");

    await page.getByRole("button", { name: /open test product name edited menu/i }).click();

    await page.getByRole("menuitem", { name: /remove/i }).click();

    await expect(page.getByText("Remove Test product name edited", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: /remove/i }).click();

    await expect(page.getByRole("button", { name: /remove/i })).not.toBeVisible();

    await expect(
      page.getByRole("cell", { name: "Test product name edited", exact: true }),
    ).not.toBeVisible();
  });

  test("shows info about product", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await page.getByRole("link", { name: /products/i }).click();

    await page.waitForURL("/warehouse/**/products");

    await page.getByRole("button", { name: /open test subcategory product name menu/i }).click();

    await page.getByRole("menuitem", { name: /show/i }).click();

    await page.waitForURL("/warehouse/**/products/**/**");

    await expect(page.getByRole("textbox", { name: /name/i })).toHaveValue(
      "Test subcategory product name",
    );

    await expect(page.getByRole("textbox", { name: /description/i })).toHaveValue(
      "Test description",
    );

    await expect(page.getByRole("spinbutton", { name: /price/i })).toHaveValue("25");

    await expect(page.getByRole("spinbutton", { name: /quantity/i })).toHaveValue("10");

    await expect(page.getByRole("textbox", { name: /test field string/i })).toHaveValue(
      "Test description",
    );

    await expect(page.getByRole("spinbutton", { name: /test field integer/i })).toHaveValue("2");

    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

    tomorrow.setHours(0, 0, 0, 0);

    const tomorrowValue = tomorrow.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const dayAfterTomorrow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    dayAfterTomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrowValue = dayAfterTomorrow.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    await expect(page.getByRole("textbox", { name: "Test Field Date", exact: true })).toHaveValue(
      dayAfterTomorrowValue,
    );

    await expect(
      page.getByRole("textbox", { name: "Test Field DateTime", exact: true }),
    ).toHaveValue(tomorrowValue);
  });
}
