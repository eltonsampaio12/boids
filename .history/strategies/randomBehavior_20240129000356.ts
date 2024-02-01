import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "./boidBehavior";
import * as THREE from "three";

export class RandomBehavior implements BoidBehavior {
  private name: string;
  private active: boolean;
  private weight: number;

  constructor(name: string) {
    this.name = name;
    this.active = false;
    this.weight = 0.01;
  }
  getWeight(): number {
    return this.weight;
  }
  setWeight(weight: number): void {
    this.weight = weight;
  }
  getActive(): boolean {
    return this.active;
  }
  setActive(active: boolean): void {
    this.active = active;
  }
  getName(): string {
    return this.name;
  }
  update(boid: Boid, neighbors?: Boid[]): void {
    if (!this.active) return;

    const newPosition = getRandomPositionWithinScreen(50, 15, 0, 30);
    const direction = newPosition.clone().sub(boid.getPosition().clone());
    const distance = direction.lengthSq();
    //direction.normalize();

    console.log(distance);
    boid.getVelocity().add(direction);
    boid.getVelocity().multiplyScalar(this.weight);
    boid.getPosition().add(boid.getVelocity());
  }
}
