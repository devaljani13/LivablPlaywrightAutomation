const { test, expect } = require('@playwright/test');
const path = require('path');

test('Simulate homepage search flow ', async ({ page }) => {
  // Load local HTML mock file
  const filePath = path.join(__dirname, '../mock-livabl.html');
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');

  await page.goto(fileUrl);

  // Fill city and click search
  await page.fill('#cityInput', 'Toronto');
  await page.click('#searchBtn');

  // Validate heading text
  const heading = page.locator('#resultsHeading');
  await expect(heading).toContainText('Toronto');

  // Define the card locator before using it
  const card = page.locator('.ListingCard');

  // Check that at least one listing card is visible
  await expect(card.first()).toBeVisible();

  // Confirm there are multiple listings on page
  const count = await card.count();
  console.log(`Listings found: ${count}`);
  expect(count).toBeGreaterThan(0);
});
