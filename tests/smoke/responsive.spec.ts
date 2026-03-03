import { test, expect } from '../../src/fixtures/test.fixture.js';

test.describe('Responsive Design', () => {
  test('homepage should load correctly on desktop viewport', async ({ homePage, page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.expectHeroVisible();
  });

  test('homepage should load correctly on tablet viewport', async ({ homePage, page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.expectHeroVisible();
  });

  test('homepage should load correctly on mobile viewport', async ({ homePage, page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.expectHeroVisible();
  });

  test('Get Started button should be visible on mobile', async ({ homePage, page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.goto();
    await homePage.waitForPageLoad();
    await expect(homePage.getStartedButton).toBeVisible();
  });

  test('content should not overflow horizontally on mobile', async ({ homePage, page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.goto();
    await homePage.waitForPageLoad();

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375 + 5);
  });
});
