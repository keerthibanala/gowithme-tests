# GoWithMe - E2E Test Suite

Automated end-to-end tests for [GoWithMe](https://gowithme.app) using [Playwright](https://playwright.dev).

## Quick Start

```bash
npm install
npx playwright install
npm test
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:smoke` | Smoke tests only |
| `npm run test:navigation` | Navigation tests only |
| `npm run test:discover` | Discover page tests |
| `npm run test:auth` | Authentication flow tests |
| `npm run test:chromium` | Run on Chromium only |
| `npm run test:firefox` | Run on Firefox only |
| `npm run test:mobile` | Run on mobile Chrome |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Debug mode with inspector |
| `npm run test:ui` | Playwright UI mode |
| `npm run report` | Open HTML test report |

## Project Structure

```
├── src/
│   ├── pages/          # Page Object Models
│   ├── fixtures/       # Custom Playwright fixtures
│   └── helpers/        # Utilities & constants
├── tests/
│   ├── smoke/          # Landing page, a11y, responsive
│   ├── navigation/     # Page navigation & terms
│   ├── discover/       # Discover feature
│   └── auth/           # Authentication flows
├── docs/
│   └── TEST-PLAN.md    # Living test documentation
└── playwright.config.ts
```

## Documentation

See [docs/TEST-PLAN.md](docs/TEST-PLAN.md) for the full test plan with every test documented.
