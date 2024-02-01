import THREE from "three";
import { Boid } from "../entities/boid";
import { BoidBehavior } from "./boidBehavior";

export class RandomBehavior implements BoidBehavior {
  private name: string;
  private active: boolean;
  //

  constructor(name: string) {
    this.name = name;
    this.active = false;
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
    boid.getPosition().add(boid.getVelocity());
  }
}
