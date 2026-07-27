import { getWheels, getSmoke, getDoor, spinWheels, swingDoor } from './truck.js';

// ==========================================================================
// The Journey — six pinned scenes the truck drives through. Each scene pins
// for a scroll distance while a scrubbed timeline drives parallax layers,
// the truck's wheels/suspension, and the scene's signature effect. A couple
// of ambient loops (smoke, rain, lightning, stars, clouds) run independently
// so the world feels alive, gated on/off as the scene enters/leaves view.
// ==========================================================================

const PIN_DISTANCE = '+=140%';

function idleTruckLife(truckEl) {
  const stage = truckEl.closest('.truck-stage');
  gsap.to(stage, { y: -5, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to(truckEl, { rotation: 0.35, duration: 0.35, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 100%' });
}

function smokeLoop(smoke) {
  if (!smoke) return null;
  return gsap.to(smoke.children, {
    y: -20,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    repeat: -1,
    ease: 'power1.out',
    paused: true,
  });
}

function gateLoop(triggerEl, tweenOrLoop) {
  if (!tweenOrLoop) return;
  ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => {
      if (typeof tweenOrLoop.start === 'function') {
        self.isActive ? tweenOrLoop.start() : tweenOrLoop.stop();
      } else {
        self.isActive ? tweenOrLoop.play() : tweenOrLoop.pause();
      }
    },
  });
}

function revealSceneText(tl, sceneEl, at = 0.1) {
  const lines = sceneEl.querySelectorAll('.scene__content .line');
  gsap.set(lines, { yPercent: 115 });
  tl.to(lines, { yPercent: 0, duration: 0.22, stagger: 0.06, ease: 'power4.out' }, at);
}

function parallax(tl, sceneEl, map) {
  Object.entries(map).forEach(([selector, speed]) => {
    const el = sceneEl.querySelector(selector);
    if (el) tl.to(el, { xPercent: -speed * 100, ease: 'none' }, 0);
  });
}

function scheduleLightning(el, reflectionEl) {
  let active = false;
  let timeoutId;
  const flash = () => {
    if (!active) return;
    gsap.timeline()
      .to(el, { opacity: 0.85, duration: 0.06 })
      .to(el, { opacity: 0, duration: 0.14 })
      .to(el, { opacity: 0.55, duration: 0.05 })
      .to(el, { opacity: 0, duration: 0.3 });
    if (reflectionEl) {
      gsap.fromTo(reflectionEl, { opacity: 0.4 }, { opacity: 0.12, duration: 0.5 });
    }
    timeoutId = setTimeout(flash, 1800 + Math.random() * 3200);
  };
  return {
    start() { if (active) return; active = true; timeoutId = setTimeout(flash, 900); },
    stop() { active = false; clearTimeout(timeoutId); },
  };
}

function buildStars(container, count = 50) {
  if (!container || container.childElementCount) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 90}%`;
    star.style.animationDelay = `${Math.random() * 2.4}s`;
    container.appendChild(star);
  }
}

/** Shared plumbing every scene needs: pin, scrub timeline, wheels, text. */
function baseScene(sceneEl) {
  const truckEl = sceneEl.querySelector('.truck');
  const wheels = getWheels(truckEl);
  const smoke = getSmoke(truckEl);

  idleTruckLife(truckEl);
  const smoke$ = smokeLoop(smoke);
  gateLoop(sceneEl, smoke$);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sceneEl,
      start: 'top top',
      end: PIN_DISTANCE,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  revealSceneText(tl, sceneEl);

  return { tl, truckEl, wheels };
}

// ---------------------------------------------------------------
// Scene builders
// ---------------------------------------------------------------

function sceneDepart(sceneEl) {
  const { tl, wheels } = baseScene(sceneEl);
  parallax(tl, sceneEl, {
    '.layer--sun': 0.03,
    '.layer--mountains': 0.1,
    '.layer--hq': 0.18,
    '.layer--trees': 0.3,
    '.layer--sign': 0.34,
    '.layer--road-depart': 0.5,
  });
  tl.to(sceneEl.querySelector('.road-lane-lines'), { backgroundPositionX: -600, ease: 'none' }, 0);
  spinWheels(tl, wheels);
}

function sceneCity(sceneEl) {
  const { tl, wheels } = baseScene(sceneEl);
  parallax(tl, sceneEl, {
    '.layer--buildings-back': 0.08,
    '.layer--crane': 0.14,
    '.layer--containers-city': 0.22,
    '.layer--buildings-front': 0.32,
    '.layer--road-city': 0.5,
  });
  tl.to(sceneEl.querySelector('.road-lane-lines'), { backgroundPositionX: -600, ease: 'none' }, 0);

  // Crane hook lowers, "grabs" the container, then lifts
  const hook = sceneEl.querySelector('.crane-hook');
  const cable = sceneEl.querySelector('.crane-cable');
  if (hook && cable) {
    tl.to(hook, { y: 30, duration: 0.3, ease: 'power1.inOut' }, 0.25)
      .to(hook, { y: 0, duration: 0.3, ease: 'power1.inOut' }, 0.55);
  }
  spinWheels(tl, wheels);
}

function sceneWarehouse(sceneEl) {
  const { tl, wheels } = baseScene(sceneEl);
  parallax(tl, sceneEl, {
    '.layer--pallets': 0.08,
    '.layer--floor-warehouse': 0.4,
  });

  // Doors slide open as the truck approaches, close again after it passes
  const doorL = sceneEl.querySelector('.warehouse-door--left');
  const doorR = sceneEl.querySelector('.warehouse-door--right');
  if (doorL && doorR) {
    tl.to(doorL, { xPercent: -100, duration: 0.3, ease: 'power2.inOut' }, 0.05)
      .to(doorR, { xPercent: 100, duration: 0.3, ease: 'power2.inOut' }, 0.05)
      .to(doorL, { xPercent: 0, duration: 0.25, ease: 'power2.inOut' }, 0.8)
      .to(doorR, { xPercent: 0, duration: 0.25, ease: 'power2.inOut' }, 0.8);
  }

  // Forklift trundles back and forth, fork bobs
  const forklift = sceneEl.querySelector('.layer--forklift');
  const fork = sceneEl.querySelector('.forklift-fork');
  if (forklift) {
    tl.to(forklift, { xPercent: 18, duration: 0.5, ease: 'sine.inOut' }, 0.1)
      .to(forklift, { xPercent: 0, duration: 0.5, ease: 'sine.inOut' }, 0.6);
  }
  if (fork) {
    gsap.to(fork, { y: -14, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }

  // Containers rise as if being stacked
  sceneEl.querySelectorAll('.stack-container').forEach((box, i) => {
    tl.from(box, { y: 60, opacity: 0, duration: 0.3, ease: 'power2.out' }, 0.3 + i * 0.08);
  });
  spinWheels(tl, wheels);
}

function sceneHighway(sceneEl) {
  const { tl, truckEl, wheels } = baseScene(sceneEl);
  parallax(tl, sceneEl, {
    '.layer--hills': 0.1,
    '.layer--hills-2': 0.16,
    '.layer--road-highway': 0.5,
    '.layer--roadside-lights': 0.34,
  });
  tl.to(sceneEl.querySelector('.road-lane-lines'), { backgroundPositionX: -700, ease: 'none' }, 0);

  buildStars(sceneEl.querySelector('#starsLayer'));

  const night = sceneEl.querySelector('.sky-part--night');
  const sun = sceneEl.querySelector('.sun-disc');
  const moon = sceneEl.querySelector('.layer--moon-rising');
  const stars = sceneEl.querySelector('.layer--stars');
  const lamps = sceneEl.querySelectorAll('.light-pole__lamp');

  tl.to(night, { opacity: 1, ease: 'none' }, 0)
    .to(sun, { x: 160, y: 90, opacity: 0, duration: 1, ease: 'none' }, 0)
    .to(moon, { opacity: 1, duration: 0.6, ease: 'none' }, 0.35)
    .to(stars, { opacity: 1, duration: 0.6, ease: 'none' }, 0.45)
    .to(lamps, { opacity: 1, duration: 0.3, stagger: 0.03, ease: 'none' }, 0.4)
    .call(() => truckEl.classList.add('is-lights-on'), null, 0.4);

  spinWheels(tl, wheels);
}

function sceneStorm(sceneEl) {
  const { tl, truckEl, wheels } = baseScene(sceneEl);
  truckEl.classList.add('is-lights-on');

  parallax(tl, sceneEl, {
    '.layer--hills-storm': 0.1,
    '.layer--road-storm': 0.5,
  });
  tl.to(sceneEl.querySelector('.road-lane-lines'), { backgroundPositionX: -800, ease: 'none' }, 0);

  const fog = sceneEl.querySelector('.layer--fog');
  gsap.to(fog, { xPercent: 6, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  tl.to(sceneEl.querySelector('.layer--rain'), { opacity: 1, duration: 0.4, ease: 'none' }, 0);

  const lightning = scheduleLightning(
    sceneEl.querySelector('.layer--lightning'),
    sceneEl.querySelector('.road-reflection')
  );
  gateLoop(sceneEl, lightning);

  // subtle extra shake to sell the storm
  gsap.to(sceneEl.querySelector('.truck-stage'), { x: '+=3', duration: 0.09, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  spinWheels(tl, wheels);
}

function sceneDelivery(sceneEl) {
  const { tl, truckEl, wheels } = baseScene(sceneEl);
  const door = getDoor(truckEl);
  const client = sceneEl.querySelector('.layer--client-person');
  const boxes = sceneEl.querySelectorAll('.box');

  gsap.set(client, { opacity: 0, y: 20 });

  if (door) {
    swingDoor(tl, door, -108, 0.15, 0.3);
  }
  boxes.forEach((box, i) => {
    tl.to(box, { opacity: 1, y: -6, duration: 0.2, ease: 'power2.out' }, 0.35 + i * 0.1);
  });
  tl.to(client, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.55);
  spinWheels(tl, wheels);
}

// ---------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------

export function initJourney() {
  const builders = {
    depart: sceneDepart,
    city: sceneCity,
    warehouse: sceneWarehouse,
    highway: sceneHighway,
    storm: sceneStorm,
    delivery: sceneDelivery,
  };

  document.querySelectorAll('[data-scene]').forEach((sceneEl) => {
    const key = sceneEl.dataset.scene;
    builders[key]?.(sceneEl);
  });
}
