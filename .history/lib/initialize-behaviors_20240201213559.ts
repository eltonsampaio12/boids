import { RandomBehavior } from "../strategies/randomBehaviorStrategy";
import { AlignmentBehavior } from "../strategies/alignmentBehaviorStrategy";
import { CohesionBehavior } from "../strategies/cohesionBehavior";
import { SeparationBehavior } from "../strategies/separationBehaviorStrategy";
import { Boid } from "../entities/boid";

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
  cohesionBehavior.setWeight(0.0002);

  const separatorBehavior = new SeparationBehavior("SEPARATION_BEHAVIOR");
  separatorBehavior.setActive(true);
  separatorBehavior.setWeight(0.1);

  boid.addBehavior(randomBehavior);
  boid.addBehavior(alignmentBehaviour);
  boid.addBehavior(cohesionBehavior);
  boid.addBehavior(separatorBehavior);
}
