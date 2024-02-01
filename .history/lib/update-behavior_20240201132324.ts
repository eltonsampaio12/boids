import { Boid } from "../entities/boid";

export function updateBehavior(name: string, weight: string, boids: Boid[]) {
  if (boids.length == 0 || !weight) return;

  for (let boid of boids) {
    for (let behavior of boid.getBehaviors()) {
      if (behavior.getName() == name) {
        behavior.setWeight(Number(weight));
      }
    }
  }
}
