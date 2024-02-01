import { Boid } from "../entities/boid";
import { BoidBehavior } from "./boidBehavior";
import * as THREE from "three";

export class RandomBehavior implements BoidBehavior {
  private name: string;
  private active: boolean;
  private weight: number;

  constructor(name: string, weight: number) {
    this.name = name;
    this.active = false;
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
    boid.getVelocity().add(new THREE.Vector3(1, 2, 0));
    boid.getPosition().add(boid.getVelocity());
  }
}
