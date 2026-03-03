import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page.js';

export class DiscoverPage extends BasePage {
  readonly path = '/discover';

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly companionCards: Locator;
  readonly noResultsMessage: Locator;
  readonly pageHeading: Locator;
  readonly filterControls: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.getByRole('textbox').first();
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.companionCards = page.locator('[class*="card"], [class*="companion"]');
    this.noResultsMessage = page.getByText(/no companions found|no results/i);
    this.pageHeading = page.getByRole('heading').first();
    this.filterControls = page.locator('[class*="filter"]');
  }

  async expectPageLoaded() {
    await this.waitForPageLoad();
    await expect(this.page).toHaveURL(/discover/);
  }

  async searchRoute(route: string) {
    await this.searchInput.fill(route);
    await this.searchButton.click();
  }
}
