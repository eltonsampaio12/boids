// sliders.ts
import { Boid } from "./entities/boid";
import { updateBehavior } from "./lib/update-behavior";

function setupSliderBehavior(
  slider: HTMLInputElement,
  valueElement: HTMLElement,
  behaviorName: string,
  boids: Boid[]
) {
  if (slider) {
    slider.oninput = function () {
      const value: number = parseFloat(slider.value);
      if (valueElement && value) {
        valueElement.innerHTML = String(value);
        updateBehavior(behaviorName, String(value), boids);
      }
    };
  }
}

export function setupSliderBehaviors(boids: Boid[]) {
  const cohesionSlider =
    document.querySelector<HTMLInputElement>("#cohesionSlider");
  const cohesionValue =
    document.querySelector<HTMLInputElement>("#cohesionValue");
  setupSliderBehavior(
    cohesionSlider!,
    cohesionValue!,
    "COHESION_BEHAVIOR",
    boids
  );

  const separationSlider =
    document.querySelector<HTMLInputElement>("#separationSlider");
  const separationValue =
    document.querySelector<HTMLInputElement>("#separationValue");
  setupSliderBehavior(
    separationSlider!,
    separationValue!,
    "SEPARATION_BEHAVIOR",
    boids
  );

  const alignmentSlider =
    document.querySelector<HTMLInputElement>("#alignmentSlider");
  const alignmentValue =
    document.querySelector<HTMLInputElement>("#alignmentValue");
  setupSliderBehavior(
    alignmentSlider!,
    alignmentValue!,
    "ALIGNMENT_BEHAVIOR",
    boids
  );
}
