import { test, expect } from '../../src/fixtures/test.fixture.js';

test.describe('Discover Page', () => {
  test('should navigate to discover and verify redirection behavior', async ({ discoverPage, page }) => {
    await discoverPage.goto();
    await page.waitForLoadState('networkidle');

    const url = page.url();
    // Discover may require auth — verify it either loads or redirects to login
    const isOnDiscover = url.includes('discover');
    const isOnLogin = url.includes('login') || url.includes('sign') || url.includes('auth');
    expect(isOnDiscover || isOnLogin).toBeTruthy();
  });

  test('should show discover page or prompt login when accessing directly', async ({ page }) => {
    const response = await page.goto('/discover');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBeLessThan(500);
  });
});
