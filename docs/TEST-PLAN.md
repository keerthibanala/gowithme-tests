# GoWithMe - Test Plan & Documentation

> Automated E2E tests for [https://gowithme.app](https://gowithme.app) using Playwright.

## Application Overview

GoWithMe is a free platform that connects travelers with flight companions for airport assistance. Key features include:

- **Two user roles**: Traveler (needs help) and Companion (provides help)
- **Trip management**: Upload PDF itinerary or manual entry; multi-leg trip support
- **Discovery**: Browse companions by route and date
- **Matching**: Automatic matching based on routes, dates, airports
- **In-app chat**: Coordinate travel details between matched users
- **Tipping**: Optional tipping via external platforms (Venmo, etc.)
- **Authentication**: Google sign-in

---

## Test Suites

### 1. Smoke Tests — `tests/smoke/`

#### `landing-page.spec.ts` — Landing Page Core

| Test Name | What It Validates |
|-----------|-------------------|
| should load the homepage successfully | Homepage loads at `/` with correct title containing "gowithme" |
| should display the hero section with correct heading | "Travel with confidence" hero heading is visible |
| should display the Get Started CTA button | Primary `<button>` CTA is rendered and visible |
| should display Sign In button in header | Sign In button is visible in the header navigation |
| should display both Traveler and Companion role cards | Both "I'm a Traveler" and "I'm a Companion" descriptions are visible |
| should display platform disclaimer in footer | Disclaimer text "Platform disclaimer" is present at page bottom |
| should display the Discover Companions label | "Discover companions" label is visible on the page |
| should have correct meta title | Page `<title>` contains "gowithme" |
| should respond with HTTP 200 | Server returns 200 OK for `/` |

#### `content-sections.spec.ts` — Landing Page Content

| Test Name | What It Validates |
|-----------|-------------------|
| should display "Two roles, one platform" section | "Whether you need help" heading is visible |
| should describe the Traveler role with correct content | "Need help navigating airports" text is present |
| should describe the Companion role with correct content | "Already flying? Help a fellow traveler" text is present |
| should display Option A flow for discovering companions first | Steps: browse companions, book flight to match, join trip are all visible |
| should display Option B flow for uploading existing itinerary | Steps: upload itinerary, wait for match are visible |
| should display companion flow steps | Steps: sign in & add trip, wait for travelers, coordinate via chat are visible |
| should display add trips section | "Add trips your way" with upload/manual options visible |
| should display tipping information | "Free to use. Tip to say thanks" section with "no fees" info |
| should display community trust section | "Built on trust" with community-driven, smart matching features |
| should display the CTA section | "Ready to travel together?" bottom CTA heading visible |

#### `accessibility.spec.ts` — Basic Accessibility Checks

| Test Name | What It Validates |
|-----------|-------------------|
| homepage should have proper heading hierarchy | H1-H6 hierarchy exists, max 2 h1 elements |
| homepage images should have alt text | All non-decorative `<img>` elements have alt text |
| homepage links should have accessible text | All visible `<a>` links have text content or aria-label |
| terms page should have proper heading hierarchy | Terms page has correct heading structure |
| page should have a lang attribute on html tag | `<html>` element has `lang` attribute |
| page should have meta viewport tag for mobile | `<meta name="viewport">` tag is present |

#### `responsive.spec.ts` — Responsive Design

| Test Name | What It Validates |
|-----------|-------------------|
| homepage should load correctly on desktop viewport | Hero visible at 1440x900 |
| homepage should load correctly on tablet viewport | Hero visible at 768x1024 |
| homepage should load correctly on mobile viewport | Hero visible at 375x667 |
| Get Started button should be visible on mobile | CTA remains visible at 375x667 |
| content should not overflow horizontally on mobile | `document.body.scrollWidth` <= 380px |

### 2. Navigation Tests — `tests/navigation/`

#### `navigation.spec.ts` — Page Navigation

| Test Name | What It Validates |
|-----------|-------------------|
| should navigate to Terms of Service via footer link | Footer Terms link opens terms page in new tab |
| Get Started button should trigger sign-in flow | CTA triggers navigation (Google auth or redirect) |
| Sign In button should trigger authentication | Header Sign In button initiates auth flow |
| should be able to navigate back to homepage from Terms | GoWithMe link on terms page navigates back to homepage |
| homepage logo should be visible and contain GoWithMe text | Logo button is visible and contains "GoWithMe" |
| footer should contain Terms, Privacy links | Both Terms and Privacy links are present in footer |

#### `terms-page.spec.ts` — Terms of Service Page

| Test Name | What It Validates |
|-----------|-------------------|
| should load terms page with correct heading | "Terms of Service" heading is visible |
| should display the last updated date | "Last updated" text is present |
| should contain all required legal sections | All 18 legal sections (Acceptance of Terms through Contact) are present |
| should display the platform disclaimer at the top | Disclaimer text is visible at top |
| should have contact information | `legal@vibeitlabs.com` mailto link is present |
| should respond with HTTP 200 | Server returns 200 OK for `/terms.html` |

### 3. Discover Tests — `tests/discover/`

#### `discover-page.spec.ts` — Discover Page

| Test Name | What It Validates |
|-----------|-------------------|
| should navigate to discover and verify redirection behavior | `/discover` either loads or redirects to login |
| should show discover page or prompt login when accessing directly | No 5xx server errors on direct access |

### 4. Authentication Tests — `tests/auth/`

#### `auth-flow.spec.ts` — Authentication Flow

| Test Name | What It Validates |
|-----------|-------------------|
| Get Started button should trigger Google sign-in | CTA leads to Google sign-in or auth-related page |
| Sign In header button should trigger authentication | Sign In button is visible and triggers auth flow |
| protected pages should require authentication | `/dashboard` redirects unauthenticated users |
| discover page should handle unauthenticated access gracefully | No server errors for unauthenticated discover access |

---

## Architecture

```
gowithme-tests/
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── base.page.ts    # Abstract base class with common methods
│   │   ├── home.page.ts    # Homepage locators and actions
│   │   ├── discover.page.ts # Discover page locators
│   │   ├── terms.page.ts   # Terms of Service page locators
│   │   └── index.ts        # Barrel export
│   ├── fixtures/           # Playwright custom fixtures
│   │   └── test.fixture.ts # Page object injection
│   └── helpers/            # Utility functions
│       ├── constants.ts    # URLs, timeouts, sample data
│       └── accessibility.ts # A11y check utilities
├── tests/
│   ├── smoke/              # Smoke, content, a11y, responsive tests
│   ├── navigation/         # Page navigation and terms page tests
│   ├── discover/           # Discover feature tests
│   └── auth/               # Authentication flow tests
├── docs/
│   └── TEST-PLAN.md        # This file — living test documentation
├── .cursor/rules/          # Cursor AI rules for project conventions
├── playwright.config.ts    # Multi-browser config (Chromium, Firefox, Mobile)
├── tsconfig.json
└── package.json
```

## Running Tests

```bash
npm test                    # Run all tests (all browsers)
npm run test:smoke          # Smoke tests only
npm run test:navigation     # Navigation tests only
npm run test:discover       # Discover page tests
npm run test:auth           # Auth flow tests
npm run test:chromium       # Chromium only
npm run test:firefox        # Firefox only
npm run test:mobile         # Mobile Chrome only
npm run test:headed         # Run with browser visible
npm run test:debug          # Run in debug mode with inspector
npm run test:ui             # Open Playwright UI mode
npm run report              # View HTML test report
```

---

## Test Coverage Summary

| Area | Tests | Status |
|------|-------|--------|
| Landing Page Core | 9 | Active |
| Content Sections | 10 | Active |
| Accessibility | 6 | Active |
| Responsive Design | 5 | Active |
| Navigation | 6 | Active |
| Terms of Service | 6 | Active |
| Discover Page | 2 | Active |
| Authentication | 4 | Active |
| **Total** | **48** | **All Passing** |

---

*Last updated: March 3, 2026*
