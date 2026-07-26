import { mountTrucks } from './modules/truck.js';
import { initSplitText } from './modules/splitText.js';
import { initSmoothScroll } from './modules/smoothScroll.js';
import { initLoader } from './modules/loader.js';
import { initCursor } from './modules/cursor.js';
import { initNavbar } from './modules/navbar.js';
import { initHero } from './modules/hero.js';
import { initJourney } from './modules/journey.js';
import { initReveals } from './modules/reveal.js';
import { initCounters } from './modules/counters.js';
import { initCarousel } from './modules/carousel.js';
import { initFleetTrack, initGalleryScroll } from './modules/horizontalSections.js';
import { initContactForm } from './modules/contactForm.js';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

document.addEventListener('DOMContentLoaded', () => {
  mountTrucks();
  initSplitText();

  const lenis = initSmoothScroll();
  lenis.stop();
  document.documentElement.style.overflow = 'hidden';

  initCursor();
  initNavbar();
  initJourney();
  initReveals();
  initCounters();
  initCarousel();
  initFleetTrack();
  initGalleryScroll();
  initContactForm();

  initLoader(() => {
    document.documentElement.style.overflow = '';
    lenis.start();
    initHero();
    ScrollTrigger.refresh();
  });
});
