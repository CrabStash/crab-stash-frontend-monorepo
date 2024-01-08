import { API_BASE_URL } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import type { RegisterForm } from "@app/screens/register";
import type { APIRequestContext, Page } from "@playwright/test";

const generateRegistrationData = (workerName: string) => {
  const registerData: RegisterForm = {
    email: `test${workerName}@test.com`,
    password: "testPassword123",
    confirmPassword: "testPassword123",
    firstName: "Test",
    lastName: "User",
  };

  return registerData;
};

const baseUrl = API_BASE_URL.slice(0, -1);

export const registerAndLogin = async (page: Page, request: APIRequestContext, name: string) => {
  const registerData = generateRegistrationData(name);

  await request.post(baseUrl + API_ENDPOINTS.auth.register, {
    data: {
      email: registerData.email,
      passwd: registerData.password,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
    },
  });

  await page.goto(URLS.login);

  await page.getByRole("textbox", { name: /Email/ }).fill(registerData.email);
  await page.getByLabel("Password", { exact: true }).fill(registerData.password);

  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("/");
};
