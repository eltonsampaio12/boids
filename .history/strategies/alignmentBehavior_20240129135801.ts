import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "./boidBehavior";
import { BoidBehaviorStrategy } from "./boidBehaviorStrategy";

export class AlignmentBehavior
  extends BoidBehavior
  implements BoidBehaviorStrategy
{
  constructor(name: string) {
    super(name);
  }

  update(boid: Boid, neighbors?: Boid[] | undefined): void {}
}
