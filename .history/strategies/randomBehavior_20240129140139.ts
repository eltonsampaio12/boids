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

    const direction = this.getNewPosition()
      .clone()
      .sub(boid.getPosition().clone());
    const distance = direction.lengthSq();

    direction.normalize();
    const targetAngle = Math.atan2(direction.y, direction.x);
    // Use lerping for rotation
    boid.setRotation(
      lerp(boid.getRotationAngle(), targetAngle, this.getLerpFactor())
    );

    boid.getAcceleration().add(direction).multiplyScalar(this.getWeight());

    if (distance <= this.getStoppingDistance()) {
      this.setNewPosition(getRandomPositionWithinScreen(200, 100, -100, 100));
    }
    boid.getPosition().add(boid.getVelocity());
  }
}
