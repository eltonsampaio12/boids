import * as THREE from "three";
import { Boid } from "./entities/boid";
import { RandomBehavior } from "./strategies/randomBehavior";

export function initializeBoids(
  num: number
): Array<{ boid: Boid; mesh: THREE.Mesh }> {
  const coneGeometry = new THREE.ConeGeometry(1, 5, 10); // Adjust the radius, height, and segments as needed
  const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color
  const boids: Array<{ boid: Boid; mesh: THREE.Mesh }> = [];
  for (let i = 0; i < num; i++) {
    const boid = new Boid(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      3,
      5
    );

    const boidMesh = new THREE.Mesh(coneGeometry, coneMaterial);
    boids.push({ boid, mesh: boidMesh });
  }

  return boids;
}

export function initializeBehaviors(boid: Boid) {
  const randomBehavior: RandomBehavior = new RandomBehavior("RANDOM_BEHAVIOR");
  randomBehavior.setActive(true);
  boid.addBehavior(randomBehavior);
}

export function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}
