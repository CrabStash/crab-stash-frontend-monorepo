import { test } from "./e2e-utils";

import { URLS } from "@app/constants/urls";
import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

const generateFieldData = (name: string, type: RegExp) => {
  return {
    name: `Test Field ${name}`,
    help: "Test Field Help",
    type,
  };
};

const createField = async (page: Page, fieldData: ReturnType<typeof generateFieldData>) => {
  await page.goto(URLS.dashboard);

  await page.getByRole("link", { name: /fields/i }).click();

  await page.waitForURL("/warehouse/**/fields");

  await page.getByRole("link", { name: /create field/i }).click();

  await page.waitForURL("/warehouse/**/fields/create");

  await page.getByRole("textbox", { name: /name of field/i }).fill(fieldData.name);
  await page.getByRole("textbox", { name: /help/i }).fill(fieldData.help);

  await page.getByText(/enter type of field/i).click();
  await page.getByRole("option", { name: fieldData.type }).click();

  await page.getByRole("button", { name: /submit/i }).click();

  await page.waitForURL("/warehouse/**/fields");

  await expect(page.getByRole("cell", { name: fieldData.name, exact: true })).toBeVisible();
};

export default function fieldsTest() {
  test("can create string field", async ({ page }) => {
    const fieldData = generateFieldData("String", /string/i);

    await createField(page, fieldData);
  });

  test("can create integer field", async ({ page }) => {
    const fieldData = generateFieldData("Integer", /integer/i);

    await createField(page, fieldData);
  });

  test("can create datetime field", async ({ page }) => {
    const fieldData = generateFieldData("DateTime", /datetime/i);

    await createField(page, fieldData);
  });

  test("can create date field", async ({ page }) => {
    const fieldData = generateFieldData("Date", /datetime/i);

    await createField(page, fieldData);
  });

  test("can delete field", async ({ page }) => {
    const fieldData = generateFieldData("Field to delete", /string/i);

    await createField(page, fieldData);

    await page.getByRole("button", { name: `Open ${fieldData.name} menu` }).click();

    await page.getByRole("menuitem", { name: /remove/i }).click();

    await expect(page.getByRole("heading", { name: `remove ${fieldData.name}` })).toBeVisible();

    await page.getByRole("button", { name: /remove/i }).click();

    await page.getByText("Field removed", { exact: true }).click();

    await expect(page.getByRole("cell", { name: fieldData.name, exact: true })).not.toBeVisible();
  });

  test("can edit field", async ({ page }) => {
    const fieldData = generateFieldData("Field to edit", /string/i);

    await createField(page, fieldData);

    await page.getByRole("button", { name: `Open ${fieldData.name} menu` }).click();

    await page.getByRole("menuitem", { name: /edit/i }).click();

    await expect(page.getByRole("heading", { name: `edit ${fieldData.name}` })).toBeVisible();

    const newFieldData = generateFieldData("Edited field", /integer/i);

    await page.getByRole("textbox", { name: /name of field/i }).fill(newFieldData.name);

    await page.getByRole("button", { name: /save/i }).click();

    await page.getByText("Field updated", { exact: true }).click();

    await expect(page.getByRole("cell", { name: newFieldData.name, exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: fieldData.name, exact: true })).not.toBeVisible();
  });
}
