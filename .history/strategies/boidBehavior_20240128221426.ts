import { Boid } from "../entities/boid";

export interface BoidBehavior {
  update(boid: Boid, neighbors?: Boid[]): void;
  getName(): string;
}
