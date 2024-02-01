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

    const desiredPosition = this.getNewPosition().clone();
    const steeringForce = desiredPosition.sub(boid.getPosition());

    // Optionally, you can limit the strength of the steering force
    const distance = steeringForce.lengthSq();

    steeringForce.normalize();
    const targetAngle = Math.atan2(steeringForce.y, steeringForce.x);
    // Use lerping for rotation
    boid.setRotation(
      lerp(boid.getRotationAngle(), targetAngle, this.getLerpFactor())
    );

    boid.getAcceleration().add(steeringForce).multiplyScalar(this.getWeight());
    if (distance <= this.getStoppingDistance()) {
      boid.getAcceleration().multiplyScalar(0.1);
      this.setNewPosition(getRandomPositionWithinScreen(200, 100, -100, 100));
    }
  }
}
