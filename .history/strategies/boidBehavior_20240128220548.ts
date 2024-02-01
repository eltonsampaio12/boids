import { Boid } from "../entities/boid";

interface BoidBehavior {
  update(boid: Boid, neighbors: Boid[]): void;
}
