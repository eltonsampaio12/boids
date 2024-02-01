import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "../entities/boidBehavior";
import { IBoidBehaviorStrategy } from "./IboidBehaviorStrategy";
import * as THREE from "three";

export class AlignmentBehavior
  extends BoidBehavior
  implements IBoidBehaviorStrategy
{
  constructor(name: string) {
    super(name);
  }

  update(boid: Boid, boids?: Boid[]): void {
    if (!boids) return;
    const neighbors = boid.neighbors(boids);

    const desiredVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    for (let neighbor of neighbors) {
      // We want the average velocity of our neighbors.
      // We have to first sum all the velocities
      desiredVelocity.add(neighbor.getVelocity());
    }

    //To avoid devided by zero error
    if (neighbors.length > 0) {
      // Now we devide by the number of boids to get the average
      desiredVelocity.divideScalar(neighbors.length);
      //This Craig Reynolds steering formula.
      const steeringForce = desiredVelocity.clone().sub(boid.getVelocity());
      steeringForce.normalize();
      boid
        .getAcceleration()
        .add(steeringForce.multiplyScalar(this.getWeight()));
    }
  }
}
