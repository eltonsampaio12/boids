import { Boid } from "../entities/boid";

export interface BoidBehaviorStrategy {
  update(boid: Boid, neighbors?: Boid[]): void;
}
