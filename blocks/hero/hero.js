export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const bgPicture = block.querySelector('picture');
  const isForeground = block.classList.contains('foreground-image');

  let foregroundPicture = null;
  if (isForeground && rows[0]) {
    const pics = rows[0].querySelectorAll('picture');
    if (pics.length > 1) [, foregroundPicture] = pics;
  }

  const contentEls = [];
  rows.forEach((row, i) => {
    if (i === 0) return;
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.textContent.trim() || cell.querySelector('a') || cell.querySelector('picture')) {
        contentEls.push(cell);
      }
    });
  });

  block.textContent = '';

  if (bgPicture) {
    const bgWrapper = document.createElement('div');
    bgWrapper.className = 'hero-bg';
    bgWrapper.append(bgPicture);
    block.append(bgWrapper);
  }

  if (block.classList.contains('gradient-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    block.append(overlay);
  }

  const content = document.createElement('div');
  content.className = 'hero-content';

  contentEls.forEach((el) => {
    const links = el.querySelectorAll('a');
    if (links.length > 0 && el.textContent.trim() === [...links].map((a) => a.textContent.trim()).join('')) {
      links.forEach((a) => {
        const wrapper = document.createElement('p');
        wrapper.className = 'hero-cta';
        a.className = 'button';
        wrapper.append(a);
        content.append(wrapper);
      });
    } else {
      [...el.children].forEach((child) => content.append(child));
      if (!el.children.length && el.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = el.textContent.trim();
        content.append(p);
      }
    }
  });

  block.append(content);

  if (foregroundPicture) {
    const fgWrapper = document.createElement('div');
    fgWrapper.className = 'hero-foreground';
    fgWrapper.append(foregroundPicture);
    block.append(fgWrapper);
  }
}
