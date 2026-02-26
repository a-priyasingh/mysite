/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards block
 *
 * Source: https://www.thermofisher.com/in/en/home/products-and-services/services/financial-leasing-services.html
 * Base Block: cards
 *
 * Block Structure (from block library example):
 * - Each row: [image | title + description + optional CTA]
 *
 * Source HTML Pattern:
 * <div class="parsys_column cq-colctrl-bordered-lt3">
 *   <div class="parsys_column cq-colctrl-bordered-lt3-c0">
 *     <div id="cq-image-..."><img src="..."></div>
 *     <h3>Technology refresh</h3>
 *     <p>Description text...</p>
 *   </div>
 *   <div class="parsys_column cq-colctrl-bordered-lt3-c1">
 *     ...
 *   </div>
 *   <div class="parsys_column cq-colctrl-bordered-lt3-c2">
 *     ...
 *   </div>
 * </div>
 *
 * Generated: 2026-02-26
 */
export default function parse(element, { document }) {
  // Find all bordered column groups on the page
  // VALIDATED: Found multiple .parsys_column.cq-colctrl-bordered-lt3 groups in captured DOM
  const cardGroups = Array.from(
    element.querySelectorAll('.parsys_column.cq-colctrl-bordered-lt3')
  );

  // If element itself is the bordered container
  if (cardGroups.length === 0 && element.classList.contains('cq-colctrl-bordered-lt3')) {
    cardGroups.push(element);
  }

  const cells = [];

  cardGroups.forEach((group) => {
    // Extract individual card columns
    // VALIDATED: Found .cq-colctrl-bordered-lt3-c0, c1, c2 children
    const cardDivs = Array.from(
      group.querySelectorAll('[class*="cq-colctrl-bordered-lt3-c"]')
    );

    cardDivs.forEach((cardDiv) => {
      // Extract image
      // VALIDATED: Found <img> inside cq-image-jsp wrapper divs
      const image = cardDiv.querySelector('img');

      // Extract heading
      // VALIDATED: Found <h3> elements for card titles
      const heading = cardDiv.querySelector('h3, h2, h4, [class*="title"]');

      // Extract description paragraphs
      // VALIDATED: Found <p> elements for card descriptions
      const paragraphs = Array.from(cardDiv.querySelectorAll('p'));

      // Extract CTA links (if any)
      const links = Array.from(cardDiv.querySelectorAll('a')).filter(
        (a) => !paragraphs.some((p) => p.contains(a))
      );

      // Only add card if it has meaningful content
      if (heading || image || paragraphs.length > 0) {
        // Build card row: [image cell, text cell]
        const imageCell = image ? [image] : [''];
        const textContent = [];
        if (heading) textContent.push(heading);
        textContent.push(...paragraphs);
        textContent.push(...links);

        cells.push([imageCell, textContent]);
      }
    });
  });

  if (cells.length > 0) {
    const block = WebImporter.Blocks.createBlock(document, { name: 'Cards', cells });
    element.replaceWith(block);
  }
}
