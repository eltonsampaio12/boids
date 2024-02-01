import { Boid } from "../entities/boid";

export interface BoidBehavior {
  update(boid: Boid, neighbors?: Boid[]): void;
  getName(): string;
  getActive(): boolean;
  setActive(active: boolean): void;
}
