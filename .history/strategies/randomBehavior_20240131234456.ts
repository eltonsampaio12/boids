import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen, lerp } from "../utils";
import { BoidBehavior } from "./boidBehavior";
import { BoidBehaviorStrategy } from "./boidBehaviorStrategy";
import * as THREE from "three";

export class RandomBehavior
  extends BoidBehavior
  implements BoidBehaviorStrategy
{
  constructor(name: string) {
    super(name);
  }

  update(boid: Boid, neighbors?: Boid[]): void {
    if (!this.getActive()) return;

    const steeringForce = boid.getDesiredRandomPosition();

    // Optionally, you can limit the strength of the steering force
    const distance = steeringForce.lengthSq();
    steeringForce.normalize();
    boid.getAcceleration().add(steeringForce.multiplyScalar(this.getWeight()));
    if (distance <= this.getStoppingDistance()) {
      boid.setDesiredRandomPosition(
        getRandomPositionWithinScreen(800, 800, 0, 0)
      );
    }
  }
}
