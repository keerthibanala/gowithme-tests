import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page.js';

export class TermsPage extends BasePage {
  readonly path = '/terms.html';

  readonly heading: Locator;
  readonly lastUpdatedText: Locator;
  readonly sections: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: /terms of service/i });
    this.lastUpdatedText = page.getByText(/last updated/i);
    this.sections = page.locator('h2');
  }

  async expectPageLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async expectAllSectionsPresent() {
    const expectedSections = [
      'Acceptance of Terms',
      'Description of Service',
      'Eligibility',
      'User Accounts',
      'User Conduct',
      'Traveler and Companion Responsibilities',
      'Tipping and Compensation',
      'No Safety or Security Guarantees',
      'Intellectual Property',
      'User Content',
      'Limitation of Liability',
      'Assumption of Risk',
      'Indemnification',
      'Dispute Resolution',
      'Termination',
      'Changes to Terms',
      'Governing Law',
      'Contact',
    ];

    for (const section of expectedSections) {
      await expect(this.page.getByRole('heading', { name: new RegExp(section, 'i') })).toBeVisible();
    }
  }
}
