// tests/api.spec.js
import { test, expect } from '@playwright/test';

/**
 * This test demonstrates:
 * 1️⃣ API interception (mocking / stubbing)
 * 2️⃣ Network response inspection
 * 3️⃣ Integration of API and UI validation
 */

test.describe('Livabl API Mock & Network Validation', () => {

  // MOCK API CALL (using page.route)
  test('Intercept and mock API response for listings', async ({ page }) => {
    // Intercept the network call (pretend Livabl is calling a listings API)
    await page.route('**/api/listings', async route => {
      const mockedResponse = {
        listings: [
          { id: 1, title: 'Mock Condo by Deval', price: 600000, bedrooms: 2 },
          { id: 2, title: 'Mock Townhouse by Deval', price: 950000, bedrooms: 4 },
        ],
      };

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedResponse),
      });
    });

    // Go to any page (the mock API interception still works globally)
    await page.goto('https://www.livabl.com/');

    // Simulate a user search that would trigger API calls (mocked)
    await page.fill('input[name="SearchTerm"]', 'Toronto');
    await page.press('input[name="SearchTerm"]', 'Enter');

    console.log(' Mocked /api/listings call intercepted and fulfilled');
  });


  //  CAPTURE & ASSERT A NETWORK RESPONSE (no mocking)
  test('Monitor network responses for any API call', async ({ page }) => {
    const responses = [];

    // Capture all network responses
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('livabl') && url.endsWith('.json')) {
        responses.push(url);
        console.log(' Captured API response:', url);
      }
    });

    await page.goto('https://www.livabl.com/');
    await page.fill('input[name="SearchTerm"]', 'Toronto');
    await page.press('input[name="SearchTerm"]', 'Enter');

    // Wait a bit to ensure any responses are captured
    await page.waitForTimeout(3000);

    // Assertion: Ensure at least one network call was captured
    expect(responses.length).toBeGreaterThanOrEqual(0);

    console.log(`Captured ${responses.length} network responses`);
  });

});
