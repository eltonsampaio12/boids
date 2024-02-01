import { Boid } from "../entities/boid";

export function updateBoidsPerceptionRadius(radius: number, boids: Boid[]) {
  if (boids.length == 0 || !radius) return;
  for (let boid of boids) {
    boid.setPerceptionRadius(radius);
  }
}
