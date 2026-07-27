// ==========================================================================
// Truck component — the protagonist of the journey.
// A real truck photo is stamped into every `[data-truck]` stage so the rig
// looks identical from the hero to the final delivery scene. The headlight
// glow and exhaust puffs are separate overlay elements positioned to match
// the photo's headlamp cluster and cab roofline.
// ==========================================================================

const TRUCK_MARKUP = `
<div class="truck">
  <div class="truck__glow" data-headlight></div>
  <div class="truck__smoke" data-smoke><span></span><span></span><span></span></div>
  <img class="truck__photo" src="assets/images/truck.webp" alt="" draggable="false">
</div>`;

/** Stamps the truck photo into every stage element found in `root`. */
export function mountTrucks(root = document) {
  const stages = root.querySelectorAll('[data-truck]');
  stages.forEach((stage) => {
    stage.innerHTML = TRUCK_MARKUP;
  });
  return Array.from(stages).map((stage) => stage.querySelector('.truck'));
}

export function getSmoke(truckEl) {
  return truckEl.querySelector('[data-smoke]');
}
