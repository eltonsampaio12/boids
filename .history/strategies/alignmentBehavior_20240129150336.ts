import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "./boidBehavior";
import { BoidBehaviorStrategy } from "./boidBehaviorStrategy";
import * as THREE from "three";

export class AlignmentBehavior
  extends BoidBehavior
  implements BoidBehaviorStrategy
{
  constructor(name: string) {
    super(name);
  }

  update(boid: Boid, boids?: Boid[]): void {
    if (!boids) return;
    const neighbors = boid.neighbors(boids);

    const avgVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    for (let neighbor of neighbors) {
      avgVelocity.add(neighbor.getVelocity());
    }

    if (neighbors.length > 0) {
      avgVelocity.divideScalar(neighbors.length);
      const steeringForce = avgVelocity.clone().sub(boid.getVelocity());
      boid
        .getAcceleration()
        .add(steeringForce)
        .multiplyScalar(this.getWeight());
    }
  }
}
