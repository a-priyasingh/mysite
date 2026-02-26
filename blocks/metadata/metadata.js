/**
 * @param {Element} block The metadata block element
 */
export default function decorate(block) {
  const section = block.closest('.section');
  if (section) section.remove();
}
