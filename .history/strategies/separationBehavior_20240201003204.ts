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
    let steeringForce: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    for (let neighbor of neighbors) {
      //need a vector that points from the neigh to mysel
      //so that I can move in the opposite direction.
      const direction = boid
        .getPosition()
        .clone()
        .sub(neighbor.getPosition().clone());
      const distance = direction.lengthSq();
      direction.normalize();

      steeringForce = direction.divideScalar(distance);
      desiredPosition.add(steeringForce);
    }

    if (neighbors.length > 0) {
      desiredPosition.divideScalar(neighbors.length);
      steeringForce = desiredPosition.clone().sub(boid.getVelocity().clone());

      boid
        .getAcceleration()
        .add(steeringForce.multiplyScalar(this.getWeight()));
    }
  }
}
