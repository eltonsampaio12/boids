import { RandomBehavior } from "./strategies/randomBehavior";
import { AlignmentBehavior } from "./strategies/alignmentBehavior";
import { BoidBehavior } from "./strategies/boidBehavior";
import { CohesionBehavior } from "./strategies/cohesionBehavior";
import { SeparationBehavior } from "./strategies/separationBehavior";

export function initializeBehaviors(boid: Boid) {
  const randomBehavior: RandomBehavior = new RandomBehavior("RANDOM_BEHAVIOR");
  randomBehavior.setActive(true);
  randomBehavior.setWeight(0.04);
  const alignmentBehaviour: AlignmentBehavior = new AlignmentBehavior(
    "ALIGNMENT_BEHAVIOR"
  );
  alignmentBehaviour.setActive(true);
  alignmentBehaviour.setWeight(0.09);

  const cohesionBehavior = new CohesionBehavior("COHESION_BEHAVIOR");
  cohesionBehavior.setActive(true);
  cohesionBehavior.setWeight(0.01);

  const separatorBehavior = new SeparationBehavior("SEPARATION_BEHAVIOR");
  separatorBehavior.setActive(true);
  separatorBehavior.setWeight(0.2);

  boid.addBehavior(randomBehavior);
  // boid.addBehavior(alignmentBehaviour);
  boid.addBehavior(cohesionBehavior);
  boid.addBehavior(separatorBehavior);
}
