// ==========================================================================
// Generic scroll reveals used across the standard content sections:
// fade-up blocks, masked line reveals, parallax drift, 3D card tilt,
// magnetic-glow buttons already handled in cursor.js.
// ==========================================================================

export function initReveals() {
  // Fade-up reveals (skip anything inside the hero — it has its own timeline)
  const fadeTargets = gsap.utils.toArray('[data-reveal]').filter((el) => !el.closest('.hero'));
  gsap.set(fadeTargets, { y: 28 });

  ScrollTrigger.batch(fadeTargets, {
    start: 'top 88%',
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }),
    once: true,
  });

  // Masked line reveals for headings (skip journey scenes — handled by journey.js)
  document.querySelectorAll('[data-split-lines]').forEach((heading) => {
    if (heading.closest('.scene')) return;
    const lines = heading.querySelectorAll('.line');
    gsap.set(lines, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(lines, { yPercent: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }),
    });
  });

  // Parallax drift
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.15;
    gsap.to(el, {
      y: () => -window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // 3D tilt for service cards
  document.querySelectorAll('.card-3d').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: px * 10,
        rotateX: -py * 10,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    });
  });
}
