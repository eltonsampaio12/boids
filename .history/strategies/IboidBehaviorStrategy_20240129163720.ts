import { Boid } from "../entities/boid";

export interface BoidBehaviorStrategy {
  update(boid: Boid, neighbors?: Boid[]): void;
  getName(): string;
  setWeight(weight: number): void;
}
