import { dir } from "console";
import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "../entities/boidBehavior";
import { BoidBehaviorStrategy } from "./boidBehaviorStrategy";
import * as THREE from "three";

export class CohesionBehavior
  extends BoidBehavior
  implements BoidBehaviorStrategy
{
  constructor(name: string) {
    super(name);
  }

  update(boid: Boid, boids?: Boid[]): void {
    if (!boids) return;
    const neighbors = boid.neighbors(boids);

    const desiredPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    for (let neighbor of neighbors) {
      desiredPosition.add(neighbor.getPosition());
    }

    if (neighbors.length > 0) {
      desiredPosition.divideScalar(neighbors.length);
      const steeringForce = desiredPosition
        .clone()
        .sub(boid.getPosition().clone());
      steeringForce.normalize();
      boid
        .getAcceleration()
        .add(steeringForce.multiplyScalar(this.getWeight()));
    }
  }
}
