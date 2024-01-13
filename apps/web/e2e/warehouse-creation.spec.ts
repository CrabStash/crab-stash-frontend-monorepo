import { test } from "./e2e-utils";

import { URLS } from "@app/constants/urls";
import type { BasicInformationForm } from "@app/screens/warehouse-creator/steps/basic-information";
import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import path from "path";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

const generateBasicInformationData = (name: string) => {
  const basicInformationStepData: BasicInformationForm = {
    name: `Test Warehouse ${name}`,
    description: "Test Warehouse Description",
  };

  return basicInformationStepData;
};

const testWarehouseCreatorFlow = async (page: Page, name: string) => {
  const basicInformationStepData = generateBasicInformationData(name);

  await page.getByRole("textbox", { name: /name/i }).fill(basicInformationStepData.name);
  await page
    .getByRole("textbox", { name: /description/i })
    .fill(basicInformationStepData.description);

  await page.getByRole("button", { name: /next/i }).click();

  await expect(page.getByText("Upload your logo", { exact: true })).toBeVisible();

  const fileChooserPromise = page.waitForEvent("filechooser");

  await page.getByRole("button", { name: /choose file/i }).click();

  const fileChooser = await fileChooserPromise;

  await fileChooser.setFiles(path.join(__dirname, "../public/logo.png"));

  await expect(page.getByRole("textbox", { name: /logo/i })).toHaveValue("logo.png");

  await page.getByRole("button", { name: /next/i }).click();

  await page.getByRole("switch").click();

  await page
    .getByRole("spinbutton", {
      name: /capacity/i,
    })
    .fill("1000");

  await page.getByRole("button", { name: /next/i }).click();

  await expect(page.getByText("Warehouse created", { exact: true })).toBeVisible();
};

export default function warehouseCreationTest() {
  test("can create warehouse on default view for new account", async ({ page }) => {
    await page.goto(URLS.dashboard);

    await testWarehouseCreatorFlow(page, "1");
  });

  test("can create warehouse in dedicated view", async ({ page }, testInfo) => {
    await page.goto(URLS.createWarehouse);
    await testWarehouseCreatorFlow(page, "2");
  });
}
