import { dir } from "console";
import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "./boidBehavior";
import { BoidBehaviorStrategy } from "./boidBehaviorStrategy";
import * as THREE from "three";

export class SeparationBehavior
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
    const separationForce: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    for (let neighbor of neighbors) {
      desiredPosition.add(neighbor.getPosition());

      // Calculate the direction from the current boid to its neighbor
      const direction = boid
        .getPosition()
        .clone()
        .sub(neighbor.getPosition().clone());
      const distance = direction.lengthSq();

      // Avoid division by zero
      if (distance > 0) {
        // Adjust strength based on distance (inverse proportion)
        separationForce.add(direction.divideScalar(distance));
      }
    }

    if (neighbors.length > 0) {
      desiredPosition.divideScalar(neighbors.length);

      // Calculate the separation force
      const steeringForce = separationForce
        .normalize()
        .multiplyScalar(this.getWeight());

      // Apply the separation force to the boid's acceleration
      boid.getAcceleration().add(steeringForce);
    }
  }
}
