import * as THREE from "three";
import { Boid } from "./entities/boid";
import { RandomBehavior } from "./strategies/randomBehavior";
import { AlignmentBehavior } from "./strategies/alignmentBehavior";
import { BoidBehavior } from "./strategies/boidBehavior";
import { CohesionBehavior } from "./strategies/cohesionBehavior";

export function getRandomPositionWithinScreen(
  width: number,
  height: number,
  minZ: number,
  maxZ: number
): THREE.Vector3 {
  const x = Math.random() * width - width / 2;
  const y = Math.random() * height - height / 2;
  const z = Math.random() * (maxZ - minZ) + minZ;

  return new THREE.Vector3(x, y, z);
}

export function initializeBehaviors(boid: Boid) {
  const randomBehavior: RandomBehavior = new RandomBehavior("RANDOM_BEHAVIOR");
  randomBehavior.setActive(true);
  randomBehavior.setWeight(0.002);
  const alignmentBehaviour: AlignmentBehavior = new AlignmentBehavior(
    "ALIGNMENT_BEHAVIOR"
  );
  alignmentBehaviour.setActive(true);
  alignmentBehaviour.setWeight(0.09);

  const cohesionBehavior = new CohesionBehavior("COHESION_BEHAVIOR");
  cohesionBehavior.setActive(true);
  cohesionBehavior.setWeight(0.01);
  boid.addBehavior(randomBehavior);
  boid.addBehavior(alignmentBehaviour);
  //boid.addBehavior(cohesionBehavior);
}

export function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

export function updateBoidsPerceptionRadius(radius: number, boids: Boid[]) {
  if (boids.length == 0 || !radius) return;
  for (let boid of boids) {
    boid.setPerceptionRadius(radius);
  }
}

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
