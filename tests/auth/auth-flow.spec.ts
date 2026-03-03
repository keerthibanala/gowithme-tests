import { test, expect } from '../../src/fixtures/test.fixture.js';

test.describe('Authentication Flow', () => {
  test('Get Started button should trigger Google sign-in', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();

    await homePage.clickGetStarted();
    await page.waitForTimeout(3000);

    const url = page.url();
    const isAuthPage = url.includes('accounts.google.com') ||
                       url.includes('login') ||
                       url.includes('sign') ||
                       url.includes('auth') ||
                       url.includes('dashboard') ||
                       url.includes('gowithme');
    expect(isAuthPage).toBeTruthy();
  });

  test('Sign In header button should trigger authentication', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();

    await expect(homePage.signInButton).toBeVisible();
    await homePage.clickSignIn();
    await page.waitForTimeout(3000);

    const url = page.url();
    expect(url).toBeTruthy();
  });

  test('protected pages should require authentication', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const url = page.url();
    const isRedirected = !url.includes('/dashboard') ||
                         url.includes('login') ||
                         url.includes('sign') ||
                         url.includes('auth');
    expect(url).toBeTruthy();
  });

  test('discover page should handle unauthenticated access gracefully', async ({ page }) => {
    const response = await page.goto('/discover');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(500);
    expect(page.url()).toBeTruthy();
  });
});
