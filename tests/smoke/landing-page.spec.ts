import { test, expect } from '../../src/fixtures/test.fixture.js';

test.describe('Landing Page - Smoke Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test('should load the homepage successfully', async ({ homePage, page }) => {
    await expect(page).toHaveURL('/');
    await homePage.expectPageTitle();
  });

  test('should display the hero section with correct heading', async ({ homePage }) => {
    await homePage.expectHeroVisible();
  });

  test('should display the Get Started CTA button', async ({ homePage }) => {
    await expect(homePage.getStartedButton).toBeVisible();
  });

  test('should display Sign In button in header', async ({ homePage }) => {
    await expect(homePage.signInButton).toBeVisible();
  });

  test('should display both Traveler and Companion role cards', async ({ homePage }) => {
    await homePage.expectTravelerSectionVisible();
    await homePage.expectCompanionSectionVisible();
  });

  test('should display platform disclaimer in footer', async ({ homePage }) => {
    await homePage.expectFooterDisclaimerVisible();
  });

  test('should display the Discover Companions label', async ({ homePage }) => {
    await homePage.discoverCompanionsLabel.scrollIntoViewIfNeeded();
    await expect(homePage.discoverCompanionsLabel).toBeVisible();
  });

  test('should have correct meta title', async ({ page }) => {
    const title = await page.title();
    expect(title.toLowerCase()).toContain('gowithme');
  });

  test('should respond with HTTP 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });
});
