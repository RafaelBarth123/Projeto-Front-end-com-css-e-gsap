// ==========================================================================
// Animated stat counters — count up once when the stats section enters view.
// ==========================================================================

export function initCounters() {
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const counter = { value: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value).toLocaleString('pt-BR')}${suffix}`;
          },
        });
      },
    });
  });
}
