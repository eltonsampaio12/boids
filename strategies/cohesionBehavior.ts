import { dir } from "console";
import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "../entities/boidBehavior";
import { IBoidBehaviorStrategy } from "./IboidBehaviorStrategy";
import * as THREE from "three";

export class CohesionBehavior
  extends BoidBehavior
  implements IBoidBehaviorStrategy
{
  constructor(name: string) {
    super(name);
  }

  update(boid: Boid, boids?: Boid[]): void {
    if (!boids) return;
    const neighbors = boid.neighbors(boids);

    const desiredPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    for (let neighbor of neighbors) {
      // We want the average velocity of our neighbors.
      // We have to first sum all the velocities
      desiredPosition.add(neighbor.getPosition());
    }

    //To avoid devided by zero error
    if (neighbors.length > 0) {
      // Now we devide by the number of boids to get the average
      desiredPosition.divideScalar(neighbors.length);

      //This Craig Reynolds steering formula.
      const steeringForce = desiredPosition
        .clone()
        .sub(boid.getPosition().clone());

      //The weight allows us to control the amount of steering force
      boid
        .getAcceleration()
        .add(steeringForce.multiplyScalar(this.getWeight()));
    }
  }
}
