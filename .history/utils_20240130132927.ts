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

export function initializeBoids(num: number): {
  boids: Boid[];
  boidsMesh: THREE.Mesh[];
} {
  const coneGeometry = new THREE.ConeGeometry(1, 5, 10); // Adjust the radius, height, and segments as needed
  const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color
  const boids: Boid[] = [];
  const boidsMesh: THREE.Mesh[] = [];

  for (let i = 0; i < num; i++) {
    const boid = new Boid(2, 800);

    const boidMesh = new THREE.Mesh(coneGeometry, coneMaterial);
    boidMesh.rotation.set(0, 0, 0);
    boids.push(boid);
    boidsMesh.push(boidMesh);
  }

  return { boids, boidsMesh };
}

export function initializeBehaviors(boid: Boid) {
  const randomBehavior: RandomBehavior = new RandomBehavior("RANDOM_BEHAVIOR");
  randomBehavior.setActive(true);
  randomBehavior.setWeight(0.1);
  const alignmentBehaviour: AlignmentBehavior = new AlignmentBehavior(
    "ALIGNMENT_BEHAVIOR"
  );
  //alignmentBehaviour.setActive(true);
  alignmentBehaviour.setWeight(0.03);

  const cohesionBehavior = new CohesionBehavior("COHESION_BEHAVIOR");
  //cohesionBehavior.setActive(true);
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
