import { getSmoke } from './truck.js';

// ==========================================================================
// Hero: entrance timeline + "engine start" as soon as the user begins to
// scroll (headlights on, smoke, suspension bounce).
// ==========================================================================

function buildParticles() {
  const wrap = document.getElementById('heroParticles');
  if (!wrap) return;
  const count = window.innerWidth < 720 ? 16 : 34;
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 6 + Math.random() * 6;
    const size = 2 + Math.random() * 3;
    span.style.left = `${left}%`;
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    wrap.appendChild(span);
    gsap.to(span, {
      y: `-${60 + Math.random() * 30}vh`,
      x: `${(Math.random() - 0.5) * 120}`,
      opacity: 0,
      duration,
      delay,
      repeat: -1,
      ease: 'none',
      onRepeat: () => gsap.set(span, { y: 0, opacity: 0.7 }),
    });
  }
}

export function initHero() {
  buildParticles();

  const truckEl = document.querySelector('#heroTruckStage .truck');
  if (!truckEl) return;

  const smoke = getSmoke(truckEl);

  // Entrance timeline
  const tl = gsap.timeline({ delay: 0.2 });
  tl.from('.hero__truck-stage', { y: 80, opacity: 0, duration: 1.2, ease: 'power3.out' })
    .from('[data-split-chars] .char', {
      yPercent: 120,
      opacity: 0,
      duration: 0.9,
      stagger: 0.02,
      ease: 'power4.out',
    }, '-=0.8')
    .to('[data-reveal]', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.5');

  // Suspension idle bounce
  gsap.to('.hero__truck-stage', {
    y: -6,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  // Smoke puffs loop (idle, subtle)
  if (smoke) {
    gsap.to(smoke.children, {
      y: -18,
      opacity: 0,
      duration: 1.6,
      stagger: 0.3,
      repeat: -1,
      ease: 'power1.out',
      transformOrigin: 'center',
    });
  }

  // Engine start + journey begins as user scrolls past the hero.
  const startTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
    },
  });
  startTl.to(truckEl, { duration: 0.3 }, 0)
    .call(() => truckEl.classList.add('is-lights-on'), null, 0)
    .to('.hero__road-lines', { backgroundPositionX: -400, ease: 'none' }, 0)
    .to('.hero__content', { yPercent: -30, opacity: 0.3, ease: 'none' }, 0)
    .to('.hero__truck-stage', { x: '18vw', ease: 'none' }, 0);
}
