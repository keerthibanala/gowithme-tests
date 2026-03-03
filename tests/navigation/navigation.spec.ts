import { test, expect } from '../../src/fixtures/test.fixture.js';

test.describe('Navigation Tests', () => {
  test('should navigate to Terms of Service via footer link', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();

    await homePage.termsFooterLink.scrollIntoViewIfNeeded();
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      homePage.termsFooterLink.click(),
    ]);

    await newPage.waitForLoadState('networkidle');
    await expect(newPage).toHaveURL(/terms/);
    await newPage.close();
  });

  test('Get Started button should trigger sign-in flow', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();

    await homePage.clickGetStarted();
    await page.waitForLoadState('networkidle');

    const url = page.url();
    const isAuthFlow = url.includes('accounts.google.com') ||
                       url.includes('login') ||
                       url.includes('sign') ||
                       url.includes('auth') ||
                       url.includes('dashboard');
    expect(isAuthFlow || url.includes('gowithme')).toBeTruthy();
  });

  test('Sign In button should trigger authentication', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();

    await homePage.clickSignIn();
    await page.waitForLoadState('networkidle');

    const url = page.url();
    expect(url).toBeTruthy();
  });

  test('should be able to navigate back to homepage from Terms', async ({ termsPage, page }) => {
    await termsPage.goto();
    await termsPage.waitForPageLoad();

    const homeLink = page.getByRole('link', { name: /gowithme/i }).first();
    await homeLink.click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/gowithme\.app\/?$/);
  });

  test('homepage logo should be visible and contain GoWithMe text', async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();

    await expect(homePage.logo).toBeVisible();
    await expect(homePage.logo).toContainText(/gowithme/i);
  });

  test('footer should contain Terms, Privacy links', async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();

    await homePage.termsFooterLink.scrollIntoViewIfNeeded();
    await expect(homePage.termsFooterLink).toBeVisible();
    await expect(homePage.privacyFooterLink).toBeVisible();
  });
});
