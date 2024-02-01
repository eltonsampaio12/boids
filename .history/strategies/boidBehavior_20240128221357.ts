import { Boid } from "../entities/boid";

export interface BoidBehavior {
  update(boid: Boid, neighbors?: Boid[]): void;
  setName(name: string): void;
  getName(): string;
}
