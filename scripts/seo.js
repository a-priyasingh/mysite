/**
 * SEO utilities for Thermo Fisher Scientific EDS migration.
 * Handles JSON-LD structured data, hreflang injection, and canonical URL management.
 */

const SITE_NAME = 'Thermo Fisher Scientific';
const SITE_URL = 'https://www.thermofisher.com';
const LOGO_URL = `${SITE_URL}/logo.jpg`;
const DEFAULT_OG_IMAGE = `${SITE_URL}/content/dam/LifeTech/Images/og-image/og-image-tfs-logo-1200x628.jpg`;

/**
 * Locale configuration for hreflang generation.
 * Maps hreflang codes to URL path prefixes.
 */
const LOCALE_MAP = [
  { hreflang: 'en-us', prefix: '/us/en', domain: 'www.thermofisher.com' },
  { hreflang: 'es-es', prefix: '/es/es', domain: 'www.thermofisher.com' },
  { hreflang: 'fr-fr', prefix: '/fr/fr', domain: 'www.thermofisher.com' },
  { hreflang: 'de-de', prefix: '/de/de', domain: 'www.thermofisher.com' },
  { hreflang: 'ja-jp', prefix: '/jp/ja', domain: 'www.thermofisher.com' },
  { hreflang: 'ko-kr', prefix: '/kr/ko', domain: 'www.thermofisher.com' },
  { hreflang: 'zh-cn', prefix: '/cn/zh', domain: 'www.thermofisher.cn' },
  { hreflang: 'zh-tw', prefix: '/tw/zt', domain: 'www.thermofisher.com' },
  { hreflang: 'zh-hk', prefix: '/hk/zt', domain: 'www.thermofisher.com' },
  { hreflang: 'pt-br', prefix: '/br/pt', domain: 'www.thermofisher.com' },
  { hreflang: 'ru-ru', prefix: '/ru/ru', domain: 'www.thermofisher.com' },
  { hreflang: 'en-gb', prefix: '/uk/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-ca', prefix: '/ca/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-au', prefix: '/au/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-in', prefix: '/in/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-sg', prefix: '/sg/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-za', prefix: '/za/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-hk', prefix: '/hk/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-tw', prefix: '/tw/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-kr', prefix: '/kr/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-jp', prefix: '/jp/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-cn', prefix: '/cn/en', domain: 'www.thermofisher.cn' },
  { hreflang: 'en-br', prefix: '/br/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-fr', prefix: '/fr/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-de', prefix: '/de/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-es', prefix: '/es/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-ru', prefix: '/ru/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-mx', prefix: '/mx/en', domain: 'www.thermofisher.com' },
  { hreflang: 'es-mx', prefix: '/mx/es', domain: 'www.thermofisher.com' },
  { hreflang: 'en-ar', prefix: '/ar/en', domain: 'www.thermofisher.com' },
  { hreflang: 'es-ar', prefix: '/ar/es', domain: 'www.thermofisher.com' },
  { hreflang: 'en-cl', prefix: '/cl/en', domain: 'www.thermofisher.com' },
  { hreflang: 'es-cl', prefix: '/cl/es', domain: 'www.thermofisher.com' },
  { hreflang: 'en-id', prefix: '/id/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-tr', prefix: '/tr/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-sa', prefix: '/sa/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-ng', prefix: '/ng/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-io', prefix: '/io/en', domain: 'www.thermofisher.com' },
  { hreflang: 'en-ht', prefix: '/ht/en', domain: 'www.thermofisher.com' },
];

/**
 * Extracts the page path after the locale prefix.
 * e.g., /us/en/home/life-science/pcr.html → /home/life-science/pcr.html
 */
function getPagePath() {
  const { pathname } = window.location;
  const segments = pathname.split('/');
  // URL pattern: /{country}/{lang}/...
  if (segments.length > 3) {
    return `/${segments.slice(3).join('/')}`;
  }
  return pathname;
}

/**
 * Gets the current locale prefix from the URL.
 */
function getCurrentLocalePrefix() {
  const { pathname } = window.location;
  const segments = pathname.split('/');
  if (segments.length > 2) {
    return `/${segments[1]}/${segments[2]}`;
  }
  return '/us/en';
}

/**
 * Reads a metadata value from the page's metadata block.
 */
function getMetadata(name) {
  const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
  return meta ? meta.content : '';
}

/**
 * Injects a JSON-LD script into the page head.
 */
function injectJsonLd(schema) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Generates and injects WebSite schema with SearchAction (homepage only).
 */
function injectWebSiteSchema() {
  injectJsonLd({
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search/results?query={search_term_string}&resultPage=1&resultsPerPage=15&autocomplete=`,
      'query-input': 'required name=search_term_string',
    },
  });
}

/**
 * Generates and injects Organization schema (homepage only).
 */
function injectOrganizationSchema() {
  injectJsonLd({
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    sameAs: [
      'https://twitter.com/thermofisher',
      'https://www.facebook.com/thermofisher',
      'https://www.linkedin.com/company/thermo-fisher-scientific',
      'https://www.youtube.com/channel/UCfUs2fCDhx07fkszsJ0jOcA',
    ],
    description: 'Thermo Fisher Scientific is an American multinational, biotechnology product development company, created in 2006 by the merger of Thermo Electron and Fisher Scientific.',
    logo: LOGO_URL,
    telephone: '+1-800-711-2088',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5823 Newton Drive',
      addressLocality: 'Carlsbad',
      addressRegion: 'CA',
      postalCode: '92008',
    },
  });
}

/**
 * Generates and injects BreadcrumbList schema from the breadcrumb block on the page.
 */
function injectBreadcrumbSchema() {
  const breadcrumbNav = document.querySelector('.breadcrumb nav ol');
  if (!breadcrumbNav) return;

  const items = [...breadcrumbNav.querySelectorAll('li')];
  if (items.length === 0) return;

  const itemListElement = items.map((li, index) => {
    const link = li.querySelector('a');
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: li.textContent.trim(),
      ...(link ? { item: link.href } : {}),
    };
  });

  injectJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  });
}

/**
 * Injects hreflang link elements into the page head.
 */
function injectHreflangTags() {
  const pagePath = getPagePath();
  const fragment = document.createDocumentFragment();

  LOCALE_MAP.forEach(({ hreflang, prefix, domain }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = `https://${domain}${prefix}${pagePath}`;
    fragment.appendChild(link);
  });

  // x-default points to US English
  const xDefault = document.createElement('link');
  xDefault.rel = 'alternate';
  xDefault.hreflang = 'x-default';
  xDefault.href = `https://www.thermofisher.com/us/en${pagePath}`;
  fragment.appendChild(xDefault);

  document.head.appendChild(fragment);
}

/**
 * Ensures canonical URL is set correctly.
 */
function ensureCanonical() {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  const canonicalOverride = getMetadata('canonical');
  if (canonicalOverride) {
    canonical.href = canonicalOverride;
  } else {
    const { origin, pathname } = window.location;
    canonical.href = `${origin}${pathname}`;
  }
}

/**
 * Ensures Open Graph tags are complete.
 */
function ensureOpenGraph() {
  const ogTags = {
    'og:title': getMetadata('og:title') || document.title,
    'og:description': getMetadata('og:description') || getMetadata('description'),
    'og:url': getMetadata('og:url') || window.location.href.split('?')[0],
    'og:type': getMetadata('og:type') || 'website',
    'og:image': getMetadata('og:image') || DEFAULT_OG_IMAGE,
    'og:locale': getMetadata('og:locale') || 'en_US',
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    if (!content) return;
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  });
}

/**
 * Determines if the current page is the homepage.
 */
function isHomepage() {
  const pagePath = getPagePath();
  return pagePath === '/home.html' || pagePath === '/home' || pagePath === '/';
}

/**
 * Main SEO initialization — call from delayed.js to avoid impacting LCP.
 */
export function initSEO() {
  ensureCanonical();
  ensureOpenGraph();
  injectHreflangTags();

  if (isHomepage()) {
    injectWebSiteSchema();
    injectOrganizationSchema();
  }

  // BreadcrumbList schema is injected after breadcrumb block decorates
  window.setTimeout(() => injectBreadcrumbSchema(), 100);
}

export {
  getMetadata,
  getPagePath,
  getCurrentLocalePrefix,
  LOCALE_MAP,
  SITE_NAME,
  SITE_URL,
};
