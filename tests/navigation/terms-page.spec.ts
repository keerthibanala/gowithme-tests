import { test, expect } from '../../src/fixtures/test.fixture.js';

test.describe('Terms of Service Page', () => {
  test.beforeEach(async ({ termsPage }) => {
    await termsPage.goto();
    await termsPage.waitForPageLoad();
  });

  test('should load terms page with correct heading', async ({ termsPage }) => {
    await termsPage.expectPageLoaded();
  });

  test('should display the last updated date', async ({ termsPage }) => {
    await expect(termsPage.lastUpdatedText).toBeVisible();
  });

  test('should contain all required legal sections', async ({ termsPage }) => {
    await termsPage.expectAllSectionsPresent();
  });

  test('should display the platform disclaimer at the top', async ({ page }) => {
    const disclaimer = page.getByText(/GoWithMe is a platform that connects travelers/i);
    await expect(disclaimer).toBeVisible();
  });

  test('should have contact information', async ({ page }) => {
    const contactEmail = page.getByRole('link', { name: /legal@vibeitlabs\.com/i });
    await expect(contactEmail).toBeVisible();
    const href = await contactEmail.getAttribute('href');
    expect(href).toContain('mailto:legal@vibeitlabs.com');
  });

  test('should respond with HTTP 200', async ({ page }) => {
    const response = await page.goto('/terms.html');
    expect(response?.status()).toBe(200);
  });
});
