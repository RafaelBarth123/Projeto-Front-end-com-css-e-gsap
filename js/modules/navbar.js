// ==========================================================================
// Navbar: solidifies on scroll, mobile burger menu, scroll progress bar.
// ==========================================================================

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const progressFill = document.getElementById('progressFill');

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      navbar.classList.toggle('is-scrolled', self.scroll() > 80);
    },
  });

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      gsap.set(progressFill, { scaleX: self.progress });
    },
  });

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
    });
  });
}
