// ==========================================================================
// Loading screen — fake but smooth progress, then reveals the hero.
// ==========================================================================

export function initLoader(onComplete) {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  const percent = document.getElementById('loaderPercent');

  const counter = { value: 0 };

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          onComplete?.();
        },
      });
    },
  });

  tl.to(counter, {
    value: 100,
    duration: 1.6,
    ease: 'power2.inOut',
    onUpdate: () => {
      const v = Math.round(counter.value);
      fill.style.width = `${v}%`;
      percent.textContent = `${v}%`;
    },
  });
}
