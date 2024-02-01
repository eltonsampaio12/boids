import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehavior } from "./boidBehavior";
import * as THREE from "three";

export class RandomBehavior implements BoidBehavior {
  private name: string;
  private active: boolean;
  private weight: number;
  private stoppingDistance: number;
  private newPosition: THREE.Vector3;

  constructor(name: string) {
    this.name = name;
    this.active = false;
    this.weight = 0.2;
    this.stoppingDistance = 3;
    this.newPosition = getRandomPositionWithinScreen(50, 15, 0, 30);
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

    const direction = this.newPosition.clone().sub(boid.getPosition().clone());
    const distance = direction.lengthSq();

    const angle = Math.atan2(direction.y, direction.x);
    direction.normalize();
    boid.setRotation(angle);
    boid.getVelocity().add(direction);
    boid.getVelocity().multiplyScalar(this.weight);

    if (distance <= this.stoppingDistance) {
      this.newPosition = getRandomPositionWithinScreen(50, 15, 0, 30);
    }

    boid.getPosition().add(boid.getVelocity());
  }
}
