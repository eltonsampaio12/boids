// sliders.ts
import { Boid } from "./entities/boid";
import { updateBehavior } from "./lib/update-behavior";
import { updateBoidsPerceptionRadius } from "./lib/update-boids-perception-radius";

function setupSliderBehavior(
  slider: HTMLInputElement,
  valueElement: HTMLElement,
  behaviorName: string,
  boids: Boid[],
  update: string
) {
  if (slider) {
    slider.oninput = function () {
      const value: number = parseFloat(slider.value);
      if (valueElement && value) {
        valueElement.innerHTML = String(value);
        switch (update) {
          case "UPDATE_BEVAHIOR":
            updateBehavior(behaviorName, String(value), boids);
            console.log(value);
          case "UPDATE_PERCEPTION_RADIUS":
            updateBoidsPerceptionRadius(Number(value), boids);
          default:
        }
      }
    };
  }
}

export function setupSliderBehaviors(boids: Boid[]) {
  const UPDATE_BEVAHIOR = "UPDATE_BEVAHIOR";

  const sliderPerceptionRadiusSlider = document.querySelector<HTMLInputElement>(
    "#perceptionRadiusSlider"
  );
  const perceptionRadiusValue = document.querySelector<HTMLInputElement>(
    "#perceptionRadiusValue"
  );

  setupSliderBehavior(
    sliderPerceptionRadiusSlider!,
    perceptionRadiusValue!,
    "",
    boids,
    "UPDATE_PERCEPTION_RADIUS"
  );

  const alignmentSlider =
    document.querySelector<HTMLInputElement>("#alignmentSlider");
  const alignmentValue =
    document.querySelector<HTMLInputElement>("#alignmentValue");
  setupSliderBehavior(
    alignmentSlider!,
    alignmentValue!,
    "ALIGNMENT_BEHAVIOR",
    boids,
    UPDATE_BEVAHIOR
  );

  const cohesionSlider =
    document.querySelector<HTMLInputElement>("#cohesionSlider");
  const cohesionValue =
    document.querySelector<HTMLInputElement>("#cohesionValue");
  setupSliderBehavior(
    cohesionSlider!,
    cohesionValue!,
    "COHESION_BEHAVIOR",
    boids,
    UPDATE_BEVAHIOR
  );

  const separationSlider =
    document.querySelector<HTMLInputElement>("#separationSlider");
  const separationValue =
    document.querySelector<HTMLInputElement>("#separationValue");
  setupSliderBehavior(
    separationSlider!,
    separationValue!,
    "SEPARATION_BEHAVIOR",
    boids,
    UPDATE_BEVAHIOR
  );
}
