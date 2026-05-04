/**
 * Fetches the title of a page at the given URL.
 * @param {string} url The URL to fetch
 * @returns {Promise<string>} The page title, or empty string on failure
 */
async function getPageTitle(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const html = await resp.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.querySelector('title')?.innerText || '';
    }
  } catch {
    // page doesn't exist or fetch failed
  }
  return '';
}

/**
 * Builds an array of breadcrumb entries from the current URL path.
 * @param {string} pathname The current page pathname
 * @returns {Promise<Array<{path: string, name: string, url: string}>>}
 */
async function buildBreadcrumbEntries(pathname) {
  const entries = [];
  const segments = pathname.replace(/^\/|\/$/g, '').split('/');

  // build entries for all segments except the last (current page)
  for (let i = 0; i < segments.length - 1; i += 1) {
    const prevPath = entries[i - 1] ? entries[i - 1].path : '';
    const path = `${prevPath}/${segments[i]}`;
    const url = `${window.location.origin}${path}`;
    /* eslint-disable-next-line no-await-in-loop */
    const name = await getPageTitle(url);
    if (name) {
      entries.push({ path, name, url });
    }
  }
  return entries;
}

/**
 * Reads the start level from authored block content.
 * Authors can add a row like "Start Level: 2" to skip path segments.
 * @param {Element} block The block element
 * @returns {number} The start level (0 = include all, 1 = skip first segment, etc.)
 */
function getStartLevel(block) {
  let level = 0;
  [...block.querySelectorAll(':scope > div')].some((row) => {
    const match = row.textContent.trim().match(/start\s*level\s*[:\s]\s*(\d+)/i);
    if (match) {
      level = parseInt(match[1], 10);
      return true;
    }
    return false;
  });
  return level;
}

/**
 * Loads and decorates the breadcrumb block.
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const startLevel = getStartLevel(block);
  block.textContent = '';

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');

  const entries = await buildBreadcrumbEntries(window.location.pathname);

  // apply start level: skip the first N entries
  const visibleEntries = entries.slice(startLevel);

  // add "Home" as the first crumb only if startLevel is 0
  if (startLevel === 0) {
    const homeLi = document.createElement('li');
    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = 'Home';
    homeLi.append(homeLink);
    ol.append(homeLi);
  }

  // add ancestor pages
  visibleEntries.forEach((entry) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = entry.url;
    a.textContent = entry.name;
    li.append(a);
    ol.append(li);
  });

  // add current page (no link)
  const currentLi = document.createElement('li');
  currentLi.setAttribute('aria-current', 'page');
  currentLi.textContent = document.querySelector('title')?.innerText || '';
  ol.append(currentLi);

  nav.append(ol);
  block.append(nav);
}
