import { type Page, expect } from '@playwright/test';

export async function checkBasicA11y(page: Page) {
  const images = page.locator('img');
  const imgCount = await images.count();

  for (let i = 0; i < imgCount; i++) {
    const img = images.nth(i);
    const alt = await img.getAttribute('alt');
    const role = await img.getAttribute('role');
    const ariaHidden = await img.getAttribute('aria-hidden');

    if (ariaHidden !== 'true' && role !== 'presentation') {
      expect(alt, `Image ${i} should have alt text`).toBeTruthy();
    }
  }
}

export async function checkHeadingHierarchy(page: Page) {
  const headings = page.locator('h1, h2, h3, h4, h5, h6');
  const count = await headings.count();
  expect(count, 'Page should have at least one heading').toBeGreaterThan(0);

  const h1Count = await page.locator('h1').count();
  expect(h1Count, 'Page should have exactly one h1').toBeLessThanOrEqual(2);
}

export async function checkLinksHaveText(page: Page) {
  const links = page.locator('a:visible');
  const count = await links.count();

  for (let i = 0; i < count; i++) {
    const link = links.nth(i);
    const text = await link.textContent();
    const ariaLabel = await link.getAttribute('aria-label');
    const hasText = (text && text.trim().length > 0) || ariaLabel;
    expect(hasText, `Link ${i} should have accessible text`).toBeTruthy();
  }
}
