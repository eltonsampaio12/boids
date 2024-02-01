import { Boid } from "../entities/boid";

export interface IBoidBehaviorStrategy {
  update(boid: Boid, neighbors?: Boid[]): void;
  getName(): string;
  setWeight(weight: number): void;
}
