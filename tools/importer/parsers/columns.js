/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns block
 *
 * Source: https://www.thermofisher.com/in/en/home/products-and-services/services/financial-leasing-services.html
 * Base Block: columns
 *
 * Block Structure (from block library example):
 * - Row 1: Multiple columns with text content side by side
 *
 * Source HTML Pattern:
 * <div class="parsys_column cq-colctrl-lt3">
 *   <div class="parsys_column cq-colctrl-lt3-c0">
 *     <h3>Advice you can trust</h3>
 *     <p>Description text...</p>
 *   </div>
 *   <div class="parsys_column cq-colctrl-lt3-c1">
 *     <h3>Personalized, innovative solutions</h3>
 *     <p>Description text...</p>
 *   </div>
 *   <div class="parsys_column cq-colctrl-lt3-c2">
 *     <h3>Committed to your success</h3>
 *     <p>Description text...</p>
 *   </div>
 * </div>
 *
 * Generated: 2026-02-26
 */
export default function parse(element, { document }) {
  // Find the parent columns container
  // VALIDATED: Found .parsys_column.cq-colctrl-lt3 containing c0, c1, c2 children
  const container = element.closest('.parsys_column.cq-colctrl-lt3') || element;

  // Extract individual column cells
  // VALIDATED: Found .cq-colctrl-lt3-c0, .cq-colctrl-lt3-c1, .cq-colctrl-lt3-c2
  const columnDivs = Array.from(
    container.querySelectorAll('[class*="cq-colctrl-lt3-c"]')
  ).filter((el) => {
    // Only include direct column children (c0, c1, c2), not nested sub-columns
    return /cq-colctrl-lt3-c\d+$/.test(el.className);
  });

  // Build cells array - each column becomes a cell in a single row
  const row = [];

  columnDivs.forEach((colDiv) => {
    // Extract all content from this column
    const heading = colDiv.querySelector('h3, h2, h4');
    const paragraphs = Array.from(colDiv.querySelectorAll('p'));
    const links = Array.from(colDiv.querySelectorAll('a'));

    const cellContent = [];
    if (heading) cellContent.push(heading);
    cellContent.push(...paragraphs);
    cellContent.push(...links.filter((a) => !paragraphs.some((p) => p.contains(a))));

    if (cellContent.length > 0) {
      row.push(cellContent);
    }
  });

  // Only create block if we found columns
  if (row.length > 0) {
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: 'Columns', cells });
    element.replaceWith(block);
  }
}
