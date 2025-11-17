

// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',                        // directory containing test files
  timeout: 60 * 1000,                        // overall per-test timeout (60s)
  expect: {
    timeout: 5000,                           // assertion timeout
  },
  reporter: [
    ['list'],                                // console output
    ['html', { outputFolder: 'reports', open: 'never' }], // HTML report
  ],
  use: {
    baseURL: 'https://www.livabl.com/',
    headless: false,                         // run visible browser
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',              // record video only on failure
    screenshot: 'only-on-failure',           // capture screenshot on failure
    trace: 'retain-on-failure',              // keep trace for debugging
    launchOptions: {
      slowMo: 1000,                          // 1s delay per action for clarity
    },
  },
});


