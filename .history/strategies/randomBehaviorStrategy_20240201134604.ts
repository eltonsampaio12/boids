import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "../entities/boidBehavior";
import { IBoidBehaviorStrategy } from "./IboidBehaviorStrategy";
import * as THREE from "three";

export class RandomBehavior
  extends BoidBehavior
  implements IBoidBehaviorStrategy
{
  constructor(name: string) {
    super(name);
  }

  update(boid: Boid, neighbors?: Boid[]): void {
    if (!this.getActive()) return;

    const steeringForce = boid.getDesiredRandomPosition();
    // Optionally, you can limit the strength of the steering force
    const distance = steeringForce.lengthSq();
    // We do not, want the lenght of the vector to be too big.
    // Ideally we wanna have some control over it.
    // Thats why we normalize
    steeringForce.normalize();
    boid.getAcceleration().add(steeringForce.multiplyScalar(this.getWeight()));
    if (distance <= this.getStoppingDistance()) {
      boid.setDesiredRandomPosition(
        getRandomPositionWithinScreen(500, 500, 0, 0)
      );
    }
  }
}
