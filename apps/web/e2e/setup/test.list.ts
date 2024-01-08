import authTest from "../auth.spec";
import { test } from "../e2e-utils";
import fieldsTest from "../fields.spec";
import warehouseCreationTest from "../warehouse-creation.spec";

test.describe("auth", () => authTest());
test.describe("warehouse creation", () => warehouseCreationTest());
test.describe("fields managment", () => fieldsTest());
