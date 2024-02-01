import { Boid } from "../entities/boid";
import { BoidBehavior } from "./boidBehavior";

class RandomBehavior implements BoidBehavior {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
  getName(): string {
    throw new Error("Method not implemented.");
  }
  update(boid: Boid, neighbors?: Boid[]): void {
    // Implement the logic for random movement
    // Adjust boid's velocity or other properties as needed
  }
}
