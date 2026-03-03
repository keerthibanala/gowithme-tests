import { test, expect } from '../../src/fixtures/test.fixture.js';
import { checkBasicA11y, checkHeadingHierarchy, checkLinksHaveText } from '../../src/helpers/accessibility.js';

test.describe('Accessibility - Basic Checks', () => {
  test('homepage should have proper heading hierarchy', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();
    await checkHeadingHierarchy(page);
  });

  test('homepage images should have alt text', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();
    await checkBasicA11y(page);
  });

  test('homepage links should have accessible text', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();
    await checkLinksHaveText(page);
  });

  test('terms page should have proper heading hierarchy', async ({ termsPage, page }) => {
    await termsPage.goto();
    await termsPage.waitForPageLoad();
    await checkHeadingHierarchy(page);
  });

  test('page should have a lang attribute on html tag', async ({ homePage, page }) => {
    await homePage.goto();
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('page should have meta viewport tag for mobile', async ({ homePage, page }) => {
    await homePage.goto();
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);
  });
});
