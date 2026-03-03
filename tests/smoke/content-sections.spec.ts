import { test, expect } from '../../src/fixtures/test.fixture.js';

test.describe('Landing Page - Content Sections', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test('should display "Two roles, one platform" section', async ({ homePage }) => {
    await expect(homePage.twoRolesSection).toBeVisible();
  });

  test('should describe the Traveler role with correct content', async ({ page }) => {
    const travelerContent = page.getByText(/need help navigating airports/i);
    await travelerContent.scrollIntoViewIfNeeded();
    await expect(travelerContent).toBeVisible();
  });

  test('should describe the Companion role with correct content', async ({ page }) => {
    const companionContent = page.getByText(/already flying\? help a fellow traveler/i);
    await companionContent.scrollIntoViewIfNeeded();
    await expect(companionContent).toBeVisible();
  });

  test('should display Option A flow for discovering companions first', async ({ page }) => {
    const optionA = page.getByText(/haven't booked yet/i);
    await optionA.scrollIntoViewIfNeeded();
    await expect(optionA).toBeVisible();

    await expect(page.getByText(/browse available companions/i)).toBeVisible();
    await expect(page.getByText(/book your flight to match/i)).toBeVisible();
    await expect(page.getByText(/join their trip/i)).toBeVisible();
  });

  test('should display Option B flow for uploading existing itinerary', async ({ page }) => {
    const optionB = page.getByText(/already booked\?/i).first();
    await optionB.scrollIntoViewIfNeeded();
    await expect(optionB).toBeVisible();

    await expect(page.getByText(/upload your itinerary/i).first()).toBeVisible();
    await expect(page.getByText(/wait for a match/i)).toBeVisible();
  });

  test('should display companion flow steps', async ({ page }) => {
    const companionHeading = page.getByText(/help someone\. fly together/i);
    await companionHeading.scrollIntoViewIfNeeded();
    await expect(companionHeading).toBeVisible();

    await expect(page.getByText(/sign in & add your trip/i)).toBeVisible();
    await expect(page.getByText(/wait for travelers/i)).toBeVisible();
    await expect(page.getByText(/coordinate via chat/i).first()).toBeVisible();
  });

  test('should display add trips section', async ({ page }) => {
    const addTrips = page.getByText(/add trips your way/i);
    await addTrips.scrollIntoViewIfNeeded();
    await expect(addTrips).toBeVisible();

    await expect(page.getByText(/upload itinerary/i)).toBeVisible();
    await expect(page.getByText(/enter manually/i)).toBeVisible();
  });

  test('should display tipping information', async ({ homePage, page }) => {
    await homePage.tippingSection.scrollIntoViewIfNeeded();
    await expect(homePage.tippingSection).toBeVisible();
    await expect(page.getByText(/no fees, no charges/i)).toBeVisible();
  });

  test('should display community trust section', async ({ homePage, page }) => {
    await homePage.communitySection.scrollIntoViewIfNeeded();
    await expect(homePage.communitySection).toBeVisible();
    await expect(page.getByText(/community-driven/i)).toBeVisible();
    await expect(page.getByText(/smart matching/i)).toBeVisible();
  });

  test('should display the "Ready to travel together?" CTA section', async ({ page }) => {
    const ctaHeading = page.getByRole('heading', { name: /ready to travel together/i });
    await ctaHeading.scrollIntoViewIfNeeded();
    await expect(ctaHeading).toBeVisible();
  });
});
