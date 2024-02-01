import { dir } from "console";
import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "./boidBehavior";
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

    const avgPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    for (let neighbor of neighbors) {
      avgPosition.add(neighbor.getPosition());
    }

    if (neighbors.length > 0) {
      avgPosition.divideScalar(neighbors.length);
      const direction = avgPosition.clone().sub(boid.getPosition().clone());
      direction.normalize();
      boid.getAcceleration().add(direction.multiplyScalar(0.02));
    }
  }
}
