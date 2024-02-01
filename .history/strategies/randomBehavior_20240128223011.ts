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
    const acceleration = 0.01;
    const maxSpeed = 5;

    // Add acceleration to velocity
    boid.getVelocity().add(boid.getAcceleration());

    // Limit the velocity to a maximum speed
    boid.getVelocity().clampLength(0, maxSpeed);

    // Update the position based on velocity
    boid.getPosition().add(boid.getVelocity());
  }
}
