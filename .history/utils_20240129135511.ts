import * as THREE from "three";
import { Boid } from "./entities/boid";
import { RandomBehavior } from "./strategies/randomBehavior";
import { AlignmentBehavior } from "./strategies/alignmentBehavior";

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
    const boid = new Boid(3, 30);

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

  const alignmentBehaviour = new AlignmentBehavior("ALIGNMENT_BEHAVIOR");
  boid.addBehavior(randomBehavior);
}

export function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}
