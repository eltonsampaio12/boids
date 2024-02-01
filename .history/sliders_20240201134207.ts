// sliders.ts
import { Boid } from "./entities/boid";
import { updateBehavior } from "./lib/update-behavior";
import { updateBoidsPerceptionRadius } from "./lib/update-boids-perception-radius";

function setupSliderBehavior(
  slider: HTMLInputElement,
  valueElement: HTMLElement,
  boids: Boid[],
  update: string,
  behaviorName?: string
) {
  if (slider) {
    slider.oninput = function () {
      const value: number = parseFloat(slider.value);
      if (valueElement && value) {
        valueElement.innerHTML = String(value);

        switch (update) {
          case "UPDATE_BEVAHIOR":
            updateBehavior(behaviorName!, String(value), boids);
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

  const cohesionSlider =
    document.querySelector<HTMLInputElement>("#cohesionSlider");
  const cohesionValue =
    document.querySelector<HTMLInputElement>("#cohesionValue");
  setupSliderBehavior(
    cohesionSlider!,
    cohesionValue!,
    boids,
    UPDATE_BEVAHIOR,
    "COHESION_BEHAVIOR"
  );

  const separationSlider =
    document.querySelector<HTMLInputElement>("#separationSlider");
  const separationValue =
    document.querySelector<HTMLInputElement>("#separationValue");
  setupSliderBehavior(
    separationSlider!,
    separationValue!,
    boids,
    UPDATE_BEVAHIOR,
    "SEPARATION_BEHAVIOR"
  );

  const alignmentSlider =
    document.querySelector<HTMLInputElement>("#alignmentSlider");
  const alignmentValue =
    document.querySelector<HTMLInputElement>("#alignmentValue");
  setupSliderBehavior(
    alignmentSlider!,
    alignmentValue!,
    boids,
    UPDATE_BEVAHIOR,
    "ALIGNMENT_BEHAVIOR"
  );

  const sliderPerceptionRadiusSlider = document.querySelector<HTMLInputElement>(
    "#perceptionRadiusSlider"
  );
  const perceptionRadiusValue = document.querySelector<HTMLInputElement>(
    "#perceptionRadiusValue"
  );

  setupSliderBehavior(
    sliderPerceptionRadiusSlider!,
    perceptionRadiusValue!,
    "ALIGNMENT_BEHAVIOR",
    boids,
    "UPDATE_PERCEPTION_RADIUS"
  );
}
