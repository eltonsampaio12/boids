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

    for (let neigh of neighbors) {
      avgVelocity.add(neigh.getVelocity());
    }

    avgVelocity.divideScalar(neighbors.length);
  }
}