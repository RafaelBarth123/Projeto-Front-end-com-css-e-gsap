// ==========================================================================
// Truck component — the protagonist of the journey.
// A single SVG template is stamped into every `[data-truck]` stage so the
// rig looks identical from the hero to the final delivery scene.
// ==========================================================================

const TRUCK_MARKUP = `
<svg class="truck" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse class="truck__shadow" cx="410" cy="256" rx="350" ry="16"></ellipse>

  <g class="truck__trailer">
    <rect class="truck__body-trailer" x="55" y="68" width="435" height="152" rx="8"></rect>
    <rect class="truck__body-trailer-shade" x="55" y="188" width="435" height="32"></rect>
    <rect class="truck__trailer-stripe" x="55" y="150" width="435" height="16"></rect>
    <text class="truck__trailer-logo" x="140" y="128" font-size="36">VANTRA</text>
  </g>

  <g class="truck__door" data-truck-door>
    <rect class="truck__body-trailer" x="52" y="76" width="14" height="136" rx="2"></rect>
  </g>

  <rect class="truck__chassis" x="55" y="214" width="640" height="16"></rect>

  <g class="truck__cab">
    <path class="truck__cab-body" d="M505 220 L505 128 Q505 98 534 98 L612 98 Q642 98 662 130 L702 176 L742 176 Q758 176 758 196 L758 220 Z"></path>
    <path class="truck__cab-body-dark" d="M505 220 L505 188 L758 188 L758 220 Z"></path>
    <path class="truck__cab-window" d="M538 110 L608 110 Q624 110 634 126 L650 154 L548 154 Q538 154 538 144 Z"></path>
    <line class="truck__cab-window-frame" x1="596" y1="110" x2="596" y2="154" stroke-width="3"></line>
    <circle class="truck__headlight-glow" cx="750" cy="186" r="22"></circle>
    <circle class="truck__headlight" cx="750" cy="186" r="8"></circle>
    <rect class="truck__bumper" x="742" y="206" width="22" height="16" rx="3"></rect>
    <circle class="truck__taillight" cx="510" cy="186" r="6"></circle>
  </g>

  <rect class="truck__exhaust-pipe" x="470" y="92" width="10" height="46"></rect>
  <g class="truck__smoke-group" data-smoke>
    <circle cx="475" cy="88" r="7"></circle>
    <circle cx="475" cy="88" r="9"></circle>
    <circle cx="475" cy="88" r="5"></circle>
  </g>

  <g class="truck__wheel" data-wheel><circle class="truck__wheel-tire" cx="140" cy="230" r="36"></circle><circle class="truck__wheel-hub" cx="140" cy="230" r="16"></circle><g class="truck__wheel-spokes"><line x1="140" y1="198" x2="140" y2="262"></line><line x1="108" y1="230" x2="172" y2="230"></line><line x1="118" y1="208" x2="162" y2="252"></line><line x1="118" y1="252" x2="162" y2="208"></line></g></g>

  <g class="truck__wheel" data-wheel><circle class="truck__wheel-tire" cx="270" cy="230" r="36"></circle><circle class="truck__wheel-hub" cx="270" cy="230" r="16"></circle><g class="truck__wheel-spokes"><line x1="270" y1="198" x2="270" y2="262"></line><line x1="238" y1="230" x2="302" y2="230"></line><line x1="248" y1="208" x2="292" y2="252"></line><line x1="248" y1="252" x2="292" y2="208"></line></g></g>

  <g class="truck__wheel" data-wheel><circle class="truck__wheel-tire" cx="655" cy="230" r="36"></circle><circle class="truck__wheel-hub" cx="655" cy="230" r="16"></circle><g class="truck__wheel-spokes"><line x1="655" y1="198" x2="655" y2="262"></line><line x1="623" y1="230" x2="687" y2="230"></line><line x1="633" y1="208" x2="677" y2="252"></line><line x1="633" y1="252" x2="677" y2="208"></line></g></g>

  <g class="truck__wheel" data-wheel><circle class="truck__wheel-tire" cx="715" cy="230" r="36"></circle><circle class="truck__wheel-hub" cx="715" cy="230" r="16"></circle><g class="truck__wheel-spokes"><line x1="715" y1="198" x2="715" y2="262"></line><line x1="683" y1="230" x2="747" y2="230"></line><line x1="693" y1="208" x2="737" y2="252"></line><line x1="693" y1="252" x2="737" y2="208"></line></g></g>
</svg>`;

const DOOR_ORIGIN = '52px 144px';

function wheelOrigin(wheel) {
  const tire = wheel.querySelector('.truck__wheel-tire');
  return `${tire.getAttribute('cx')}px ${tire.getAttribute('cy')}px`;
}

/** Stamps the truck SVG into every stage element found in `root`. */
export function mountTrucks(root = document) {
  const stages = root.querySelectorAll('[data-truck]');
  stages.forEach((stage) => {
    stage.innerHTML = TRUCK_MARKUP;
    const truck = stage.querySelector('.truck');
    truck.querySelectorAll('[data-wheel]').forEach((wheel) => {
      wheel.style.transformOrigin = wheelOrigin(wheel);
    });
    const door = truck.querySelector('[data-truck-door]');
    if (door) door.style.transformOrigin = DOOR_ORIGIN;
  });
  return Array.from(stages).map((stage) => stage.querySelector('.truck'));
}

export function getWheels(truckEl) {
  return truckEl.querySelectorAll('[data-wheel]');
}

export function getSmoke(truckEl) {
  return truckEl.querySelector('[data-smoke]');
}

export function getDoor(truckEl) {
  return truckEl.querySelector('[data-truck-door]');
}

/**
 * Spins every wheel across the *entire* duration of `tl` (call this last,
 * after every other tween has been added, so `tl.duration()` reflects the
 * scene's full length).
 *
 * This deliberately does not use GSAP's `rotation`/`transformOrigin` tween
 * properties: GSAP's CSSPlugin resets `transform-origin` to "0px 0px" for
 * nested SVG `<g>` elements regardless of what's requested (confirmed by
 * comparing against a plain CSS `transform: rotate()`, which respects the
 * origin correctly), sending each wheel spinning around the truck's corner
 * instead of its own hub. Tweening a plain numeric proxy and writing the
 * `rotate()` string ourselves on every update sidesteps that bug entirely.
 */
export function spinWheels(tl, wheels, totalDegrees = 360 * 9) {
  const total = Math.max(tl.duration(), 1);
  wheels.forEach((wheel) => {
    const proxy = { angle: 0 };
    tl.to(proxy, {
      angle: totalDegrees,
      duration: total,
      ease: 'none',
      onUpdate: () => { wheel.style.transform = `rotate(${proxy.angle}deg)`; },
    }, 0);
  });
}

/** Same GSAP/SVG origin workaround as `spinWheels`, for the trailer door. */
export function swingDoor(tl, door, degrees, position, duration) {
  const proxy = { angle: 0 };
  tl.to(proxy, {
    angle: degrees,
    duration,
    ease: 'power2.inOut',
    onUpdate: () => { door.style.transform = `rotate(${proxy.angle}deg)`; },
  }, position);
}
