import authTest from "../auth.spec";
import categoriesTest from "../categories.spec";
import dashboardTest from "../dashboard.spec";
import { test } from "../e2e-utils";
import fieldsTest from "../fields.spec";
import productsTest from "../products.spec";
import profileTest from "../profile.spec";
import warehouseCreationTest from "../warehouse-creation.spec";
import warehouseSettingsTest from "../warehouse-settings.spec";

test.describe("auth", () => authTest());
test.describe("warehouse creation", () => warehouseCreationTest());
test.describe("fields managment", () => fieldsTest());
test.describe("categories managment", () => categoriesTest());
test.describe("products managment", () => productsTest());
test.describe("profile", () => profileTest());
test.describe("dashboard", () => dashboardTest());
test.describe("warehouse settings", () => warehouseSettingsTest());
