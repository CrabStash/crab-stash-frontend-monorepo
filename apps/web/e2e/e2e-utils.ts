import { test } from "@playwright/test";
import { exec } from "child_process";

const beforeAll = async () => {
  exec("pnpm db:reset");
};

test.beforeAll(async () => {
  await beforeAll();
});

export { test };
