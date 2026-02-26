/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Thermo Fisher website cleanup
 * Purpose: Remove site-wide non-content elements before and after block parsing
 * Applies to: www.thermofisher.com (all templates)
 * Generated: 2026-02-26
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration of financial-leasing-services page
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove header/navigation elements
    // EXTRACTED: Found <header id="global-header"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '#global-header',
      '#globalHeaderNavigation',
      '.global-header',
      '#global-search',
    ]);

    // Remove footer elements
    // EXTRACTED: Found <footer id="global-footer"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '#global-footer',
      '.global-footer',
    ]);

    // Remove cookie consent and tracking elements
    // EXTRACTED: Found consent and tracking elements in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '#consent_blackbar',
      '#teconsent',
      '.truste_overlay',
      '.truste_box_overlay',
    ]);

    // Remove accessibility widget
    // EXTRACTED: Found UserWay widget elements in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.userway_buttons_wrapper',
      '#userwayAccessibilityIcon',
    ]);

    // Remove feedback banner
    // EXTRACTED: Found feedback image/link in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '[class*="givefeedback"]',
    ]);

    // Remove breadcrumb navigation
    // EXTRACTED: Found breadcrumb elements in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.breadcrumb',
      '.breadcrumbs',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining non-content elements
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
      'source',
    ]);

    // Clean up tracking attributes
    const allElements = element.querySelectorAll('*');
    allElements.forEach((el) => {
      el.removeAttribute('onclick');
      el.removeAttribute('data-track');
      el.removeAttribute('data-analytics');
    });
  }
}
