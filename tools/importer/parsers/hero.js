/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero block
 *
 * Source: https://www.thermofisher.com/in/en/home/products-and-services/services/financial-leasing-services.html
 * Base Block: hero
 *
 * Block Structure (from block library example):
 * - Row 1: Background image (optional)
 * - Row 2: Content (heading, subheading, CTAs)
 *
 * Source HTML Pattern:
 * <div class="well-cmp">
 *   <div class="well well-gray-lighter well-mini">
 *     <div class="hero-banner">
 *       <link href="...hero-image.jpeg">  (background image)
 *       <div class="hero-banner-content">
 *         <h1>Financial and Leasing Solutions</h1>
 *         <p>Flexible financial solutions...</p>
 *         <a href="mailto:...">Contact us</a>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-02-26
 */
export default function parse(element, { document }) {
  // Extract background image
  // VALIDATED: Found <link href="...hero-image.jpeg"> in captured DOM inside .well-cmp
  const bgLink = element.querySelector('link[href*=".jpeg"], link[href*=".jpg"], link[href*=".png"]');
  let bgImage = null;
  if (bgLink) {
    bgImage = document.createElement('img');
    bgImage.src = bgLink.getAttribute('href');
    bgImage.alt = 'Hero background';
  }

  // Also check for img element as fallback
  // VALIDATED: Some pages may use <img> instead of <link>
  if (!bgImage) {
    bgImage = element.querySelector('img[class*="hero"], img[class*="background"]');
  }

  // Extract heading
  // VALIDATED: Found <h1>Financial and Leasing Solutions</h1> inside .hero-banner-content
  const heading = element.querySelector('.hero-banner-content h1') ||
                  element.querySelector('h1') ||
                  element.querySelector('h2');

  // Extract subtitle/description
  // VALIDATED: Found <p>Flexible financial solutions...</p> inside .hero-banner-content
  const description = element.querySelector('.hero-banner-content p') ||
                      element.querySelector('p');

  // Extract CTA links
  // VALIDATED: Found <a href="mailto:...">Contact us</a> in .hero-banner-content
  const ctaLinks = Array.from(
    element.querySelectorAll('.hero-banner-content a, .hero-cta a, a.btn, a.cta')
  );

  // Build cells array matching block library hero structure
  const cells = [];

  // Row 1: Background image (optional)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content (heading, description, CTAs)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...ctaLinks);
  cells.push(contentCell);

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
