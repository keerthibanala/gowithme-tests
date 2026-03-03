import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { DiscoverPage } from '../pages/discover.page.js';
import { TermsPage } from '../pages/terms.page.js';

type GowithmeFixtures = {
  homePage: HomePage;
  discoverPage: DiscoverPage;
  termsPage: TermsPage;
};

export const test = base.extend<GowithmeFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  discoverPage: async ({ page }, use) => {
    const discoverPage = new DiscoverPage(page);
    await use(discoverPage);
  },
  termsPage: async ({ page }, use) => {
    const termsPage = new TermsPage(page);
    await use(termsPage);
  },
});

export { expect } from '@playwright/test';
