// ==========================================================================
// Text splitting via SplitType — chars for the hero headline, lines (with a
// masked wrapper) for every other heading so they reveal like sliding blinds.
// ==========================================================================

export function initSplitText() {
  document.querySelectorAll('[data-split-chars]').forEach((el) => {
    // Splitting into words + chars keeps each word atomic so the browser
    // never breaks a line in the middle of a word.
    new SplitType(el, { types: 'words, chars', tagName: 'span' });
  });

  document.querySelectorAll('[data-split-lines]').forEach((el) => {
    const split = new SplitType(el, { types: 'lines', tagName: 'span' });
    split.lines.forEach((line) => {
      const wrap = document.createElement('span');
      wrap.className = 'line-wrap';
      line.parentNode.insertBefore(wrap, line);
      wrap.appendChild(line);
    });
  });
}
