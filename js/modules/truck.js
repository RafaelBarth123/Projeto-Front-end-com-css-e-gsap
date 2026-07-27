// ==========================================================================
// Truck component — the protagonist of the journey.
// A single SVG template is stamped into every `[data-truck]` stage so the
// rig looks identical from the hero to the final delivery scene.
//
// Geometry (viewBox 0 0 800 300), side profile facing right:
//   ground line y=250 · wheel centres y=216 r=34 · chassis rail y=196..208
//   box body x=50..450 y=38..196 · exhaust stack x=452..462
//   cab x=462..778 y=86..208
// Gradient ids in <defs> are namespaced per instance (the __ID__ token) so
// the seven copies stamped across the page never collide — SVG ids are
// document-global, not scoped per <svg>.
// ==========================================================================

const TRUCK_MARKUP = `
<svg class="truck" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="__ID__-box" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fdfdfe"/>
      <stop offset=".45" stop-color="#eceef1"/>
      <stop offset=".8" stop-color="#dcdee3"/>
      <stop offset="1" stop-color="#c2c5cc"/>
    </linearGradient>
    <linearGradient id="__ID__-cab" x1="0" y1="0" x2=".15" y2="1">
      <stop offset="0" stop-color="#f07c47"/>
      <stop offset=".35" stop-color="#dd5024"/>
      <stop offset=".75" stop-color="#c03d15"/>
      <stop offset="1" stop-color="#8e2c0c"/>
    </linearGradient>
    <linearGradient id="__ID__-glass" x1="0" y1="0" x2=".4" y2="1">
      <stop offset="0" stop-color="#e2f6ff"/>
      <stop offset=".45" stop-color="#9ccfe4"/>
      <stop offset="1" stop-color="#4b7f9c"/>
    </linearGradient>
    <linearGradient id="__ID__-chrome" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fbfbfc"/>
      <stop offset=".35" stop-color="#d3d6dc"/>
      <stop offset=".62" stop-color="#8f939c"/>
      <stop offset="1" stop-color="#c9ccd3"/>
    </linearGradient>
    <linearGradient id="__ID__-stripe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffc76f"/>
      <stop offset=".55" stop-color="#f7961d"/>
      <stop offset="1" stop-color="#d9740a"/>
    </linearGradient>
    <radialGradient id="__ID__-tire" cx=".36" cy=".3" r=".9">
      <stop offset="0" stop-color="#4a4e55"/>
      <stop offset=".55" stop-color="#202327"/>
      <stop offset="1" stop-color="#0b0c0e"/>
    </radialGradient>
    <radialGradient id="__ID__-rim" cx=".38" cy=".32" r=".8">
      <stop offset="0" stop-color="#f4f5f7"/>
      <stop offset=".6" stop-color="#b7bbc3"/>
      <stop offset="1" stop-color="#7e828b"/>
    </radialGradient>
  </defs>

  <ellipse class="truck__shadow" cx="414" cy="252" rx="352" ry="13"></ellipse>

  <!-- ================= CARGO BOX ================= -->
  <g class="truck__box">
    <rect class="truck__box-body" x="50" y="38" width="400" height="158" rx="5" fill="url(#__ID__-box)"></rect>
    <g class="truck__corrugation">
      <line x1="82" y1="46" x2="82" y2="176"></line>
      <line x1="114" y1="46" x2="114" y2="176"></line>
      <line x1="146" y1="46" x2="146" y2="176"></line>
      <line x1="178" y1="46" x2="178" y2="176"></line>
      <line x1="210" y1="46" x2="210" y2="176"></line>
      <line x1="242" y1="46" x2="242" y2="176"></line>
      <line x1="274" y1="46" x2="274" y2="176"></line>
      <line x1="306" y1="46" x2="306" y2="176"></line>
      <line x1="338" y1="46" x2="338" y2="176"></line>
      <line x1="370" y1="46" x2="370" y2="176"></line>
      <line x1="402" y1="46" x2="402" y2="176"></line>
      <line x1="434" y1="46" x2="434" y2="176"></line>
    </g>
    <rect class="truck__box-skirt" x="50" y="176" width="400" height="20"></rect>
    <rect class="truck__box-rail" x="48" y="33" width="404" height="7" rx="2" fill="url(#__ID__-chrome)"></rect>
    <rect class="truck__stripe" x="50" y="140" width="400" height="16" fill="url(#__ID__-stripe)"></rect>
    <rect class="truck__stripe-edge" x="50" y="138" width="400" height="2"></rect>
    <g class="truck__logo">
      <path class="truck__logo-mark" d="M104 92 L124 114 L104 136 L116 136 L136 114 L116 92 Z"></path>
      <text class="truck__trailer-logo" x="146" y="122" font-size="38">VANTRA</text>
      <text class="truck__trailer-tagline" x="148" y="136" font-size="10.5" letter-spacing="3.4">LOG&#205;STICA</text>
    </g>
    <g class="truck__box-markers">
      <rect x="52" y="166" width="6" height="4" rx="1"></rect>
      <rect x="442" y="166" width="6" height="4" rx="1"></rect>
    </g>
  </g>

  <!-- rear roll-up door, hinged at its top edge -->
  <g class="truck__door" data-truck-door>
    <rect class="truck__door-panel" x="44" y="42" width="11" height="150" rx="2" fill="url(#__ID__-box)"></rect>
    <rect class="truck__door-handle" x="47" y="130" width="4" height="22" rx="2"></rect>
  </g>

  <!-- ================= EXHAUST STACK ================= -->
  <rect class="truck__exhaust-pipe" x="452" y="62" width="10" height="134" fill="url(#__ID__-chrome)"></rect>
  <rect class="truck__exhaust-cap" x="449" y="56" width="16" height="7" rx="2"></rect>

  <!-- ================= CHASSIS ================= -->
  <rect class="truck__mudflap" x="107" y="206" width="14" height="44" rx="2"></rect>
  <rect class="truck__mudflap" x="217" y="206" width="14" height="44" rx="2"></rect>
  <rect class="truck__chassis" x="58" y="196" width="720" height="12"></rect>
  <rect class="truck__underride" x="46" y="230" width="34" height="7" rx="2"></rect>
  <rect class="truck__underride" x="58" y="208" width="6" height="24"></rect>
  <rect class="truck__fuel-tank" x="516" y="200" width="78" height="30" rx="12" fill="url(#__ID__-chrome)"></rect>
  <line class="truck__fuel-tank-band" x1="540" y1="202" x2="540" y2="228"></line>
  <line class="truck__fuel-tank-band" x1="570" y1="202" x2="570" y2="228"></line>
  <circle class="truck__taillight" cx="56" cy="192" r="4"></circle>
  <rect class="truck__taillight-amber" x="52" y="178" width="7" height="8" rx="2"></rect>

  <!-- ================= CAB ================= -->
  <path class="truck__deflector" d="M466 86 L466 54 Q466 46 476 46 L504 46 L532 86 Z" fill="url(#__ID__-cab)"></path>

  <g class="truck__cab">
    <path class="truck__cab-body" d="M462 208 L462 100 Q462 86 476 86 L700 86 Q714 86 720 96 L752 150 L762 150 Q776 150 776 164 L776 208 Z" fill="url(#__ID__-cab)"></path>
    <path class="truck__cab-shade" d="M462 208 L462 184 L776 184 L776 208 Z"></path>

    <rect class="truck__cab-window" x="545" y="100" width="26" height="48" rx="4" fill="url(#__ID__-glass)"></rect>
    <rect class="truck__cab-window" x="580" y="100" width="112" height="48" rx="5" fill="url(#__ID__-glass)"></rect>
    <path class="truck__cab-window" d="M706 100 L714 100 Q723 102 727 112 L745 148 L706 148 Z" fill="url(#__ID__-glass)"></path>
    <path class="truck__glass-shine" d="M586 104 L612 104 L594 144 L586 144 Z"></path>

    <line class="truck__cab-seam" x1="576" y1="90" x2="576" y2="206"></line>
    <rect class="truck__cab-handle" x="586" y="160" width="15" height="4" rx="2"></rect>
    <rect class="truck__cab-step" x="580" y="190" width="46" height="7" rx="2"></rect>

    <line class="truck__mirror-arm" x1="722" y1="108" x2="740" y2="99"></line>
    <rect class="truck__mirror" x="736" y="89" width="10" height="21" rx="3"></rect>

    <rect class="truck__grille" x="752" y="158" width="24" height="22" rx="3" fill="url(#__ID__-chrome)"></rect>
    <line class="truck__grille-bar" x1="754" y1="164" x2="774" y2="164"></line>
    <line class="truck__grille-bar" x1="754" y1="171" x2="774" y2="171"></line>

    <circle class="truck__turn-signal" cx="757" cy="182" r="3"></circle>
    <circle class="truck__headlight-glow" cx="764" cy="190" r="26"></circle>
    <rect class="truck__headlight" x="752" y="184" width="24" height="12" rx="4"></rect>
    <rect class="truck__bumper" x="746" y="199" width="34" height="15" rx="4" fill="url(#__ID__-chrome)"></rect>
  </g>

  <g class="truck__smoke-group" data-smoke>
    <circle cx="457" cy="50" r="7"></circle>
    <circle cx="457" cy="50" r="9"></circle>
    <circle cx="457" cy="50" r="5"></circle>
  </g>

  <!-- ================= WHEELS ================= -->
  <g class="truck__wheel" data-wheel>
    <circle class="truck__wheel-tire" cx="155" cy="216" r="34" fill="url(#__ID__-tire)"></circle>
    <circle class="truck__wheel-tread" cx="155" cy="216" r="27"></circle>
    <circle class="truck__wheel-rim" cx="155" cy="216" r="16" fill="url(#__ID__-rim)"></circle>
    <g class="truck__wheel-spokes">
      <line x1="155" y1="204" x2="155" y2="228"></line>
      <line x1="144" y1="210" x2="166" y2="222"></line>
      <line x1="144" y1="222" x2="166" y2="210"></line>
    </g>
    <g class="truck__wheel-lugs">
      <circle cx="155" cy="206" r="1.7"></circle><circle cx="164" cy="212" r="1.7"></circle>
      <circle cx="161" cy="223" r="1.7"></circle><circle cx="149" cy="223" r="1.7"></circle>
      <circle cx="146" cy="212" r="1.7"></circle>
    </g>
    <circle class="truck__wheel-cap" cx="155" cy="216" r="5.5"></circle>
  </g>

  <g class="truck__wheel" data-wheel>
    <circle class="truck__wheel-tire" cx="265" cy="216" r="34" fill="url(#__ID__-tire)"></circle>
    <circle class="truck__wheel-tread" cx="265" cy="216" r="27"></circle>
    <circle class="truck__wheel-rim" cx="265" cy="216" r="16" fill="url(#__ID__-rim)"></circle>
    <g class="truck__wheel-spokes">
      <line x1="265" y1="204" x2="265" y2="228"></line>
      <line x1="254" y1="210" x2="276" y2="222"></line>
      <line x1="254" y1="222" x2="276" y2="210"></line>
    </g>
    <g class="truck__wheel-lugs">
      <circle cx="265" cy="206" r="1.7"></circle><circle cx="274" cy="212" r="1.7"></circle>
      <circle cx="271" cy="223" r="1.7"></circle><circle cx="259" cy="223" r="1.7"></circle>
      <circle cx="256" cy="212" r="1.7"></circle>
    </g>
    <circle class="truck__wheel-cap" cx="265" cy="216" r="5.5"></circle>
  </g>

  <g class="truck__wheel" data-wheel>
    <circle class="truck__wheel-tire" cx="700" cy="216" r="34" fill="url(#__ID__-tire)"></circle>
    <circle class="truck__wheel-tread" cx="700" cy="216" r="27"></circle>
    <circle class="truck__wheel-rim" cx="700" cy="216" r="16" fill="url(#__ID__-rim)"></circle>
    <g class="truck__wheel-spokes">
      <line x1="700" y1="204" x2="700" y2="228"></line>
      <line x1="689" y1="210" x2="711" y2="222"></line>
      <line x1="689" y1="222" x2="711" y2="210"></line>
    </g>
    <g class="truck__wheel-lugs">
      <circle cx="700" cy="206" r="1.7"></circle><circle cx="709" cy="212" r="1.7"></circle>
      <circle cx="706" cy="223" r="1.7"></circle><circle cx="694" cy="223" r="1.7"></circle>
      <circle cx="691" cy="212" r="1.7"></circle>
    </g>
    <circle class="truck__wheel-cap" cx="700" cy="216" r="5.5"></circle>
  </g>
</svg>`;

const DOOR_ORIGIN = '44px 42px';

function wheelOrigin(wheel) {
  const tire = wheel.querySelector('.truck__wheel-tire');
  return `${tire.getAttribute('cx')}px ${tire.getAttribute('cy')}px`;
}

/** Stamps the truck SVG into every stage element found in `root`. */
export function mountTrucks(root = document) {
  const stages = root.querySelectorAll('[data-truck]');
  stages.forEach((stage, i) => {
    const uid = `truck${i}`;
    stage.innerHTML = TRUCK_MARKUP.replace(/__ID__/g, uid);
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

/** Winds the roll-up cargo door open, then shut. Same GSAP/SVG
 *  transform-origin workaround as `spinWheels` — see the note there. */
export function rollDoor(tl, door, position, duration) {
  const proxy = { scale: 1 };
  const write = () => { door.style.transform = `scaleY(${proxy.scale})`; };
  tl.to(proxy, { scale: 0.05, duration, ease: 'power2.inOut', onUpdate: write }, position)
    .to(proxy, { scale: 1, duration, ease: 'power2.inOut', onUpdate: write }, 0.82);
}
