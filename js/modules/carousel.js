// ==========================================================================
// Testimonials carousel — auto-rotating slides with dot navigation.
// ==========================================================================

export function initCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsWrap = document.getElementById('testimonialDots');
  if (!slides.length || !dotsWrap) return;

  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('button');

  function goTo(index) {
    if (index === current) return;
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    gsap.fromTo(slides[current], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    restart();
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }

  restart();
}
