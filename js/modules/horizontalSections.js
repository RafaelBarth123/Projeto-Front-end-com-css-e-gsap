// ==========================================================================
// Horizontal-scroll moments: the Fleet section pins and drags its track
// sideways as the page scrolls; the Gallery gets trackpad/wheel-to-horizontal
// convenience scrolling.
// ==========================================================================

export function initFleetTrack() {
  const track = document.getElementById('fleetTrack');
  const pinWrap = document.querySelector('.fleet__pin');
  if (!track || !pinWrap) return;

  const getDistance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.08;

  gsap.to(track, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: '.fleet',
      start: 'top top',
      end: () => `+=${getDistance() + window.innerHeight}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });
}

export function initGalleryScroll() {
  const row = document.getElementById('galleryRow');
  if (!row) return;
  row.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const atStart = row.scrollLeft <= 0 && e.deltaY < 0;
    const atEnd = row.scrollLeft >= row.scrollWidth - row.clientWidth - 1 && e.deltaY > 0;
    if (atStart || atEnd) return;
    e.preventDefault();
    row.scrollLeft += e.deltaY;
  }, { passive: false });
}
