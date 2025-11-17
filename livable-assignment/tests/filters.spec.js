const { test, expect } = require('@playwright/test');
const path = require('path');

test('filters and its functionality', async ({ page }) => {
  const filePath = path.join(__dirname, '../mock-livabl.html');
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');

  await page.goto(fileUrl);

  // Step 1: Search for Toronto
  await page.fill('#cityInput', 'Toronto');
  await page.click('#searchBtn');

  // Step 2: Verify heading
  await expect(page.locator('#resultsHeading')).toContainText('Toronto');

  // Step 3: Apply multiple filters
  await page.selectOption('#saleStatus', 'registration');
  await page.selectOption('#homeType', 'townhouse');
  await page.selectOption('#priceRange', 'mid');
  await page.selectOption('#constructionStatus', 'pre');
  await page.selectOption('#ownership', 'condo');

  // Step 4: Verify filtered result
  const listings = page.locator('.ListingCard');
  await expect(listings).toHaveCount(1);
  await expect(listings.first()).toContainText('Deval House 2');
});
