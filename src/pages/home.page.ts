import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page.js';

export class HomePage extends BasePage {
  readonly path = '/';

  readonly heroHeading: Locator;
  readonly getStartedButton: Locator;
  readonly travelerSection: Locator;
  readonly companionSection: Locator;
  readonly discoverCompanionsLabel: Locator;
  readonly twoRolesSection: Locator;
  readonly tippingSection: Locator;
  readonly communitySection: Locator;
  readonly footerDisclaimer: Locator;
  readonly chatWidget: Locator;
  readonly logo: Locator;
  readonly signInButton: Locator;
  readonly termsFooterLink: Locator;
  readonly privacyFooterLink: Locator;

  constructor(page: Page) {
    super(page);

    this.heroHeading = page.getByRole('heading', { name: /travel with confidence/i });
    this.getStartedButton = page.getByRole('button', { name: /get started/i }).first();
    this.travelerSection = page.getByText(/I'm a Traveler/i);
    this.companionSection = page.getByText(/I'm a Companion/i);
    this.discoverCompanionsLabel = page.getByText(/discover companions/i).first();
    this.twoRolesSection = page.getByRole('heading', { name: /whether you need help/i });
    this.tippingSection = page.getByRole('heading', { name: /free to use\. tip to say thanks/i });
    this.communitySection = page.getByRole('heading', { name: /built on trust/i });
    this.footerDisclaimer = page.getByText(/platform disclaimer/i);
    this.chatWidget = page.locator('[class*="chat"], [id*="chat"]').first();
    this.logo = page.getByRole('button', { name: /gowithme/i }).first();
    this.signInButton = page.getByRole('button', { name: /sign in/i });
    this.termsFooterLink = page.getByRole('link', { name: /terms/i }).first();
    this.privacyFooterLink = page.getByRole('link', { name: /privacy/i });
  }

  async expectHeroVisible() {
    await expect(this.heroHeading).toBeVisible();
  }

  async expectPageTitle() {
    await expect(this.page).toHaveTitle(/gowithme/i);
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async expectTravelerSectionVisible() {
    await this.travelerSection.scrollIntoViewIfNeeded();
    await expect(this.travelerSection).toBeVisible();
  }

  async expectCompanionSectionVisible() {
    await this.companionSection.scrollIntoViewIfNeeded();
    await expect(this.companionSection).toBeVisible();
  }

  async expectAllMajorSections() {
    await expect(this.heroHeading).toBeVisible();
    await expect(this.twoRolesSection).toBeVisible();
  }

  async expectFooterDisclaimerVisible() {
    await this.footerDisclaimer.scrollIntoViewIfNeeded();
    await expect(this.footerDisclaimer).toBeVisible();
  }
}
