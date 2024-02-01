import { dir } from "console";
import { Boid } from "../entities/boid";
import { BoidBehavior } from "../entities/boidBehavior";
import { IBoidBehaviorStrategy } from "./IboidBehaviorStrategy";
import * as THREE from "three";

export class SeparationBehavior
  extends BoidBehavior
  implements IBoidBehaviorStrategy
{
  constructor(name: string) {
    super(name);
  }

  update(boid: Boid, boids?: Boid[]): void {
    if (!boids) return;
    const neighbors = boid.neighbors(boids);

    let steeringForce: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    for (let neighbor of neighbors) {
      // Need a vector that points from the neighbor to myself
      // so that I can move in the opposite direction.
      const direction = boid
        .getPosition()
        .clone()
        .sub(neighbor.getPosition().clone());
      const distance = direction.lengthSq();
      direction.normalize();

      // Accumulate the steering forces
      steeringForce.add(direction.divideScalar(distance));
    }

    if (neighbors.length > 0) {
      // Average the accumulated steering forces
      steeringForce.divideScalar(neighbors.length);
      steeringForce.normalize();
      // my desired velocity
      steeringForce.sub(boid.getVelocity().clone());
      boid
        .getAcceleration()
        .add(steeringForce.multiplyScalar(this.getWeight()));
    }
  }
}
