import { Boid } from "../entities/boid";
import { BoidBehavior } from "./boidBehavior";

export class RandomBehavior implements BoidBehavior {
  private name: string;
  private active: boolean;

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
    boid.getVelocity().addScalar(0.2);
    boid.getPosition().add(boid.getVelocity());
    // Implement the logic for random movement
    // Adjust boid's velocity or other properties as needed
  }
}
