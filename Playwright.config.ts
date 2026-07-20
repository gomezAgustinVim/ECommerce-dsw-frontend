import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:5173",
    headless: false,
    screenshot: "only-on-failure",
    launchOptions: {
      slowMo: 1000
    }
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
