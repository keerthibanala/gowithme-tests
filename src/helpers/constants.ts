export const URLS = {
  BASE: 'https://gowithme.app',
  HOME: '/',
  DISCOVER: '/discover',
  TERMS: '/terms.html',
} as const;

export const TIMEOUTS = {
  PAGE_LOAD: 15_000,
  ELEMENT_VISIBLE: 10_000,
  ANIMATION: 2_000,
} as const;

export const ROUTES = {
  SAMPLE: {
    FROM: 'HYD',
    TO: 'JFK',
  },
} as const;

export const SEO = {
  EXPECTED_TITLE_PATTERN: /gowithme/i,
  EXPECTED_META_DESCRIPTION: /travel|companion|airport/i,
} as const;
