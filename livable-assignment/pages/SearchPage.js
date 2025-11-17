import { expect } from '@playwright/test';

export class SearchPage {
  constructor(page) {
    this.page = page;

    // Stable locator based on multiple strong attributes
    this.searchInput = page.locator(
      'input[name="SearchTerm"][placeholder*="City"][aria-label*="community"]'
    );

    // Listing cards — generic but flexible for result validation
    this.listingCards = page.locator('.ListingCard, [data-testid*="listing"], article, .result');
  }

  async open() {
    await this.page.goto('https://www.livabl.com/toronto-on-metro/new-homes');
    // Wait for the search box to render
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.searchInput).toBeVisible({ timeout: 30000 });
  }

  async searchCity(city) {
    await this.searchInput.fill(city);
     // Wait for dropdown suggestions
  const suggestion = this.page.locator('ul li, .autocomplete-list li').first();
  await suggestion.waitFor({ state: 'visible', timeout: 10000 });

  // Click the first suggestion
  await suggestion.click();

  // Wait for the heading on the results page instead of full navigation
  const heading = this.page.locator('h1, h2', {
    hasText: `Pre Construction & New Homes For Sale In ${city}`,
  });
  await heading.waitFor({ state: 'visible', timeout: 20000 });

  // Validate the heading is visible
  await expect(heading).toBeVisible();  
  }

  async verifyListingHasMandatoryFields() {
    const firstCard = this.listingCards.first();
    await expect(firstCard.locator('text=$')).toBeVisible({ timeout: 10000 });
    await expect(firstCard.locator('img')).toBeVisible();
    await expect(firstCard).toContainText(/bed|Bedroom/i);
  }
}

